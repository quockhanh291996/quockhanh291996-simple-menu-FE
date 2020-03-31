import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CDialog } from '~components/common/dialog/dialog';
import { FormInput } from '~components/form-input/form-input';

import { useStyles } from './styles';

/**
 * Layout use for each section in the home component
 */

interface NewCategoryDialogProps {
  open: boolean;
  onCreate(data: any): void;
  onClose(): void;
}

export const NewCategoryDialog: React.FC<NewCategoryDialogProps> = observer(
  (props: NewCategoryDialogProps): JSX.Element => {
    const { onCreate, ...rest } = props;
    const classes = useStyles();
    const { t } = useTranslation();
    const { handleSubmit, errors, control } = useForm();

    return (
      <CDialog
        {...rest}
        fullWidth
        title={t('newCategoryDialog.title')}
        actionPropsList={[
          {
            text: t('newCategoryDialog.actionButton'),
            onClick: handleSubmit(onCreate),
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
      </CDialog>
    );
  },
);
