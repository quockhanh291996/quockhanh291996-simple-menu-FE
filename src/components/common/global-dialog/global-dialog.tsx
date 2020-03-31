import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { globalRootStore } from '~stores/root';
import { CDialog } from '../dialog/dialog';

import { useStyles } from './styles';

/**
 * Confirmation dialog using when delete or need confirm something
 */

export const GlobalDialog: React.FC = observer(
  (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();
    const {
      GlobalDialogStore: { isOpen, close, message, onConfirm, type },
    } = useContext(globalRootStore);

    const titleClassName =
      type === 'error'
        ? classes.errorTitle
        : type === 'info'
        ? classes.infoTitle
        : '';

    const title =
      type === 'confirmation'
        ? t('globalDialog.confirmationTitle')
        : type === 'error'
        ? t('globalDialog.errorTitle')
        : t('globalDialog.infoTitle');

    return (
      <CDialog
        fullWidth
        open={isOpen}
        onClose={close}
        titleClassName={titleClassName}
        title={title}
        actionPropsList={[
          {
            text: t('globalDialog.cancelButton'),
            hidden: type === 'info' || type === 'error',
            color: 'default',
            onClick: close,
            variant: 'outlined',
          },
          {
            text: t('globalDialog.okButton'),
            onClick: () => {
              onConfirm();
              close();
            },
          },
        ]}
      >
        <Typography variant={'body1'}>{message}</Typography>
      </CDialog>
    );
  },
);
