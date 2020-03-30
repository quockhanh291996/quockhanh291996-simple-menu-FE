import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import { muiTheme } from '~common/mui-theme';

/**
 * App start from here
 * Basically it does all base configuration before rendering actual app
 */
export const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div></div>
    </ThemeProvider>
  );
};
