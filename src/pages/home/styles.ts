import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
  },
  mainContent: {
    flexGrow: 1,
    maxHeight: '100%',
    overflow: 'hidden',
  },
}));
