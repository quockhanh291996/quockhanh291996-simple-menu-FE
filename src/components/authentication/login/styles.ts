import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  forgotPasswordBtn: {
    fontSize: 13,
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 10,
    },
    color: theme.palette.info.dark,
  },
  erroMessage: {
    color: theme.palette.error.dark,
  },
}));
