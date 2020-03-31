import {
  Button,
  Fade,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { globalRootStore } from '~stores/root';

import { ICategory } from '~stores/category/category.info';
// import { useStyles } from './styles';

export const CategoryForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const {
    CategoryStore: {
      fetchAll,
      categoryList,
      currentCategory,
      setCurrentCategory,
    },
  } = useContext(globalRootStore);
  // const classes = useStyles();

  const [categoryInfoAnchor, setCategoryInfoAnchor] = useState<
    undefined | HTMLElement
  >(undefined);
  const openCategoryInfoAnchor = Boolean(categoryInfoAnchor);

  /** Component's method */
  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setCategoryInfoAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setCategoryInfoAnchor(undefined);
  };

  const changeCategory = (category: ICategory) => () => {
    setCurrentCategory(category);
    closeMenu();
  };

  /** Hooks */
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <React.Fragment>
      <Grid container direction={'row'} spacing={2} alignItems={'center'}>
        {/* Title */}
        <Grid item>{t('categoryForm.title')}:</Grid>

        {/* Category selection */}
        <Grid>
          <Button variant={'outlined'} onClick={openMenu}>
            {currentCategory?.name ?? 'N/A'}
          </Button>
        </Grid>
      </Grid>

      <Menu
        open={openCategoryInfoAnchor}
        anchorEl={categoryInfoAnchor}
        TransitionComponent={Fade}
        onClose={closeMenu}
      >
        {categoryList.map((item) => (
          <MenuItem key={`category-${item.id}`} onClick={changeCategory(item)}>
            <Typography variant="inherit" noWrap>
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
});
