import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CircleCheckin } from '../../reports/checkin-report/components/circle-checkin';
import { RANGES } from '../util/comparator-ranges';
import { ComparatorRange, RANGE_TYPE } from './comparator-range';
import '../styles/checkins-legend.css';

export interface CheckinsLegendProps {
    shouldCompare?: boolean;
    range: RANGES;
}

export function CheckinsLegend(props: CheckinsLegendProps) {

    const NormalLegend = ({ }) => (
        <div className="legend-item">
            <ComparatorRange type={RANGE_TYPE.CURRENT} range={props.range} />:&nbsp;
            <FormattedMessage id="checkin_type.successful">
                {(text: string) => (
                    <span className="chart-legend cl-item">
                        <CircleCheckin successful={true} /> {text}
                    </span>
                )}
            </FormattedMessage>
            <FormattedMessage id="checkin_type.unsuccessful">
                {(text: string) => (
                    <span className="chart-legend cl-item">
                        <CircleCheckin successful={false} /> {text}
                    </span>
                )}
            </FormattedMessage>
        </div>
    );

    const PreviousLegend = ({ }) => (
        <div className="legend-item">
            <ComparatorRange type={RANGE_TYPE.PREVIOUS} range={props.range} />:&nbsp;
            <FormattedMessage id="checkin_type.successful">
                {(text: string) => (
                    <span className="chart-legend cl-item">
                        <CircleCheckin isPrevious={true} successful={true} /> {text}
                    </span>
                )}
            </FormattedMessage>
            <FormattedMessage id="checkin_type.unsuccessful">
                {(text: string) => (
                    <span className="chart-legend cl-item">
                        <CircleCheckin isPrevious={true} successful={false} /> {text}
                    </span>
                )}
            </FormattedMessage>
        </div>
    );

    return (
        <div className="legend-container">
            <NormalLegend />
            {props.shouldCompare && (
                <PreviousLegend />
            )}
        </div>
    );
}
