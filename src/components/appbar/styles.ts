import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: (theme.zIndex.drawer as number) + 1,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    color: '#fff',
  },
  imageWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  logoImage: {
    height: 50,
  },
}));
