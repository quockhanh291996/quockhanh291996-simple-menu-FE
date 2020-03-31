import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  errorTitle: {
    background: theme.palette.error.dark,
  },
  infoTitle: {
    background: theme.palette.info.main,
  }
}));
