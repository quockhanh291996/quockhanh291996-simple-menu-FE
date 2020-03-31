import { Button, Fade, Menu, MenuItem, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import { ICategory } from '~stores/category/category.info';

interface CategorySelection {
  options: ICategory[];
  selectedItem?: ICategory;
  onChange(newItem: ICategory): void;
}

export const CategorySelection: React.FC<CategorySelection> = observer(
  (props: CategorySelection) => {
    const { options, selectedItem, onChange } = props;

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
      onChange(category);
      closeMenu();
    };

    return (
      <React.Fragment>
        <Button
          variant={'outlined'}
          onClick={openMenu}
          endIcon={<ExpandMoreIcon />}
        >
          {selectedItem?.name ?? 'N/A'}
        </Button>

        {/* Menu contains cateogy */}
        <Menu
          open={openCategoryInfoAnchor}
          anchorEl={categoryInfoAnchor}
          TransitionComponent={Fade}
          onClose={closeMenu}
        >
          {options.map((item) => (
            <MenuItem
              key={`category-${item.id}`}
              onClick={changeCategory(item)}
            >
              <Typography variant="inherit" noWrap>
                {item.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  },
);
