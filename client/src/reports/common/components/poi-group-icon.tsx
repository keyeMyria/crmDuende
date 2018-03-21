import * as React from 'react';

const defaultColor = '#f2f2f2';

export interface PoiGroupIconProps {
    color?: string;
}

export function PoiGroupIcon (props: PoiGroupIconProps) {
    return (<i className="icon-poi-group" style={{color: props.color || defaultColor}} />);
}
