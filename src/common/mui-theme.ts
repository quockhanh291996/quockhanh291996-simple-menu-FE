import { colors, createMuiTheme } from '@material-ui/core';
import tinycolor from 'tinycolor2';

const primary = '#7B63CE';
const secondary = '#d9534f';
const warning = '#808080';
const success = colors.green[600];
const info = '#BFD1E5';
const danger = '#F0AC44';

const lightenRate = 30;
const darkenRate = 15;

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    danger?: PaletteColorOptions;
  }
  interface Palette {
    danger: PaletteColor;
  }
}

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    danger: {
      main: danger,
      light: tinycolor(danger)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(danger)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#6E6E6E',
      hint: '#B9B9B9',
    },
    background: {
      default: '#F5F7F7',
    },
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: '#4A4A4A1A',
      },
    },
    MuiMenu: {
      paper: {
        boxShadow:
          '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
      },
    },
    MuiSelect: {
      icon: {
        color: '#B9B9B9',
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          'backgroundColor': '#F3F5FF !important',
          '&:focus': {
            backgroundColor: '#F3F5FF',
          },
        },
      },
      button: {
        '&:hover, &:focus': {
          backgroundColor: '#F3F5FF',
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: 'white',
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '1px solid rgba(224, 224, 224, .5)',
      },
      head: {
        fontSize: '0.95rem',
      },
      body: {
        fontSize: '0.95rem',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
    },
    MuiCardHeader: {
      action: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        alignSelf: 'center',
      },
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.64rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.285rem',
    },
    h6: {
      fontSize: '1.142rem',
    },
    fontFamily: [
      'Open Sans',
      'sans-serif',
    ].join(','),
  },
});
