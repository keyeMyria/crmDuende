import * as React from 'react';
import NavTab from '../../common/components/nav-tab';
import CategoryManager from './category-manager';
import ProductsManager from './products-manager';

import {
  Route,
  Switch
} from 'react-router-dom';

export default function() {
    return (
        <div>
            <div className="title-page-container">
                <div className="container page-title">
                    Productos y Categorías
                </div>
            </div>
            <div className="container">
                <nav className="tabs-container">
                    <ul className="nav nav-tabs">
                        <NavTab to="/products/" activeClassName="active">Productos</NavTab>
                        <NavTab to="/category/" activeClassName="active">Categorías</NavTab>
                    </ul>
                </nav>
            </div>
            <Switch>
                <Route path="/products/" component={ProductsManager} exact={true} />
                <Route path="/category/" component={CategoryManager} />
            </Switch>
        </div>
    );
}
