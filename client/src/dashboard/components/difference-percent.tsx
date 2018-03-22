import * as React from 'react';
import { DifferenceIcon } from './difference-icon';

export interface DifferencePercentProps {
    currentValue: number;
    previousValue: number; 
    reverseColors?: boolean;
}

const INCREASE_CLASS = 'cl-up';
const DECREASE_CLASS = 'cl-down';

export function DifferencePercent (props: DifferencePercentProps) {

    const isIncrease = (percentDiff: number) => Math.sign(percentDiff) === 1;

    const percentDifference = (current: number, previous: number) => {
        if (current === 0 && previous === 0) {
            return 0;
        } else if (previous === 0) {
            return 100;
        }
        return Math.round(((current - previous) / previous) * 100);
    };

    const getDifferenceClass = (percentDiff: number) => {
        if (percentDiff === 0) {
            return 'cl-equal';
        } else if (isIncrease(percentDiff)) {
            return props.reverseColors ? DECREASE_CLASS : INCREASE_CLASS;
        } else {
            return props.reverseColors ? INCREASE_CLASS : DECREASE_CLASS;
        }
    };

    const difference = percentDifference(props.currentValue, props.previousValue);

    return (
        <span className={`cl-percent ${getDifferenceClass(difference)}`}>
            <DifferenceIcon
                difference={difference}
            />{Math.abs(difference)}%&nbsp;
        </span>
    );
}
