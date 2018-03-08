import * as React from 'react';
import { RectangleProps } from 'recharts';

export function StripedBar({ fill, x = 0, y = 0, width = 0, height = 0 }: RectangleProps) {

    const calculateYPosition = (): number => height < 0 ? (y + height) : y;

    return (
        <rect
            fill={fill!}
            mask="url(#mask-stripe)"
            x={x}
            y={calculateYPosition()}
            width={width}
            height={Math.abs(height)}
        />
    );
}