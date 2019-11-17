import React from 'react';
import image from './loader.svg';

import './loader.scss';

export default () => {
  return (
    <div className="loader">
      <img src={image} alt="films are loading now..." />
    </div>
  );
};
