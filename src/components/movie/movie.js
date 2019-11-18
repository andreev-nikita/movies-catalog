import React from 'react';
import './movie.scss';
import placeholderImg from './placeholder.png';

export default class Movie extends React.Component {
  state = {
    opacity: 0,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ opacity: 1 });
    }, 10);
  }

  render() {
    const { title, director, imageUrl } = this.props;
    const { opacity } = this.state;

    const url = imageUrl === 'default' ? placeholderImg : imageUrl;

    return (
      <div className="movie" style={{ opacity }}>
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
  }
}
