import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  errorMessage: {
    margin: 0,
    color: theme.palette.error.dark,
  },
}));
