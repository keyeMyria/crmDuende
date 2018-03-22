import * as React from 'react';
import { ComparatorBox } from './comparator-box';
import { RANGES } from '../util/comparator-ranges';
import { MadeCheckinsCard } from './made-checkins-card';
import { Totals } from '../../reports/checkin-report/types/checkin-report';
import { FormattedMessage } from 'react-intl';

export interface DashboardSummaryProps {
    range: RANGES;
    createdPois: [number, number];
    rulesBroken: [number, number];
    madeCheckins: [Totals, Totals];
}

export function DashboardSummary (props: DashboardSummaryProps) {

    const [currentPois, prevPois] = props.createdPois;
    const [currentRules, prevRules] = props.rulesBroken;
    const [currentCheckins, prevCheckins] = props.madeCheckins;

    return (
        <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12">
                <MadeCheckinsCard
                    range={props.range}
                    currentData={currentCheckins}
                    previousData={prevCheckins}
                />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
                <ComparatorBox
                    title={<FormattedMessage id={'created_pois'} />}
                    range={props.range}
                    currentValue={currentPois}
                    previousValue={prevPois}
                />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
                <ComparatorBox
                    title={<FormattedMessage id={'rules_broken'} />}
                    range={props.range}
                    currentValue={currentRules}
                    previousValue={prevRules}
                    reverseColors={true}
                />
            </div>
        </div>
    );
}
