import {
  Button,
  Fade,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { globalRootStore } from '~stores/root';

import { NewCategoryDialog } from '~components/new-category-dialog/new-category-dialog';
import { ICategory } from '~stores/category/category.info';

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

  // state to handle the add new dialog
  const [openAddNewDialog, setOpenAddNewDialog] = useState(false);

  // state to handle the menu llist
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

  const showAddNewDialog = () => {
    setOpenAddNewDialog(true);
  };

  const closeAddNewDialog = () => {
    setOpenAddNewDialog(false);
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
        <Grid item>
          <Button variant={'outlined'} onClick={openMenu}>
            {currentCategory?.name ?? 'N/A'}
          </Button>
        </Grid>

        <Grid item>
          <IconButton
            color="primary"
            aria-label="Open"
            onClick={showAddNewDialog}
            // className={classes.menuButton}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Menu contains cateogy */}
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

      {/* Add new dialog */}

      <NewCategoryDialog open={openAddNewDialog} onClose={closeAddNewDialog} />
    </React.Fragment>
  );
});
