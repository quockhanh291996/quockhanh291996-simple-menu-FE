import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  inputLabel: {
    marginBottom: 10,
  },
  erroMessage: {
    margin: '2px 0',
    color: theme.palette.error.dark,
  },
}));
