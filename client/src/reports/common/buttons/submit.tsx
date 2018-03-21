import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export interface SubmitProps {
    disabled?: boolean;
    isFetching?: boolean; 
    onSubmit(): void;
}

export function Submit(props: SubmitProps) {

    const getIntlId = () => (
        props.isFetching ? 'common.loading' : 'common.view_report'
    );

    return (
        <FormattedMessage id={getIntlId()}>
            {(text: string) => (
                <div
                    tabIndex={0}
                    className={`btn btn-primary ${props.disabled && 'disabled-btn'}`}
                    onClick={props.disabled ? undefined : props.onSubmit}
                >
                    {text}
                </div>
            )}
        </FormattedMessage>
    );
}
