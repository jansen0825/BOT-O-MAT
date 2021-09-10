import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    fontWeight: 600,
    fontSize: 26,
    letterSpacing: 1,
  },
});
const Text = ({ text, className }) => {
  const classes = useStyles();

  return (
    <Typography variant="h5" gutterBottom className={`${className} ${classes.text}`}>
      {text}
    </Typography>
  );
};

export default Text;
