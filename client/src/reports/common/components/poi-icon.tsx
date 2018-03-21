import * as React from 'react';

const defaultColor = '#f2f2f2';

export interface PoiIconProps {
    color?: string;
    size?: string;
}

export function PoiIcon (props: PoiIconProps) {
    return <i className="icon-reference-point" style={{color: props.color || defaultColor, fontSize: props.size}} />;
}
