import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  formCheckboxGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxStyle: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  errorMessage: {
    color: 'red',
  },
}));
