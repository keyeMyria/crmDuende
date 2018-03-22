import * as React from 'react';
import { ByDate } from '../../reports/checkin-report/types/checkin-report';
import { CheckinsByDate, CompareByDate } from '../../reports/checkin-report/components/charts/checkins-by-date';
import { CheckinsLegend } from './checkins-legend';
import { RANGES } from '../util/comparator-ranges';
import { CheckinsTooltip } from './checkins-tooltip';
import { subDays, addDays } from 'date-fns';
import format from '../../common/util/format-date';

export interface CheckinsByDayChartProps {
    data: ByDate;
    previousData: ByDate;
    width: number;
    range: RANGES;
    shouldCompare?: boolean;
}

const TOOLTIP_TITLE_FORMAT = 'ddd DD MMM';

export function CheckinsByDateChart(props: CheckinsByDayChartProps) {

    const mergeData = (data: ByDate, prevData: ByDate): CompareByDate => {
        const mergedData: CompareByDate = {} as CompareByDate;
        const daysToFill = props.range === RANGES.WEEK ? 7 : 30;
        const today = new Date();
        const startRange =  subDays(today, daysToFill);
        for (let i = 0; i <= daysToFill; i++) {
            const day = format((addDays(startRange, i )), 'YYYY-MM-DD');
            const pastDate = format(subDays(day, daysToFill ), 'YYYY-MM-DD');
            const prevSuccess = prevData[pastDate] ? prevData[pastDate].effective || 0 : 0;
            const prevUnsuccess = prevData[pastDate] ? prevData[pastDate]['not-effective'] || 0 : 0;
            const prevTotal = prevSuccess + prevUnsuccess;
            mergedData[day] = {
                shouldCompare: props.shouldCompare,
                currentTitle: format(day, TOOLTIP_TITLE_FORMAT),
                effective: data[day] ? data[day].effective || 0 : 0,
                ['not-effective']: data[day] ? data[day]['not-effective'] || 0 : 0,
                prevTitle: format(pastDate, TOOLTIP_TITLE_FORMAT),
                prevSuccess,
                prevUnsuccess,
                prevTotal,
                hideTitle: true
            } as any;
        }
        return mergedData;
    };
    return (
        <CheckinsByDate
            data={mergeData(props.data, props.previousData)}
            width={props.width}
            shouldCompare={props.shouldCompare}
            tooltip={<CheckinsTooltip />}
            legend={<CheckinsLegend shouldCompare={props.shouldCompare} range={props.range} />}
            dateFormat={props.range === RANGES.WEEK ? 'dddd' : undefined}
            flatXTick={props.range === RANGES.WEEK}
        />
    );
}