import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { globalRootStore } from '~stores/root';

import { FormInput } from '~components/form-input/form-input';
import { APP_PATH } from '~constants/path';
import { USER_STATE } from '~stores/user/user.info';

import { useStyles } from './styles';

/**
 * Login form here.
 */
export const LoginForm: React.FC = observer(
  (): JSX.Element => {
    const { t } = useTranslation();

    const classes = useStyles();
    const {
      UserStore: { userState, message, login },
    } = useContext(globalRootStore);
    const history = useHistory();

    /* Form hanlder */
    const { handleSubmit, errors, control } = useForm();

    const onLogin = (data: any) => {
      login(data);
    };

    /** React's hooks */
    useEffect(() => {
      if (userState === USER_STATE.LOGIN_SUCCESS) {
        history.push(APP_PATH.DEFAULT);
      }
    }, [userState]);

    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(onLogin)}>
          <Grid container direction={'column'} spacing={3}>
            {/* Input area */}
            <Grid item>
              <FormInput
                required
                fullWidth
                control={control}
                name="username"
                errors={errors}
                error={!!errors.username}
                component={TextField}
                label={t('startUpPage.login.usernamePlaceHolder')}
              ></FormInput>
            </Grid>

            <Grid item>
              <FormInput
                required
                fullWidth
                control={control}
                name="password"
                type={'password'}
                errors={errors}
                error={!!errors.password}
                component={TextField}
                additionValidation={{
                  minLength: {
                    value: 8,
                    message: t('form.passwordTooShort'),
                  },
                }}
                label={t('startUpPage.login.passwordPlaceHolder')}
              ></FormInput>
            </Grid>

            {/* Submition area */}
            <Grid
              item
              container
              alignItems={'center'}
              justify={'space-between'}
            >
              <Grid item xs={5}>
                <Button
                  variant={'contained'}
                  color={'secondary'}
                  type={'submit'}
                >
                  {userState === USER_STATE.LOGIN_WAITING && (
                    <CircularProgress size={20} color={'inherit'} />
                  )}
                  {t('startUpPage.login.submitButton')}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Message when errors occur */}
          {userState === USER_STATE.LOGIN_FAILED && (
            <p className={classes.erroMessage}> {message}</p>
          )}
        </form>
      </React.Fragment>
    );
  },
);
