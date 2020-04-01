import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';

import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import { muiTheme } from '~common/mui-theme';
import { Interceptor } from '~components/axios-intercepter/axios-intercepter';
import { GlobalDialog } from '~components/common/global-dialog/global-dialog';
import { APP_PATH } from '~constants/path';
import { Home } from '~pages/home/home';
import { StartUpPage } from '~pages/startup/startup';
import { StorageService } from '~services/storage/storage';
import { globalRootStore } from '~stores/root';
import { IUserInfo } from '~stores/user/user.info';

/**
 * App start from here
 * Basically it does all base configuration before rendering actual app
 */
export const App: React.FunctionComponent = observer(
  (): JSX.Element => {
    const {
      UserStore: { token, setUser },
    } = useContext(globalRootStore);

    useEffect(() => {
      const userInfo = StorageService.get('user');
      const pToken = StorageService.get('token');
      if (userInfo && pToken) {
        const tmpUserInfo: IUserInfo = JSON.parse(userInfo);
        setUser(tmpUserInfo, pToken);
      }
    }, []);

    return (
      <ThemeProvider theme={muiTheme}>
        <Interceptor />
        <CssBaseline />
        <GlobalDialog />
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
  },
);
