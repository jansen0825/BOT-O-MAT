import React, { useEffect } from 'react';

import './Fireworks.css';

const Fireworks = ({ isPlaying, toggleSound }) => {
  useEffect(() => {
    if (!isPlaying) {
      toggleSound();
    }

    return () => {
      // Stops the sound if the component gets unmounted and the sound is playing
      if (isPlaying) {
        toggleSound();
      }
    };
  }, [isPlaying, toggleSound]);

  return (
    <div className="fireworks-root" style={{ top: window.pageYOffset }}>
      <div className="fireworks-pyro">
        <div className="fireworks-before"></div>
        <div className="fireworks-after"></div>
      </div>
    </div>
  );
};

export default Fireworks;
