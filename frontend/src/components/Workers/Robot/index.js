import React from 'react';
import { Typography, Grid, Paper, makeStyles } from '@material-ui/core';

import TaskList from './TaskList';
import RobotInfo from './RobotInfo';

const useStyles = makeStyles(theme => ({
  card: {
    border: '1px solid #83272e',
    padding: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(1.5, 0),
    fontSize: 18,
    fontWeight: 400,
    textDecoration: 'underline',
  },
  taskContainer: {
    border: '1px solid black',
    padding: theme.spacing(2, 1, 1),
    borderRadius: 4,
    height: 256,
    position: 'relative',
  },
}));

const Robot = ({ id }) => {
  const classes = useStyles();

  return (
    <Grid item key={id} xs={12} md={6} lg={4}>
      <Paper elevation={3} className={classes.card}>
        <RobotInfo robotId={id} />
        <Typography className={classes.title} align="center">
          TASKS
        </Typography>

        <div className={classes.taskContainer}>
          <TaskList robotId={id} />
        </div>
      </Paper>
    </Grid>
  );
};

export default Robot;
