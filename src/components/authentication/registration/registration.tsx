import { Button, Grid, Select, TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { emailPattern } from '~common/validator';
import { FormInput } from '~components/form-input/form-input';
import { APP_PATH } from '~constants/path';
import { UserService } from '~services/features/user.service';
import { IUserRole, USER_ROLE_NAME } from '~stores/user/user.info';

/**
 * Registration form here.
 */
export const RegistrationForm: React.FC = observer(
  (): JSX.Element => {
    const { t } = useTranslation();
    const history = useHistory();

    // Roles input
    // can use cutom form-input to control this input, but choosing the fast way for demo
    const [userRoles, setUserRoles] = useState<IUserRole[]>([]);
    const [currentRoleID, setCurrentRoleID] = useState<number>(-1);

    const { register, getUserRoles } = UserService;

    /* Form hanlder */
    const {
      handleSubmit,
      errors,
      watch,
      control,
      setValue,
      register: formRegister,
    } = useForm();

    /** Component methos */
    const onRegister = async (data: any) => {
      delete data.retypePassword;
      try {
        await register(data);
        history.push(APP_PATH.LOGIN);
      } catch (e) {}
    };

    const onRoleChange = (
      event: React.ChangeEvent<{ name?: string; value: unknown }>,
    ) => {
      setCurrentRoleID(event.target.value as number);
    };

    /** Hooks */
    useEffect(() => {
      /** uesEffect doesn't accept async so wrap it in IIFE */
      (async () => {
        try {
          const roles = await getUserRoles();
          setUserRoles(roles.data);
          setCurrentRoleID(roles.data[0].id);
        } catch (e) {
          console.log(e);
        }
      })();
    }, []);

    useEffect(() => {
      formRegister({ name: 'groups' });
    }, [formRegister]);

    useEffect(() => {
      setValue('groups', [currentRoleID]);
    }, [currentRoleID]);

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
              <Select
                fullWidth
                onChange={onRoleChange}
                defaultValue={-1}
                value={currentRoleID}
              >
                <option key={`default`} value={-1} disabled>
                  {t('startUpPage.registration.rolePlaceHolder')}
                </option>
                {userRoles.map((item) => (
                  <option key={`role-${item.name}`} value={item.id}>
                    {USER_ROLE_NAME[item.id]}
                  </option>
                ))}
              </Select>
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
