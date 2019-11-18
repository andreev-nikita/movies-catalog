import React from 'react';
import DataController from '../../services/data-controller';
import Search from '../search/search';
import MoviesList from '../movies-list/movies-list';
import Loader from '../loader/loader';
import Button from '../button/button';

import './app.scss';

export default class App extends React.Component {
  state = {
    movies: [],
    isLoading: true,
  };

  dataController = new DataController({
    defaultCount: 3,
    increaseCount: 3,
  });

  componentDidMount() {
    this.dataController
      .getMovies()
      .then(movies => {
        this.setState({ movies, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  showMoreMovies = () => {
    this.setState({ isLoading: true });

    this.dataController
      .getMovies()
      .then(movies => {
        this.setState({ movies, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { movies, isLoading } = this.state;

    return (
      <div className="movies-catalog">
        <h1>Каталог фильмов</h1>
        <Search />
        {movies.length !== 0 ? <MoviesList moviesData={movies} /> : null}
        {isLoading ? <Loader /> : null}
        <Button
          onClickAction={this.showMoreMovies}
          active={!isLoading && this.dataController.max !== movies.length}
        />
      </div>
    );
  }
}
