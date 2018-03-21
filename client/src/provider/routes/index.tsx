import * as React from 'react';
import IndexStore from '../stores';
import Manager from './manager';

export default function () {

    const providerContainer = () => (
        <div>
            <div className="container">
                <Manager
                    store={IndexStore}
                />
            </div>
        </div>
    );

    let ProviderContainer = (providerContainer);

    return (
        <ProviderContainer />
    );
}