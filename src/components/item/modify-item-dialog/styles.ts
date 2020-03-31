import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  inputLabel: {
    marginBottom: 10,
    marginRight: 20,
  },
  previewImage: {
    width: '100%',
    objectFit: 'contain',
    height: 200,
    marginTop: 20,
    border: '1px solid grey',
  },
}));
