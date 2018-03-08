import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const isRequired = (intlId: string) => (
    <FormattedMessage id={intlId} />
);