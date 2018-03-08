import * as React from 'react';
import IndexStore from '../stores';
import Manager from './manager';

export default function () {

    const usersContainer = () => (
        <div>
            <div className="container">
                <Manager
                    store={IndexStore}
                />
            </div>
        </div>
    );

    let UsersContainer = (usersContainer);

    return (
        <UsersContainer />
    );
}