import { useState, useEffect, useRef, useCallback } from 'react';

export const useAudio = path => {
  const [audio] = useState(new Audio(path));
  const [playing, setPlaying] = useState(false);

  const togglePlay = useCallback(() => setPlaying(!playing), [playing]);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, togglePlay];
};

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args) => savedCallback.current(...args);

    if (delay !== null) {
      const interval = setInterval(handler, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};
