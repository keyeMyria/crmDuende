import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export interface LoadingProps {
}

export default function Loading (props: LoadingProps) {
    return <p className="react-loading"><FormattedMessage id={'global.loading'} /></p>;
}
