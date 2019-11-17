import React from 'react';
import Movie from '../movie/movie';
import './movies-list.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class MoviesList extends React.Component {
  render() {
    return (
      <div className="movies-list">
        <Movie title="Название фильма" director="Режиссер" />
        <Movie title="Название фильма" director="Режиссер" />
        <Movie title="Название фильма" director="Режиссер" />
        <Movie title="Название фильма" director="Режиссер" />
        <Movie title="Название фильма" director="Режиссер" />
        <Movie title="Название фильма" director="Режиссер" />
        <Movie title="Название фильма" director="Режиссер" />
        <Movie title="Название фильма" director="Режиссер" />
        <Movie title="Название фильма" director="Режиссер" />
      </div>
    );
  }
}
