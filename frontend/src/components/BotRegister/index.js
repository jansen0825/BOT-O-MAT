import React, { useState, useCallback } from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import BotForm from './BotForm';
import { Text as Title } from 'components/common';
import { actions } from 'features/robots/robotsSlice';
import { useAudio } from 'hooks';

const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid #83272e',
    padding: theme.spacing(2),
  },
}));

const isTextValid = botName => {
  if (!botName) {
    return false;
  }

  return true;
};

const BotRegister = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [, playSound] = useAudio('/sounds/mixkit-retro-confirmation-tone-2860.wav');
  const [botName, setBotName] = useState('');
  const [botNamesArr, setBotNamesArr] = useState([]);
  const [textError, setTextError] = useState('');

  const handleTextChange = useCallback(event => {
    const {
      target: { value },
    } = event;

    setBotName(value);
  }, []);

  const addNewBot = useCallback(() => {
    if (isTextValid(botName)) {
      setBotName('');
      setBotNamesArr(prevState => [botName, ...prevState]);
      setTextError('');
    } else {
      setTextError('Required');
    }
  }, [botName]);

  const removeBot = useCallback(index => {
    // Removes the element in position (index) from the Array.
    setBotNamesArr(prevState => [...prevState.slice(0, index), ...prevState.slice(index + 1, prevState.length)]);
  }, []);

  const saveBots = useCallback(() => {
    if (isTextValid(botName) || botNamesArr.length) {
      // The botNamesArr is already validated so we just need to validate botName
      // If botName textfield isn't populated, we just add the bots that are ready.
      const botsToAdd = [...(isTextValid(botName) ? [botName] : []), ...botNamesArr];
      dispatch(actions.addRobots(botsToAdd));
      playSound();
      setBotName('');
      setBotNamesArr([]);
      setTextError('');
    } else {
      setTextError('Required');
    }
  }, [dispatch, botName, botNamesArr, playSound]);

  return (
    <Grid item xs={12} sm={7} md={8} lg={5}>
      <Paper elevation={3} className={classes.paper}>
        <Title text="Bot-Register" />

        <BotForm
          botName={botName}
          botNamesArr={botNamesArr}
          textError={textError}
          onSubmit={saveBots}
          onAddField={addNewBot}
          onDelete={removeBot}
          handleTextChange={handleTextChange}
        />
      </Paper>
    </Grid>
  );
};

export default BotRegister;
