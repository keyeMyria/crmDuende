import * as React from 'react';
import * as Card from '../../common/components/card';
import { FormattedMessage } from 'react-intl';
import { DoneChekins } from '../../reports/checkin-report/components/charts/done-checkins';
import { CheckinTypeLabel } from '../../reports/checkin-report/components/checkin-type-label';
import { ComparatorLegend } from './comparator-legend';
import { Totals } from '../../reports/checkin-report/types/checkin-report';
import { RANGES } from '../util/comparator-ranges';
import '../styles/made-checkins-card.css';

export interface MadeCheckinsCardProps {
    currentData: Totals;
    previousData: Totals;
    range: RANGES;
}

export function MadeCheckinsCard(props: MadeCheckinsCardProps) {

    const currentEffective = props.currentData.effective;
    const currentNotEffective = props.currentData['not-effective'];

    const previousEffective = props.previousData.effective;
    const previousNotEffective = props.previousData['not-effective'];

    const currentTotal = currentEffective + currentNotEffective;
    const previousTotal = previousEffective + previousNotEffective;

    return (
        <Card.Container class="cb-container">
            <FormattedMessage id="checkins_made">
                {(title: string) => (
                    <Card.Title title={title} class="mcc-title" />
                )}
            </FormattedMessage>
            {(currentEffective === 0 && currentNotEffective === 0) ? (
                <div className="row mcc-value cb-value">0</div>
            ) : (
                <div className="row">
                    <div className="col-xs-12 col-sm-7">
                        <div className="mcc-chart-container">
                            <DoneChekins
                                successfulCnt={currentEffective}
                                unsuccessfulCnt={currentNotEffective}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-5 done-checkins">
                        <CheckinTypeLabel successful={true} value={currentEffective} />
                        <CheckinTypeLabel successful={false} value={currentNotEffective} />
                    </div>
                </div>    
            )}
            <div className="row">
                <ComparatorLegend
                    currentValue={currentTotal}
                    previousValue={previousTotal}
                    range={props.range}
                />
            </div>
        </Card.Container>
    );
}
