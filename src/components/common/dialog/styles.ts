import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
  },
  dialogWrapper: {
    minWidth: 200,
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  dialogContent: {
    padding: 20,
  },
  dialogAction: {
    paddingBottom: 20,
    paddingRight: 20,
  },
}));
