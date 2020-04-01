import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    height: '100%',
  },
  mainContent: {
    flexGrow: 1,
    maxHeight: '100%',
    overflow: 'hidden',
  },
  wrapper: {
    margin: 80,
    width: '100%',
    height: '100%',
  },
  categoryForm: {
    height: '10%',
  },
  itemForm: {
    height: '65%',
  },
}));
