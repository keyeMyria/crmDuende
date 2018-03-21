import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export function currencyFormatter(data: number, row: {}, currency: {}) {
    if (currency) {
        return `${currency} ${data}`;
    } else {
        return (
            <FormattedMessage id="common.bootstrap_table.data_formatters.currency" >
                {(text: string) => (
                    <span> {text} {data} </span>
                )}
            </FormattedMessage>
        );
    }
}