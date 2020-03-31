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
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NewCategoryDialog } from '~components/category/new-category-dialog/new-category-dialog';
import { CATEGORY_STATE, ICategory } from '~stores/category/category.info';
import { globalRootStore } from '~stores/root';

export const CategoryForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const {
    CategoryStore: {
      state,
      create,
      fetchAll,
      categoryList,
      currentCategory,
      setCurrentCategory,
      delete: deleteCategory,
    },
    GlobalDialogStore,
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

  /** Component's method handle new category dialog */
  const showAddNewDialog = () => {
    setOpenAddNewDialog(true);
  };

  const closeAddNewDialog = () => {
    setOpenAddNewDialog(false);
  };

  const onCreateCategory = (data: any) => {
    create(data);
  };

  /** Component's method handle delet category */
  const confirmDeleteCategory = () => {
    GlobalDialogStore.setType('confirmation');
    GlobalDialogStore.setMessage(t('categoryForm.confirmDelete'));
    GlobalDialogStore.setConfirmCallback(() => {
      if (currentCategory) {
        deleteCategory(currentCategory.id);
      }
    });
    GlobalDialogStore.open();
  };

  /** Hooks */
  useEffect(() => {
    switch (state) {
      case CATEGORY_STATE.IDLE:
      case CATEGORY_STATE.DELELE_CATEGORY_SUCCESS:
        {
          fetchAll();
        }
        break;
      case CATEGORY_STATE.ADD_CATEGORY_SUCCESS: {
        fetchAll();
        closeAddNewDialog();
      }
      default: {
      }
    }
  }, [state]);

  return (
    <React.Fragment>
      <Grid container direction={'row'} spacing={2} alignItems={'center'}>
        {/* Title */}
        <Grid item xs={1}>{t('categoryForm.title')}:</Grid>

        {/* Category selection */}
        <Grid item>
          <Button variant={'outlined'} onClick={openMenu} endIcon={<ExpandMoreIcon/>}>
            {currentCategory?.name ?? 'N/A'}
          </Button>
        </Grid>

        <Grid item>
          <IconButton color="primary" onClick={showAddNewDialog}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton color="primary" onClick={confirmDeleteCategory}>
            <DeleteIcon />
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

      <NewCategoryDialog
        open={openAddNewDialog}
        onClose={closeAddNewDialog}
        onCreate={onCreateCategory}
      />
    </React.Fragment>
  );
});
