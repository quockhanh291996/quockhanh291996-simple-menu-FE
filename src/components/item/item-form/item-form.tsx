import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { globalRootStore } from '~stores/root';
import { ItemCard } from '../item-card/item-card';
import { useStyles } from './styles';

export const ItemForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    CategoryStore: { currentCategory },
    ItemStore: { itemList, fetchAllByCategory },
  } = useContext(globalRootStore);

  /** Hooks */
  useEffect(() => {
    /** fetch list when category change */
    if (currentCategory) {
      fetchAllByCategory(currentCategory.id);
    }
  }, [currentCategory]);

  return (
    <Grid
      container
      direction={'row'}
      spacing={2}
      alignItems={'flex-start'}
      className={classes.wrapper}
    >
      {/* Title */}
      <Grid item xs={1}>
        {t('itemForm.title')}:
      </Grid>

      {/* Category selection */}
      <Grid item className={classes.listWrapper}>
        {itemList.map((item) => (
          <ItemCard item={item} key={`item-${item.id}`} />
        ))}
      </Grid>
    </Grid>
  );
});
