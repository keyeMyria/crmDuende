import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export interface ParamDateRowProps {
    children?: JSX.Element | JSX.Element[];
    labelId: string;
}

export function ParamDateRow(props: ParamDateRowProps) {
    return (
        <div className="row">
            <div className="text-right col-sm-2 col-xs-12">
                <FormattedMessage id={props.labelId}>
                    {(text: string) => (
                        <label>{text}:</label>
                    )}
                </FormattedMessage>
            </div>
            <div className="fix-react-select col-sm-10 col-md-8 col-lg-6 col-xs-12 filters">
                {props.children}
            </div>
        </div>
    );
}
