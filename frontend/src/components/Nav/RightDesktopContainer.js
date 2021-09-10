import React from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { Mail, GitHub, LinkedIn } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 'auto',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
    },
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'cursive',
    fontSize: 20,
    marginRight: theme.spacing(2),
    color: 'black',
  },
  floating: {
    position: 'absolute',
    top: 0,
    left: -12,
    fontSize: 10,
    color: 'white',
  },
  endImage: {
    marginTop: 'auto',
    marginLeft: theme.spacing(2),
    width: 40,
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
}));

const RightDesktopContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.floating}>Powered by:</Typography>
      <Typography className={classes.title}>Jansen</Typography>
      <Button title="jansen0825@gmail.com" component="a" href="mailto:jansen0825@gmail.com" color="inherit">
        <Mail />
      </Button>
      <Button
        title="jansen0825"
        component="a"
        href="https://github.com/jansen0825"
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub />
      </Button>
      <Button
        title="jansen-bernard"
        component="a"
        color="inherit"
        href="https://www.linkedin.com/in/jansen-bernard/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedIn />
      </Button>
      <div className={classes.endImage}>
        <img src="/images/white-robot.png" alt="robot" />
      </div>
    </div>
  );
};

export default RightDesktopContainer;
