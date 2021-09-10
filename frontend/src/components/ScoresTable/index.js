import React from 'react';
import { Grid, makeStyles, Paper, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { persistor } from 'store';

import LeaderBoard from './LeaderBoard';
import { Text as Title } from 'components/common';
import { selectors as botSelectors } from 'features/robots/robotsSlice';

const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid #83272e',
    padding: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
}));

const ScoresTable = () => {
  const classes = useStyles();
  const robots = useSelector(botSelectors.getEntitiesByTaskScoe);

  return (
    <Grid item xs={12} lg={5}>
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.header}>
          <Title text="Scores Table" />
          {Boolean(robots?.length) && (
            <Button color="primary" variant="outlined" onClick={() => persistor.purge()}>
              Clear All
            </Button>
          )}
        </div>
        <Paper className={classes.root}>
          <LeaderBoard robots={robots} />
        </Paper>
      </Paper>
    </Grid>
  );
};

export default ScoresTable;
