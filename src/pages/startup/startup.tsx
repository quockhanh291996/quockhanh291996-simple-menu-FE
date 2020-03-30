import {
  CircularProgress,
  Grid,
  Tab,
  Tabs,
  ThemeProvider,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import { APP_PATH } from '~constants/path';
import * as logo from '~img/logo.png';

import { startUpScreenFormTheme, useStyles } from './styles';

enum TAB_VALUE {
  LOGIN,
  REGISTRATION,
}

const getTabValue = (currentPath: string) =>
  currentPath === APP_PATH.LOGIN ? TAB_VALUE.LOGIN : TAB_VALUE.REGISTRATION;

/**
 * Startup page here -- It contains the login and registration page.
 */
export const StartUpPage: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [currentTab, setTab] = useState(getTabValue(location.pathname));

  const onTabChange = (_: React.ChangeEvent<{}>, newValue: TAB_VALUE) => {
    if (currentTab !== newValue) {
      if (newValue === TAB_VALUE.LOGIN) {
        history.push(APP_PATH.LOGIN);
      } else {
        history.push(APP_PATH.REGISTRATION);
      }
    }
  };

  useEffect(() => {
    if (location) {
      setTab(getTabValue(location.pathname));
    }
  }, [location]);

  return (
    <Grid className={classes.container} container>
      {/* The section for introduction */}
      <Grid
        item
        sm={12}
        md={7}
        className={classes.introArea}
        container
        direction={'column'}
        justify={'center'}
        alignItems={'center'}
      >
        <img src={logo} className={classes.logoImage}></img>
      </Grid>

      {/* The section for login, resgitration */}
      <Grid
        item
        sm={12}
        md={5}
        container
        direction={'column'}
        justify={'center'}
        alignItems={'center'}
      >
        {/* Tabs to switch between login and registration form */}
        <div className={classes.formContainer}>
          <Tabs
            value={currentTab}
            onChange={onTabChange}
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabContainer}
            centered
          >
            <Tab
              label={t('startUpPage.login.tabName')}
              value={TAB_VALUE.LOGIN}
              className={classes.tabItem}
            />
            <Tab
              label={t('startUpPage.registration.tabName')}
              value={TAB_VALUE.REGISTRATION}
              className={classes.tabItem}
            />
          </Tabs>

          {/* Action form */}
          <div className={classes.formArea}>
            <React.Suspense fallback={<CircularProgress />}>
              <ThemeProvider theme={startUpScreenFormTheme}>
                {/* <Routes /> */}
              </ThemeProvider>
            </React.Suspense>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
