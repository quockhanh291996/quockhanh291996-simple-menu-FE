import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { LoginForm } from '~components/authentication/login/login';
import { RegistrationForm } from '~components/authentication/registration/registration';
import { APP_PATH } from '~constants/path';

const routes: RouteProps[] = [
  /**
   * Do not apply lazy loading for login/registration page
   * because they are sections of startup page, need load together to improve animation
   */
  {
    path: APP_PATH.LOGIN,
    render: () => <LoginForm />,
  },
  {
    path: APP_PATH.REGISTRATION,
    render: () => <RegistrationForm />,
  },
];

/**
 * Generates Routes from routes data
 */
function getRoutes(): JSX.Element[] {
  return routes.map((route: RouteProps) => (
    <Route
      key={route.path as string}
      exact={true}
      path={route.path}
      render={route.render}
    />
  ));
}

/**
 * All Routes of app
 */
export const Routes: React.FunctionComponent = (): JSX.Element => (
  <React.Fragment>{getRoutes()}</React.Fragment>
);
