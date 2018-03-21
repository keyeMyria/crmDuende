import * as React from 'react';

export interface ParamsFormProps {
    children?: JSX.Element | JSX.Element[];
}

export function ParamsForm(props: ParamsFormProps) {
    return (
        <div className="drf-container">
            {props.children}
        </div>
    );
}
