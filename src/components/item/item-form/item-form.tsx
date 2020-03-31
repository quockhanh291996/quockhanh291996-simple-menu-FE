import { Button, Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IItem, ITEM_STATE } from '~stores/item/item.info';
import { globalRootStore } from '~stores/root';
import { ItemCard } from '../item-card/item-card';
import {
  MODIFY_ITEM_DIALOG_TYPE,
  ModifyItemDialog,
} from '../modify-item-dialog/modify-item-dialog';

import { useStyles } from './styles';

export const ItemForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    CategoryStore: { currentCategory },
    ItemStore: { state, itemList, fetchAllByCategory, create, update },
  } = useContext(globalRootStore);

  /** State for handle the modify item dialog */
  const [modifyDialogType, setModifyDialogType] = useState<
    MODIFY_ITEM_DIALOG_TYPE
  >(MODIFY_ITEM_DIALOG_TYPE.ADD);
  const [openModifyDialog, toggleModifyDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IItem | undefined>();

  /** Method for handle the modify item dialog */
  const closeModifyDialog = () => {
    toggleModifyDialog(false);
    setSelectedItem(undefined);
  };

  const showModifyDialog = (type: MODIFY_ITEM_DIALOG_TYPE, pItem?: IItem) => {
    toggleModifyDialog(true);
    setModifyDialogType(type);
    if (pItem) {
      setSelectedItem(pItem);
    }
  };

  const onDialogSubmit = (data: any) => {
    /** IF add new */
    if (modifyDialogType === MODIFY_ITEM_DIALOG_TYPE.ADD) {
      create(data);
      return;
    }

    /** IF update new */
    if (selectedItem) {
      update(selectedItem?.id, data);
    }
  };

  /** Hooks */
  useEffect(() => {
    /** fetch list when category change */
    if (currentCategory) {
      fetchAllByCategory(currentCategory.id);
    }
  }, [currentCategory]);

  useEffect(() => {
    if (!currentCategory) {
      return;
    }

    if (
      state === ITEM_STATE.ADD_ITEM_SUCCESS ||
      state === ITEM_STATE.UPDATE_ITEM_SUCCESS
    ) {
      fetchAllByCategory(currentCategory.id);
      closeModifyDialog();
    }
  }, [state, currentCategory]);

  return (
    <React.Fragment>
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
            <ItemCard
              item={item}
              key={`item-${item.id}`}
              onModify={(pSelectedItem) => {
                showModifyDialog(MODIFY_ITEM_DIALOG_TYPE.MODIFY, pSelectedItem);
              }}
            />
          ))}
          {state === ITEM_STATE.FETCH_BY_CATEGORY_SUCCESS &&
            itemList.length === 0 && <div> {t('general.noData')}</div>}
        </Grid>

        <Grid item>
          <Button
            variant={'contained'}
            size="small"
            color="primary"
            onClick={() => {
              showModifyDialog(MODIFY_ITEM_DIALOG_TYPE.ADD);
            }}
          >
            {t('itemForm.add')}
          </Button>
        </Grid>
      </Grid>

      {/* Dialog for modify/add */}
      <ModifyItemDialog
        type={modifyDialogType}
        open={openModifyDialog}
        item={selectedItem}
        onClose={closeModifyDialog}
        onSubmit={onDialogSubmit}
      />
    </React.Fragment>
  );
});
