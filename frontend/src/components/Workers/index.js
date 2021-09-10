import React from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Robot from './Robot';
import { selectors as botSelectors } from 'features/robots/robotsSlice';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 1280,
    margin: 'auto',
    padding: theme.spacing(1.5, 3),
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 700,
  },
}));

const Workers = () => {
  const classes = useStyles();

  const robots = useSelector(botSelectors.selectAll);

  if (!robots.length) {
    return null;
  }

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h5" gutterBottom align="center">
        Workers
      </Typography>
      <Grid container spacing={2}>
        {robots.map(robot => (
          <Robot key={robot.id} id={robot.id} />
        ))}
      </Grid>
    </div>
  );
};

export default Workers;
