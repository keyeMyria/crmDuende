import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export function efficiencyFormatter(efficiency: number, row: {}, uomVolume: {}) {
    if (uomVolume) {
        return `${efficiency} ${uomVolume}`;
    } else {
        return (
            <FormattedMessage id="common.bootstrap_table.data_formatters.efficiency" >
                {(text: string) => (
                    <span>{efficiency} {text} </span>
                )}
            </FormattedMessage>
        );
    }
}