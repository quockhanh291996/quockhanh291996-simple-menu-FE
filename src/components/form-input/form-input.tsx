import React from 'react';
import { Controller, ErrorMessage } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useStyles } from './styles';

interface FormInputProps {
  name: string;
  defaultValue?: any;
  //
  errors: any;
  control: any;
  additionValidation?: any;
  component: React.ReactElement | React.ElementType | string;
  //validation
  required?: boolean;
  [x: string]: any;
}

/** This component use to control any input - value wiht react-hook-form */
export const FormInput: React.FC<FormInputProps> = (props: FormInputProps) => {
  const {
    name,
    defaultValue,
    errors,
    control,
    component,
    additionValidation,
    required,
    ...rest
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Controller
        as={component as any}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: required
            ? {
                value: true,
                message: t('form.required'),
              }
            : required,
          ...additionValidation,
        }}
        {...rest}
      ></Controller>
      <ErrorMessage errors={errors} name={name}>
        {({ message }) => <p className={classes.errorMessage}>{message}</p>}
      </ErrorMessage>
    </React.Fragment>
  );
};
