import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import UsersManager from './users';
// import StoresManager from './store';
import ClientsManager from './client';
import NotFound from './not-found';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {/* <Route path="/store" component={StoresManager} /> */}
            <Route path="/users" component={UsersManager} />
            <Route path="/client" component={ClientsManager} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
