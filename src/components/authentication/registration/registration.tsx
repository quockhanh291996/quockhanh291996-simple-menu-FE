import { observer } from 'mobx-react-lite';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Button, Grid, TextField } from '@material-ui/core';
import { emailPattern } from '~common/validator';
import { FormInput } from '~components/form-input/form-input';
import { APP_PATH } from '~constants/path';
import { UserService } from '~services/features/user.service';

/**
 * Registration form here.
 */
export const RegistrationForm: React.FC = observer(
  (): JSX.Element => {
    const { t } = useTranslation();

    const history = useHistory();

    const { register } = UserService;

    /* Form hanlder */
    const { handleSubmit, errors, watch, control } = useForm();

    const onRegister = async (data: any) => {
      delete data.retypePassword;
      try {
        await register(data);
        history.push(APP_PATH.LOGIN);
      } catch (e) {}
    };

    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(onRegister)}>
          <Grid container direction={'column'} spacing={3}>
            {/* Input area */}
            <Grid item>
              <FormInput
                required
                fullWidth
                control={control}
                name="username"
                errors={errors}
                error={!!errors.firstname}
                component={TextField}
                label={t('startUpPage.registration.usernamePlaceHolder')}
              ></FormInput>
            </Grid>

            {/*  */}
            <Grid item>
              <FormInput
                required
                fullWidth
                control={control}
                name="email"
                errors={errors}
                error={!!errors.email}
                component={TextField}
                additionValidation={{
                  pattern: {
                    value: emailPattern,
                    message: t('form.invalidField', { fieldName: 'Email' }),
                  },
                }}
                label={t('startUpPage.registration.emailPlaceHolder')}
              ></FormInput>
            </Grid>

            {/*  */}
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
                label={t('startUpPage.registration.passwordPlaceHolder')}
              ></FormInput>
            </Grid>

            {/*  */}
            <Grid item>
              <FormInput
                required
                fullWidth
                control={control}
                name="retypePassword"
                type={'password'}
                errors={errors}
                error={!!errors.retypePassword}
                component={TextField}
                additionValidation={{
                  validate: (value: string) =>
                    value !== watch('password')
                      ? t('form.passwordNotMatch')
                      : undefined,
                }}
                label={t('startUpPage.registration.retypePasswordPlaceHolder')}
              ></FormInput>
            </Grid>

            {/* Submition area */}
            <Grid item>
              <Button
                fullWidth
                variant={'contained'}
                color={'secondary'}
                type={'submit'}
              >
                {t('startUpPage.registration.submitButton')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  },
);
