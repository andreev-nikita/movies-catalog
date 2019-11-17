import React from 'react';
import './movie.scss';
import placeholderImg from './placeholder.png';

export default ({ title, director, imageUrl }) => {
  const url = imageUrl === 'default' ? placeholderImg : imageUrl;

  return (
    <div className="movie">
      <div className="movie__content">
        <div
          className="movie__image"
          style={{ background: `url(${url}) center / cover no-repeat` }}
        />
        <div className="movie__text">
          <h4 className="movie__title">{title}</h4>
          <p className="movie__director">{director}</p>
        </div>
      </div>
    </div>
  );
};
