// Vendor
import { useEffect } from 'react';
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';

// Components
import Nav from './components/Nav';
import RobotWorkshop from './components/RobotWorkshop';

import { fetchTasks } from 'features/robots/robotsSlice';
import theme from './theme';

const useStyles = makeStyles({
  app: {
    height: '100vh',
    position: 'relative',
  },
});

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.app}>
        <Nav />
        <RobotWorkshop />
      </div>
    </ThemeProvider>
  );
};

export default App;
