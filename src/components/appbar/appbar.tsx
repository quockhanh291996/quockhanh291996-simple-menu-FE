import { AppBar, Button, Grid, Toolbar } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import { APP_PATH } from '~constants/path';
import * as logo from '~img/logo.png';
import { globalRootStore } from '~stores/root';

import { useStyles } from './styles';

/**
 * Appbar, the app header which will be alwas there.
 * Containing various tools like menuButton, language selector etc
 */
export const Appbar: React.FC = observer(
  (): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const {
      UserStore: { logout },
    } = useContext(globalRootStore);

    const onLogout = () => {
      logout();
      history.push(APP_PATH.LOGIN);
    };

    return (
      <AppBar position="fixed" className={classes.appBar} color={'primary'}>
        <Toolbar className={classes.toolbar} disableGutters={true}>
          <Grid container alignItems={'center'} justify={'space-between'}>
            {/* Logo Image */}
            <Grid item className={classes.imageWrapper}>
              <Link to={APP_PATH.DEFAULT}>
                <img
                  src={logo}
                  alt={t('appTitle')}
                  className={classes.logoImage}
                ></img>
              </Link>
            </Grid>

            {/* Loggout button */}
            <Grid>
              <Button variant={'contained'} onClick={onLogout}>
                {t('general.logout')}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  },
);
