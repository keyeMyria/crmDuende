import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../resources/styles/no-data.css';

export default function NoData(props?: {}) {
    return <p className="no-data"><FormattedMessage id={'global.no_data_to_display'} /></p>;
}
