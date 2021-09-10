import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { Text as Title } from 'components/common';
import { selectors } from 'features/robots/robotsSlice';

const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid #83272e',
    padding: theme.spacing(2),
  },
}));
const BotTypes = () => {
  const classes = useStyles();

  const botTypes = useSelector(selectors.getBotTypes);

  return (
    <Grid item xs={12} sm={5} md={4} lg={2}>
      <Paper elevation={3} className={classes.paper}>
        <Title text={'Bot-Types'} />

        {botTypes.map(type => (
          <Typography key={type.name} variant="overline" display="block">
            {type.name}
          </Typography>
        ))}
      </Paper>
    </Grid>
  );
};

export default BotTypes;
