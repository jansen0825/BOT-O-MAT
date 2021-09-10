import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, Button, Typography, makeStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import RightDesktopContainer from './RightDesktopContainer';
import MobileDrawer from './Drawer';

const useStyles = makeStyles(theme => ({
  root: {
    height: 65,
  },
  toolbar: {
    width: '100vw',
    maxWidth: 1280,
    margin: 'auto',
  },
  logo: {
    width: 60,
    marginRight: theme.spacing(2),
    marginBottom: -5,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  menuButton: {
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const Nav = () => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(prevState => !prevState);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo}>
            <img src="/images/RV.jpeg" alt="logo" />
          </div>

          <Typography variant="h6" color="inherit" align="center">
            BOT-O-MAT
          </Typography>

          <RightDesktopContainer />

          <Button
            onClick={toggleDrawerOpen}
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <Menu fontSize="large" />
          </Button>
          <MobileDrawer isOpen={isDrawerOpen} hadleClose={toggleDrawerOpen} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
