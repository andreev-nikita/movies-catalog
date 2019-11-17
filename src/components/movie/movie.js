import React from 'react';
import './movie.scss';
import placeholderImg from './placeholder.png';

export default class Movie extends React.Component {
  state = {
    imageUrl: placeholderImg,
  };

  render() {
    const { title, director } = this.props;
    const { imageUrl } = this.state;

    return (
      <div className="movie">
        <div className="movie__content">
          <img className="movie__image" src={imageUrl} alt="movie poster" />
          <div className="movie__text">
            <h4 className="movie__title">{title}</h4>
            <p className="movie__director">{director}</p>
          </div>
        </div>
      </div>
    );
  }
}
