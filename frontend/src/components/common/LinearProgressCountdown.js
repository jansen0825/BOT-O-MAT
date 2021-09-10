import React, { useState } from 'react';
import { Typography, LinearProgress, makeStyles } from '@material-ui/core';

import { useInterval } from 'hooks';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  progress: {
    width: '100%',
    marginRight: theme.spacing(1),
    '& .MuiLinearProgress-root': {
      height: 6,
    },
  },
  seconds: {
    whiteSpace: 'nowrap',
    fontSize: 13,
  },
}));

const LinearProgressCountdown = ({ className, delta }) => {
  const classes = useStyles();

  const [time, setTime] = useState(delta);

  useInterval(() => {
    if (time > 0) {
      setTime(time - 0.5);
    }
  }, 500);

  const progressPercent = ((delta - time) / delta) * 100;

  return (
    <div className={`${className} ${classes.container}`}>
      <div className={classes.progress}>
        <LinearProgress variant="determinate" value={progressPercent} />
      </div>
      <div>
        <Typography className={classes.seconds} variant="body1" color="inherit">{`${Math.round(time)} s`}</Typography>
      </div>
    </div>
  );
};

export default LinearProgressCountdown;
