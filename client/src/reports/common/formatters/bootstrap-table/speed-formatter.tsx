import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export function speedFormatter(avgSpeed: number, row: {}, uomSpeed: {}) {
    if (uomSpeed) {
        return `${avgSpeed} ${uomSpeed}`;
    } else {
        return (
            <FormattedMessage id="common.bootstrap_table.data_formatters.kmH" >
                {(text: string) => (
                    <span>{avgSpeed} {text} </span>
                )}
            </FormattedMessage>
        );
    }
}