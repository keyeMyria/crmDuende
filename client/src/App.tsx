import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import UsersManager from './users';
import StoresManager from './store';
import ClientsManager from './client';
import NotFound from './not-found';
import ProductManagerRoute from './product-and-category/routes/products-manager';
import ProviderManager from './provider';
import BillManager from './bill/routes/manager';


class App extends React.Component<{}, {}> {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/store" component={StoresManager} />
            <Route path="/provider" component={ProviderManager} />
            <Route path="/users" component={UsersManager} />
            <Route path="/client" component={ClientsManager} />
            <Route path="/products" component={ProductManagerRoute} />
            <Route path="/bill" component={BillManager} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
