import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import '../resources/styles/param-row.css';

export interface ParamRowProps {
    children?: any;
    labelId: string;
    labelValues?: {};
    isRequired?: boolean;
    className?: string;
    lg?: number;
    xs?: number;
    md?: number;
    sm?: number;
}

export function ParamRow(props: ParamRowProps) {

    const lg = `col-lg-${props.lg || 6}`;
    const md = `col-md-${props.md || 8}`;
    const sm = `col-sm-${props.sm || 10}`;
    const xs = `col-xs-${props.xs || 12}`;

    return (
        <div className={`row ${props.className ? props.className : ''}`}>
            <div className="text-right col-sm-2 col-xs-12">
                <FormattedMessage id={props.labelId} values={props.labelValues}>
                    {(text: string) => (
                        <label className={props.isRequired ? 'pr-req' : ''}>
                            {text}:
                        </label>
                    )}
                </FormattedMessage>
            </div>
            <div className={`fix-react-select ${sm} ${md} ${lg} ${xs}`}>
                {props.children}
            </div>
        </div>
    );
}
