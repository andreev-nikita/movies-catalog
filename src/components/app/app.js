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
    buttonIsActive: false,
  };

  dataController = new DataController({
    defaultCount: 3,
    increaseCount: 3,
  });

  componentDidMount() {
    this.dataController
      .getMovies()
      .then(({ movies }) => {
        this.setState({ movies, isLoading: false, buttonIsActive: true });
      })
      .catch(() => {
        // this.setState({ isLoading: false });
      });
  }

  onSearchChange = value => {
    this.setState({ movies: [], isLoading: true, buttonIsActive: false });

    this.dataController
      .searchMovies(value, Symbol(value))
      .then(({ movies = null, search: buttonIsActive } = {}) => {
        if (Array.isArray(movies)) {
          this.setState({
            movies,
            isLoading: false,
            buttonIsActive: !buttonIsActive,
          });
        }
      })
      .catch(() => {
        // this.setState({ isLoading: false });
      });
  };

  showMoreMovies = () => {
    this.setState({ isLoading: true, buttonIsActive: false });

    this.dataController
      .getMovies()
      .then(({ movies, search: buttonIsActive }) => {
        this.setState({
          movies,
          isLoading: false,
          buttonIsActive: !buttonIsActive,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { movies, isLoading, buttonIsActive } = this.state;

    return (
      <div className="movies-catalog">
        <h1>Каталог фильмов</h1>
        <Search onSearchChange={this.onSearchChange} />
        {movies.length !== 0 ? <MoviesList moviesData={movies} /> : null}
        {isLoading ? <Loader /> : null}
        <Button
          onClickAction={this.showMoreMovies}
          active={buttonIsActive && this.dataController.max !== movies.length}
        />
      </div>
    );
  }
}
