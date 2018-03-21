import * as React from 'react';

export interface RotatedTickProps {
    x?: number;
    y?: number;
    payload?: {
        value: string;
    };
}

export function RotatedTick (props: RotatedTickProps) {
    return (
        <g transform={`translate(${props.x},${props.y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#333" transform="rotate(-35)" >
                {props.payload && props.payload.value}
            </text>
        </g>
    );
}
