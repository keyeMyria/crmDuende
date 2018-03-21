import * as React from 'react';
import IndexStore from '../stores';
import Manager from './manager';

export default function () {

    const productsContainer = () => (
        <div>
            <div className="container">
                <Manager
                    store={IndexStore}
                />
            </div>
        </div>
    );

    let ProductsContainer = (productsContainer);

    return (
        <ProductsContainer />
    );
}

// fijar estructura s
