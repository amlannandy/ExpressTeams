import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import './app.css';
import store from './store/store';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { loadUser } from './store/actions/auth';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/' component={Home} />
        </Switch>
      </Fragment>
    </Provider>
  );
};

export default App;
