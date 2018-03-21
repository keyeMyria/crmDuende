import * as React from 'react';
import IndexStore from '../stores';
import Manager from './manager';

export default function () {

    const existenceLineContainer = () => (
        <div>
            <div className="container">
                <Manager
                    store={IndexStore}
                />
            </div>
        </div>
    );

    let ExistenceContainer = (existenceLineContainer);

    return (
        <ExistenceContainer />
    );
}