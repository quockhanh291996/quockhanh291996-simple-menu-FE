import { createMuiTheme, makeStyles } from '@material-ui/core';
import { muiTheme } from '~common/mui-theme';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
    overflow: 'auto',
  },
  bodyDynamicStyle: {
    margin: 0,
  },
  introArea: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.info.contrastText,
    [theme.breakpoints.down('sm')]: {
      height: 140,
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  logoImage: {
    maxWidth: '100%',
  },
  tabContainer: {
    marginBottom: 20,
  },
  tabItem: {
    fontSize: 18,
    minWidth: 0,
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 10,
    },
  },
  formContainer: {
    minHeight: '40%',
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  formArea: {
    height: 'calc(100% - 48px)', //48 is the height of tab item
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 188px)',
    },
  },
}));

/** Custome theme for the form of start up screen */
const defaultTheme = createMuiTheme();

export const startUpScreenFormTheme = createMuiTheme({
  ...muiTheme,
  typography: {
    body1: {
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: 16,
      },
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        [defaultTheme.breakpoints.down('md')]: {
          fontSize: 16,
        },
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: 14,
        },
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: 12,
        },
      },
    },
    MuiButton: {
      root: {
        [defaultTheme.breakpoints.down('md')]: {
          fontSize: 14,
        },
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: 12,
        },
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: 10,
        },
      },
    },
  },
});
