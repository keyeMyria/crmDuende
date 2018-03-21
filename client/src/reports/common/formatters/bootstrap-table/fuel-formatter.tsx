import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export function fuelFormatter(fuel: number, row: {}, uomVolume: {}) {
    if (uomVolume) {
        return `${fuel} ${uomVolume}`;
    } else {
        return (
            <FormattedMessage id="common.bootstrap_table.data_formatters.fuel" >
                {(text: string) => (
                    <span>{fuel} {text} </span>
                )}
            </FormattedMessage>
        );
    }
}