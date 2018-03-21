import * as React from 'react';
import IndexStore from '../stores';
import Manager from './manager';

export default function () {

    const purchasesContainer = () => (
        <div>
            <div className="container">
                <Manager
                    store={IndexStore}
                />
            </div>
        </div>
    );

    let PurchasesContainer = (purchasesContainer);

    return (
        <PurchasesContainer />
    );
}

// fijar estructura s
