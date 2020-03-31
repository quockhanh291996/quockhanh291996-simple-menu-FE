import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { IItem } from '~stores/item/item.info';
import { useStyles } from './styles';

interface ItemCardProps {
  item: IItem;
  onModify?(item: IItem): void;
  onDelete?(item: IItem): void;
}

export const ItemCard: React.FC<ItemCardProps> = observer(
  (props: ItemCardProps) => {
    const { item, onModify, onDelete } = props;
    const { t } = useTranslation();
    const classes = useStyles();

    return (
      <Card className={classes.card}>
        {/* Card's content */}
        <Grid container direction={'row'}>
          <Grid item xs={5}>
            <CardMedia
              className={classes.media}
              image={item.thumbnail_image}
              title={item.name}
            />
          </Grid>
          <Grid item xs={7}>
            <CardContent>
              <Typography component="h4" variant="h5">
                {item.name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                {item.description}
              </Typography>
            </CardContent>

            {/* Action list */}
            <CardActions>
              <Grid container spacing={3} justify={'flex-end'}>
                <Grid item>
                  {/* Modify button */}
                  <Button
                    variant={'outlined'}
                    size="small"
                    color="primary"
                    onClick={() => onModify ? onModify(item) : undefined}
                  >
                    {t('itemForm.modify')}
                  </Button>
                </Grid>

                <Grid item>
                  {/* Delete button */}
                  <Button
                    variant={'outlined'}
                    size="small"
                    color="secondary"
                    onClick={() => onDelete ? onDelete(item) : undefined}
                  >
                    {t('itemForm.delete')}
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    );
  },
);
