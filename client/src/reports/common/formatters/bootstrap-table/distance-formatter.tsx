import { FormattedMessage } from 'react-intl';
import * as React from 'react';

export function distanceFormatter(distance: number, row: {}, uomDist: {}) {
    if (uomDist) {
        return `${distance} ${uomDist}`;
    } else {
        return (
            <FormattedMessage id="common.bootstrap_table.data_formatters.km" >
                {(text: string) => (
                    <span>{distance} {text} </span>
                )}
            </FormattedMessage>
        );
    }
}