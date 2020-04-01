import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import { Appbar } from '~components/appbar/appbar';
import { CategoryForm } from '~components/category/category-form/category-form';
import { ItemForm } from '~components/item/item-form/item-form';

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
          <Grid container className={classes.wrapper} spacing={2} direction={'column'}>
            {/* Category form */}
            <Grid item className={classes.categoryForm}>
              <CategoryForm />
            </Grid>

            {/* Item form */}
            <Grid item className={classes.itemForm}>
              <ItemForm />
            </Grid>
          </Grid>
        </main>
      </div>
    );
  },
);
