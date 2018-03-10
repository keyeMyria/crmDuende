import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface NotAvailable {
    messageId?: string;
}

export default function NotAvailable(props: NotAvailable) {
    return (
        <div style={{ color: 'gray', display: 'inline-block' }}>
            <FormattedMessage id={props.messageId || 'No hay disponibles'} />
        </div>
    );
}
