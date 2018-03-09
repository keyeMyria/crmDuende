import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import UsersManager from './users'; 
import NotFound from './not-found';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <BrowserRouter>
            <div>
              <Switch>
                  <Route path="/users" component={UsersManager} />
                  <Route component={NotFound} />
              </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
