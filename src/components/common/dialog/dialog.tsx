import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

import { useStyles } from './styles';

/**
 * Layout use for each section in the home component
 */

export const CDialog: React.FC<CDialogProps> = (
  props: CDialogProps,
): JSX.Element => {
  const classes = useStyles();
  const {
    title,
    actionPropsList,
    onClose,
    children,
    className,
    titleClassName,
    ...rest
  } = props;

  const pActionList = actionPropsList ? actionPropsList : [];

  return (
    <Dialog
      className={`${classes.dialogWrapper} ${className}`}
      onClose={onClose}
      {...rest}
    >
      {(title || actionPropsList) && (
        <DialogTitle
          className={`${classes.dialogTitle} ${titleClassName || ''}`}
        >
          {title}
          {onClose ? (
            <IconButton
              className={classes.closeButton}
              onClick={() =>
                onClose ? onClose({}, 'escapeKeyDown') : undefined
              }
            >
              <CloseIcon />
            </IconButton>
          ) : (
            undefined
          )}
        </DialogTitle>
      )}

      {/*  */}
      <DialogContent className={classes.dialogContent}>
        {children}
      </DialogContent>

      {/*  */}
      <DialogActions className={classes.dialogAction}>
        {pActionList.map(
          (
            {
              text: btnText,
              className: btnClassName,
              hidden,
              ...btnRest
            }: DialogActionButtonProps,
            index: number,
          ) => {
            if (!hidden) {
              return (
                <Button
                  variant={'contained'}
                  color={'primary'}
                  key={`action-${index}`}
                  className={`btn ${btnClassName}`}
                  {...btnRest}
                >
                  {btnText}
                </Button>
              );
            }

            return undefined;
          },
        )}
      </DialogActions>
    </Dialog>
  );
};

interface DialogActionButtonProps extends ButtonProps {
  text: string;
  hidden?: boolean;
}
interface CDialogProps extends DialogProps {
  title?: string;
  titleClassName?: string;
  actionPropsList?: DialogActionButtonProps[];
}
