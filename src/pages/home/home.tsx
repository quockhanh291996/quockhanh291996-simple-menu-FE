import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import { Appbar } from '~components/appbar/appbar';

import { useStyles } from './styles';

/**
 * Startup page here -- It contains the login and registration page.
 */
export const Home: React.FC = observer(
  (): JSX.Element => {
    const classes = useStyles();

    useEffect(() => {}, []);

    return (
      <div className={classes.container}>
        <Appbar />
        <main className={classes.mainContent}>
          <div>Home</div>
        </main>
      </div>
    );
  },
);
