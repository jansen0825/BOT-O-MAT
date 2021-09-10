import React from 'react';
import { Button, Typography, Drawer as MaterialDrawer, makeStyles } from '@material-ui/core';
import { Mail, GitHub, LinkedIn } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    padding: theme.spacing(4, 3),
    flexDirection: 'column',
    display: 'flex',
    height: '100%',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    marginBottom: theme.spacing(2),
  },
  floating: {
    position: 'absolute',
    top: 18,
    left: 10,
    fontSize: 12,
    color: '#1565c0',
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  image: {
    marginTop: 'auto',
    width: 180,
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
}));

const Drawer = ({ isOpen, hadleClose }) => {
  const classes = useStyles();
  return (
    <MaterialDrawer anchor="left" open={isOpen} onClose={hadleClose}>
      <div className={classes.container}>
        <Typography className={classes.floating}>Powered by:</Typography>
        <Typography className={classes.title}>Jansen Bernard</Typography>
        <Button
          title="jansen0825@gmail.com"
          className={classes.button}
          component="a"
          href="mailto:jansen0825@gmail.com"
          color="inherit"
          endIcon={<Mail color="primary" />}
          onClick={hadleClose}
        >
          Email
        </Button>
        <Button
          title="jansen0825"
          className={classes.button}
          component="a"
          href="https://github.com/jansen0825"
          color="inherit"
          target="_blank"
          endIcon={<GitHub color="primary" />}
          rel="noopener noreferrer"
          onClick={hadleClose}
        >
          Github
        </Button>
        <Button
          title="jansen-bernard"
          className={classes.button}
          component="a"
          edge="end"
          color="inherit"
          href="https://www.linkedin.com/in/jansen-bernard/"
          target="_blank"
          endIcon={<LinkedIn color="primary" />}
          rel="noopener noreferrer"
          onClick={hadleClose}
        >
          Linked-in
        </Button>
        <div className={classes.image}>
          <img src="/images/white-robot.png" alt="robot" />
        </div>
      </div>
    </MaterialDrawer>
  );
};

export default Drawer;
