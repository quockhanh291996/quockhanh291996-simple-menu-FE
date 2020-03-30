import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';

import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { muiTheme } from '~common/mui-theme';
import { APP_PATH } from '~constants/path';
import { Home } from '~pages/home/home';
import { StartUpPage } from '~pages/startup/startup';

/**
 * App start from here
 * Basically it does all base configuration before rendering actual app
 */
export const App: React.FunctionComponent = (): JSX.Element => {
  const token = '';

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <HashRouter>
          <Switch>
            <Route exact path={APP_PATH.LOGIN}>
              {token.length === 0 ? (
                <StartUpPage />
              ) : (
                <Redirect to={APP_PATH.DEFAULT}></Redirect>
              )}
            </Route>
            <Route exact path={APP_PATH.REGISTRATION}>
              {token.length === 0 ? (
                <StartUpPage />
              ) : (
                <Redirect to={APP_PATH.DEFAULT}></Redirect>
              )}
            </Route>
            <Route>
              {token.length === 0 ? (
                <Redirect to={APP_PATH.LOGIN}></Redirect>
                ) : (
                <Home />
              )}
            </Route>
          </Switch>
        </HashRouter>
    </ThemeProvider>
  );
};
