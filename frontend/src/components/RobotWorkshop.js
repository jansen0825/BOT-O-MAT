import { Grid, makeStyles } from '@material-ui/core';

import BotRegister from './BotRegister';
import BotTypes from './BotTypes';
import ScoresTable from './ScoresTable';
import Workers from './Workers';
import Notifications from './Notifications';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1280,
    width: '100%',
    margin: theme.spacing(3, 'auto'),
    display: 'flex',
    justifyContent: 'space-between',
  },
  [theme.breakpoints.down('sm')]: {
    root: { margin: 'auto' },
  },
}));

const RobotWorkshop = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.root} spacing={3}>
        <BotTypes />
        <BotRegister />
        <ScoresTable />
      </Grid>
      <Workers />
      <Notifications />
    </>
  );
};

export default RobotWorkshop;
