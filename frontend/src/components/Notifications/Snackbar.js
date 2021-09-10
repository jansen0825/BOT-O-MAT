import React from 'react';
import { Snackbar as MaterialSnackbar, Typography, makeStyles } from '@material-ui/core';
import { Check } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  snackbar: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    color: 'white',
    background: '#4caf50',
    height: 80,
    padding: theme.spacing(4),
    borderRadius: 16,
    '& svg': {
      marginRight: theme.spacing(2),
    },
  },
  // Mobile classes
  [theme.breakpoints.down('xs')]: {
    snackbar: {
      height: 'inherit',
      maxWidth: '95%',
      '& h6': {
        fontSize: 18,
        textAlign: 'center',
      },
    },
  },
}));
const Snackbar = ({ robot, handleClose }) => {
  const classes = useStyles();

  return (
    <MaterialSnackbar open={true} autoHideDuration={4000} onClose={handleClose}>
      <div className={classes.snackbar}>
        <Check /> <Typography variant="h6">{robot.name} Completed all the tasks!</Typography>
      </div>
    </MaterialSnackbar>
  );
};

export default Snackbar;
