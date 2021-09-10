import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from './Snackbar';
import Fireworks from './Fireworks';

import { actions, selectors as botSelectors } from '../../features/robots/robotsSlice';
import { useAudio } from '../../hooks';

const NotificationSnackbar = () => {
  const dispatch = useDispatch();
  const [isPlaying, toggleSound] = useAudio('/sounds/mixkit-several-whistle-fireworks-pop-3105.wav');

  const robot = useSelector(botSelectors.getLastFinishedBot);

  const handleClose = useCallback(() => {
    dispatch(actions.resetLastFinishedBot());
  }, [dispatch]);

  if (!robot) {
    return null;
  }

  return (
    <>
      <Snackbar robot={robot} handleClose={handleClose} />
      <Fireworks isPlaying={isPlaying} toggleSound={toggleSound} />
    </>
  );
};

export default NotificationSnackbar;
