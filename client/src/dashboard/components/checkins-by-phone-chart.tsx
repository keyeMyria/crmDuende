import * as React from 'react';
import { ByPhone } from '../../reports/checkin-report/types/checkin-report';
import {
    CheckinsByPhone, CompareByPhone
} from '../../reports/checkin-report/components/charts/checkins-by-phone';
import { CheckinsLegend } from './checkins-legend';
import { RANGES } from '../util/comparator-ranges';
import { CheckinsTooltip } from './checkins-tooltip';
import { ComparatorRange, RANGE_TYPE } from './comparator-range';
import Cellphone from '../../reports/common/stores/cellphones/cellphone';

export interface CheckinsByPhoneChartProps {
    data: ByPhone;
    previousData: ByPhone;
    width: number;
    range: RANGES;
    shouldCompare?: boolean;
    cellphones: Cellphone[];
}

export function CheckinsByPhoneChart(props: CheckinsByPhoneChartProps) {

    const removeRepeated = (cellphones: string[]) => Array.from(new Set(cellphones)) as string[];

    const mergeData = (data: ByPhone, toMerge: ByPhone): CompareByPhone => {
        const currentsId = Object.keys(data);
        const previousId = Object.keys(toMerge);
        const phonesToCompare = removeRepeated([...currentsId, ...previousId]);
        const mergedData: CompareByPhone = {} as CompareByPhone;
        phonesToCompare.forEach(phone => {
            const prevSuccess = toMerge[phone] ? toMerge[phone].effective || 0 : 0;
            const prevUnsuccess = toMerge[phone] ? toMerge[phone]['not-effective'] || 0 : 0;
            const prevTotal = prevSuccess + prevUnsuccess;
            const name = getCellphoneName(phone);
            mergedData[name] = {
                ...data[phone],
                shouldCompare: props.shouldCompare,
                prevSuccess,
                prevUnsuccess,
                prevTotal,
                prevTitle: <ComparatorRange type={RANGE_TYPE.PREVIOUS} range={props.range} />,
                currentTitle: <ComparatorRange type={RANGE_TYPE.CURRENT} range={props.range} />
            } as any;
        });
        return mergedData;
    };

    const getCellphoneName = (id: string) => {
        const cellphone = props.cellphones.find(cell => cell.id === id);
        return cellphone ? cellphone.description : '';
    };

    return (
        <CheckinsByPhone
            data={mergeData(props.data, props.previousData)}
            width={props.width}
            shouldCompare={props.shouldCompare}
            legend={<CheckinsLegend shouldCompare={props.shouldCompare} range={props.range} />}
            tooltip={<CheckinsTooltip />}
        />
    );
}
