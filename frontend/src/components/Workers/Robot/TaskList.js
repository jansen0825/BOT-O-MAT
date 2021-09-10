import React from 'react';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { PlayCircleOutline, CheckCircleOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { executeTask, actions, selectors as robotSelectors } from 'features/robots/robotsSlice';
import { LinearProgressCountdown } from 'components/common';

const useStyles = makeStyles(theme => ({
  progress: {
    width: '96%',
    position: 'absolute',
    top: -2,
    left: 8,
  },
  gif: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  completed: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'green',
    '& svg': {
      fontSize: 150,
      marginBottom: theme.spacing(1.5),
    },
  },
  task: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    margin: theme.spacing(1),
  },
  // Mobile classes
  [theme.breakpoints.down('xs')]: {
    description: {
      fontSize: 10,
      letterSpacing: 0.5,
    },
    button: {
      width: 48,
      minWidth: 48,
      '& .MuiButton-startIcon': {
        margin: 0,
      },
    },
    buttonText: {
      display: 'none',
    },
  },
}));

const TasksCard = ({ robotId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const robot = useSelector(state => robotSelectors.selectById(state, robotId));
  const { workingTaskIndex, tasks } = robot;

  const taskInProgress = workingTaskIndex !== undefined && tasks[workingTaskIndex];

  const dispatchTask = taskIndex => {
    dispatch(executeTask({ robotId, taskIndex }));
  };

  const removeBot = () => {
    dispatch(actions.removeRobot(robotId));
  };

  // If a tasks is being executed, render the working design
  if (taskInProgress) {
    const etaInSeconds = taskInProgress.eta / 1000;
    return (
      <>
        <LinearProgressCountdown delta={etaInSeconds} className={classes.progress} />
        <img className={classes.gif} src={`./images/bot-gifs/${taskInProgress.image}`} alt="loading..." />
      </>
    );
  }

  // If all tasks have been completed, short circuit a different design
  if (!tasks.length) {
    return (
      <div className={classes.completed}>
        <Typography variant="h6" align="center">
          All tasks were successfuly completed!
        </Typography>
        <CheckCircleOutline fontSize="large" />
        <Button variant="contained" color="secondary" size="small" onClick={removeBot}>
          Remove
        </Button>
      </div>
    );
  }

  // If we still have tasks available, show the list
  return tasks?.map((task, index) => (
    <div className={classes.task} key={index}>
      <Typography variant="overline" className={classes.description}>
        {task.description}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        title="Execute"
        size="small"
        className={classes.button}
        startIcon={<PlayCircleOutline />}
        onClick={() => dispatchTask(index)}
      >
        <span className={classes.buttonText}>Execute</span>
      </Button>
    </div>
  ));
};

export default TasksCard;
