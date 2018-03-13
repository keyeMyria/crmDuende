import * as React from 'react';
import IndexStore from '../stores';
import Manager from './manager';

export default function () {

    const clientsContainer = () => (
        <div>
            <div className="container">
                <Manager
                    store={IndexStore}
                />
            </div>
        </div>
    );

    let ClientsContainer = (clientsContainer);

    return (
        <ClientsContainer />
    );
}