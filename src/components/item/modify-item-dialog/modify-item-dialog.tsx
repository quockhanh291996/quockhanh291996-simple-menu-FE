import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CDialog } from '~components/common/dialog/dialog';
import { FormInput } from '~components/form-input/form-input';
import { IItem } from '~stores/item/item.info';
import { globalRootStore } from '~stores/root';

import { useStyles } from './styles';

export enum MODIFY_ITEM_DIALOG_TYPE {
  ADD,
  MODIFY,
}

interface ModifyItemDialogProps {
  open: boolean;
  type: MODIFY_ITEM_DIALOG_TYPE;
  item?: IItem;
  onClose(): void;
  onSubmit(data: any): void;
}

export const ModifyItemDialog: React.FC<ModifyItemDialogProps> = observer(
  (props: ModifyItemDialogProps): JSX.Element => {
    const classes = useStyles();
    const { type, onSubmit, item, ...rest } = props;
    const { t } = useTranslation();
    const { handleSubmit, errors, control } = useForm();
    const {} = useContext(globalRootStore);

    return (
      <CDialog
        {...rest}
        fullWidth
        title={
          type === MODIFY_ITEM_DIALOG_TYPE.ADD
            ? t('modifyItemDialog.addTitle')
            : t('modifyItemDialog.modifyTitle')
        }
        actionPropsList={[
          {
            text: t('modifyItemDialog.submit'),
            onClick: handleSubmit(onSubmit),
          },
        ]}
      >
        <Grid container>
          <Grid item xs={12}>
            <label className={classes.inputLabel}>
              {t('modifyItemDialog.nameLabel')}
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

          <Grid item xs={12}>
            <label className={classes.inputLabel}>
              {t('modifyItemDialog.description')}
            </label>
            <FormInput
              required
              fullWidth
              variant={'outlined'}
              control={control}
              name="description"
              errors={errors}
              error={!!errors.description}
              component={<TextField multiline rows={4} rowsMax={4} />}
            ></FormInput>
          </Grid>

          <Grid item xs={12}>
            <label className={classes.inputLabel}>
              {t('modifyItemDialog.thumbnail')}
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
        </Grid>
      </CDialog>
    );
  },
);
