import * as React from 'react';
import Stores from './store-manager';
import RootStore from '../stores';

export default function (props: { locale: any }) {
    const store = new RootStore();

    const container = (injected: any) => (
        <div>
            <div className="container">
                <Stores store={store} />
            </div>
        </div>
    );

    let Container = (container);

    return (
        <Container />
    );
}