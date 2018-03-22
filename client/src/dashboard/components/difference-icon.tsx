import * as React from 'react';
const equalArrow = require('../../common/resources/pictures/equal-arrow.svg');

export interface DifferenceIconProps {
    difference: number;
}

export function DifferenceIcon (props: DifferenceIconProps) {
    if (props.difference === 0) {
        return <i className="cl-icon"><img src={equalArrow} />&nbsp;</i>;
    } else if (props.difference > 0) {
        return <i className="cl-icon icon-arrow_drop_up" />;
    } else {
        return <i className="cl-icon icon-arrow_drop_down" />;
    }
}
