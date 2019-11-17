import React from 'react';
import DataController from '../../services/data-controller';
import Search from '../search/search';
import MoviesList from '../movies-list/movies-list';
import Loader from '../loader/loader';

import './app.scss';

export default class App extends React.Component {
  defaultMoviesCount = 3;

  state = {
    movies: [],
    isLoading: true,
  };

  dataController = new DataController();

  componentDidMount() {
    this.dataController.getMovies(this.defaultMoviesCount).then(movies => {
      this.setState({ movies, isLoading: false });
    });
  }

  setNewMoviesCount(count) {
    this.dataController.getMovies(count).then(movies => {
      this.setState({ movies, isLoading: false });
    });

    this.setState({ isLoading: true });
  }

  render() {
    const { movies, isLoading } = this.state;

    return (
      <div className="movies-catalog">
        <h1>Каталог фильмов</h1>
        <Search />
        <MoviesList moviesData={movies} />
        {isLoading ? <Loader /> : null}
      </div>
    );
  }
}
