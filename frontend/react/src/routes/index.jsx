import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'Home';
import NotFound from 'NotFound';

function Routes() {
  const routes = [
    {
      path: '/',
      component: Home,
      exact: true,
    },
  ];
  return (
    <Switch>
      {
        routes.map(route => (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        ))
      }
      <Route path={'*'} component={NotFound} />
    </Switch>
  );
}

export default Routes;
