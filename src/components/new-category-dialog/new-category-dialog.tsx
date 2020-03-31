import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CDialog } from '~components/common/dialog/dialog';
import { FormInput } from '~components/form-input/form-input';
import { CATEGORY_STATE } from '~stores/category/category.info';
import { globalRootStore } from '~stores/root';

import { useStyles } from './styles';

/**
 * Layout use for each section in the home component
 */

 interface NewCategoryDialogProps {
   open: boolean;
   onClose?(): void;
 }

export const NewCategoryDialog: React.FC<NewCategoryDialogProps> = observer(
  (props: NewCategoryDialogProps): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { handleSubmit, errors, control } = useForm();
    const {
      CategoryStore: { create, state, fetchAll, message},
    } = useContext(globalRootStore);

    const createCategory = (data: any) => {
      create(data);
    };

    useEffect(() => {
      if (state === CATEGORY_STATE.ADD_CATEGORY_SUCCESS) {
        fetchAll();
        props.onClose ? props.onClose() : undefined;
      }
    }, [state]);

    return (
      <CDialog
        {...props}
        fullWidth
        title={t('newCategoryDialog.title')}
        actionPropsList={[
          {
            text: t('newCategoryDialog.actionButton'),
            onClick: handleSubmit(createCategory),
          },
        ]}
      >
        <Grid>
          <label className={classes.inputLabel}>
            {t('newCategoryDialog.nameLabel')}
          </label>
          <FormInput
            required
            fullWidth
            variant={'outlined'}
            control={control}
            name="name"
            errors={errors}
            error={!!errors.name}
            component={TextField}
          ></FormInput>
        </Grid>

        {/* Error message here */}
        {state === CATEGORY_STATE.ADD_CATEGORY_FAILED && (
          <p className={classes.erroMessage}> {message}</p>
        )}
      </CDialog>
    );
  },
);
