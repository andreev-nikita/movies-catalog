import React from 'react';
import './movie.scss';
import placeholderImg from './placeholder.png';

export default ({ title, director, imageUrl }) => {
  return (
    <div className="movie">
      <div className="movie__content">
        <img
          className="movie__image"
          src={imageUrl === 'default' ? placeholderImg : imageUrl}
          alt="movie poster"
        />
        <div className="movie__text">
          <h4 className="movie__title">{title}</h4>
          <p className="movie__director">{director}</p>
        </div>
      </div>
    </div>
  );
};
