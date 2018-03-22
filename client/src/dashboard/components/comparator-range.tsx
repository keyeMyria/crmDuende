import * as React from 'react';
import { RANGES } from '../util/comparator-ranges';
import { FormattedMessage } from 'react-intl';

export enum RANGE_TYPE { PREVIOUS, CURRENT }

export interface ComparatorRangeProps {
    range: RANGES;
    type: RANGE_TYPE;
}

type RangeTranslations = {[type: number]: {
    [range: number]: string
}};

const translations: RangeTranslations = {
    [RANGE_TYPE.PREVIOUS]: {
        [RANGES.MONTH]: 'ranges.previous.month',
        [RANGES.WEEK]: 'ranges.previous.week'
    },
    [RANGE_TYPE.CURRENT]: {
        [RANGES.MONTH]: 'ranges.current.month',
        [RANGES.WEEK]: 'ranges.current.week'
    }
};

export function ComparatorRange(props: ComparatorRangeProps) {
    return (
      <FormattedMessage id={translations[props.type][props.range]} />
    );
}
