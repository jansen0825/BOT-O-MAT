import React from 'react';

const Emoji = ({ className, label, symbol }) => (
  <span className={className} role="img" aria-label={label}>
    {symbol}
  </span>
);

export default Emoji;
