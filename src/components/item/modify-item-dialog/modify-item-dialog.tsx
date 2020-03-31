import { Grid, Input, TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CategorySelection } from '~components/category/category-selection/category-selection';
import { CDialog } from '~components/common/dialog/dialog';
import { FormInput } from '~components/form-input/form-input';
import { ICategory } from '~stores/category/category.info';
import { IItem } from '~stores/item/item.info';
import { globalRootStore } from '~stores/root';

import { useStyles } from './styles';

export enum MODIFY_ITEM_DIALOG_TYPE {
  ADD,
  MODIFY,
}

interface ModifyItemDialogProps {
  open: boolean;
  type: MODIFY_ITEM_DIALOG_TYPE;
  item?: IItem;
  onClose(): void;
  onSubmit(data: any): void;
}

export const ModifyItemDialog: React.FC<ModifyItemDialogProps> = observer(
  (props: ModifyItemDialogProps): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { type, onSubmit, item, onClose, ...rest } = props;
    const { handleSubmit, errors, control, register, setValue } = useForm();
    const {
      CategoryStore: { categoryList },
    } = useContext(globalRootStore);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<
      ICategory | undefined
    >();
    const [selectedThumbnail, setSelectedThumbnail] = useState<any>();

    const onThumbnailChange = (event: any) => {
      setSelectedThumbnail(URL.createObjectURL(event.target.files[0]));
    };

    const resetForm = () => {
      setName('');
      setDescription('');
      setSelectedCategory(undefined);
      setSelectedThumbnail(undefined);
    };

    /**
     * Hooks
     */
    useEffect(() => {
      /** Load data of item if modify them */
      if (item) {
        setName(item.name);
        setDescription(item.description);
        setSelectedCategory(
          categoryList.find((category) => category.id === item.category),
        );
        setSelectedThumbnail(item.thumbnail_image);
      }
    }, [item]);

    useEffect(() => {
      console.log(name);
    }, [name]);

    useEffect(() => {
      register({ name: 'category' });
      register({ name: 'thumbnail_image' });
    }, [register]);

    useEffect(() => {
      setValue('category', selectedCategory?.id);
    }, [selectedCategory]);

    useEffect(() => {
      setValue('thumbnail_image', selectedThumbnail);
    }, [selectedThumbnail]);

    return (
      <CDialog
        {...rest}
        fullWidth
        onClose={() => {
          onClose();
          resetForm();
        }}
        title={
          type === MODIFY_ITEM_DIALOG_TYPE.ADD
            ? t('modifyItemDialog.addTitle')
            : t('modifyItemDialog.modifyTitle')
        }
        actionPropsList={[
          {
            text: t('modifyItemDialog.submit'),
            onClick: handleSubmit(onSubmit),
          },
        ]}
      >
        <Grid container>
          <Grid item xs={12}>
            <label className={classes.inputLabel}>
              {t('modifyItemDialog.category')}
            </label>
            <CategorySelection
              options={categoryList}
              selectedItem={selectedCategory}
              onChange={setSelectedCategory}
            />

            {/* Hidden input to make the validation */}
            <FormInput
              required
              hidden
              control={control}
              name="category"
              errors={errors}
              value={selectedCategory?.id}
              error={!!errors.category}
              component={<TextField style={{ display: 'none' }} />}
            ></FormInput>
          </Grid>

          <Grid item xs={12}>
            <label className={classes.inputLabel}>
              {t('modifyItemDialog.nameLabel')}
            </label>
            <FormInput
              required
              fullWidth
              variant={'outlined'}
              control={control}
              name="name"
              errors={errors}
              defaultValue={name}
              error={!!errors.name}
              component={TextField}
            ></FormInput>
          </Grid>

          <Grid item xs={12}>
            <label className={classes.inputLabel}>
              {t('modifyItemDialog.description')}
            </label>
            <FormInput
              required
              fullWidth
              variant={'outlined'}
              control={control}
              defaultValue={description}
              name="description"
              errors={errors}
              error={!!errors.description}
              component={<TextField multiline rows={4} rowsMax={4} />}
            ></FormInput>
          </Grid>

          <Grid item xs={12}>
            <label className={classes.inputLabel}>
              {t('modifyItemDialog.thumbnail')}
            </label>
            <Input type={'file'} onChange={onThumbnailChange}></Input>

            {/* Hidden input to make the validation */}
            <FormInput
              required
              hidden
              control={control}
              name="thumbnail_image"
              errors={errors}
              value={selectedThumbnail}
              error={!!errors.thumbnail_image}
              component={<TextField style={{ display: 'none' }} />}
            ></FormInput>

            {/* Preview image */}
            <img className={classes.previewImage} src={selectedThumbnail} />
          </Grid>
        </Grid>
      </CDialog>
    );
  },
);
