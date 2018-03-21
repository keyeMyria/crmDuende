import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export interface PrintProps {
    disabled?: boolean;
    isFetching?: boolean;
}

export function Print(props: PrintProps) {

    return (
        <FormattedMessage id={'common.print'}>
            {(text: string) => (
                <a
                    className={`btn btn-default`}
                    href="javascript:window.print('react-root')"
                >
                    <i className="icon-print" />
                    {text}

                </a>
            )}
        </FormattedMessage>
    );
}
