import * as React from 'react';
interface NotAvailable {
    messageId?: string;
}

export default function NotAvailable(props: NotAvailable) {
    return (
        <div style={{ color: 'gray', display: 'inline-block' }}>
            {props.messageId || 'No hay disponibles'}
        </div>
    );
}
