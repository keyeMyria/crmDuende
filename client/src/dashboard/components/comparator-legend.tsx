import * as React from 'react';
import '../styles/comparator-legend.css';
import { FormattedMessage } from 'react-intl';
import { DifferencePercent } from './difference-percent';
import { ComparatorRange, RANGE_TYPE } from './comparator-range';
import { RANGES } from '../util/comparator-ranges';

export interface ComparatorLegendProps {
    currentValue: number;
    previousValue: number; 
    range: RANGES;
    reverseColors?: boolean;
}

export function ComparatorLegend(props: ComparatorLegendProps) {
    return (
        <div className="row cl-container">
            <DifferencePercent
                currentValue={props.currentValue}
                previousValue={props.previousValue}
                reverseColors={props.reverseColors}
            />
            <FormattedMessage id="vs_previous" />
            &nbsp;<ComparatorRange type={RANGE_TYPE.PREVIOUS} range={props.range} />&nbsp;<b>({props.previousValue})</b>
        </div>
    );
}