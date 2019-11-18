import React from 'react';
import DataController from '../../services/data-controller';
import Search from '../search/search';
import MoviesList from '../movies-list/movies-list';
import Loader from '../loader/loader';
import Button from '../button/button';
import Error from '../error/error';

import './app.scss';

export default class App extends React.Component {
  state = {
    movies: [],
    loader: true,
    buttonIsActive: false,
    error: false,
  };

  dataController = new DataController({
    defaultCount: 3,
    increaseCount: 3,
  });

  componentDidMount() {
    this.dataController
      .getMovies()
      .then(({ movies }) => {
        this.setState({ movies, loader: false, buttonIsActive: true });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  onSearchChange = value => {
    this.setState({ movies: [], loader: true, buttonIsActive: false });

    this.dataController
      .searchMovies(value, Symbol(value))
      .then(obj => {
        if (obj) {
          const { movies, search: buttonIsActive } = obj;

          this.setState({
            movies,
            loader: false,
            buttonIsActive: !buttonIsActive,
          });
        }
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  showMoreMovies = () => {
    this.setState({ loader: true, buttonIsActive: false });

    this.dataController
      .getMovies()
      .then(({ movies, search: buttonIsActive }) => {
        this.setState({
          movies,
          loader: false,
          buttonIsActive: !buttonIsActive,
        });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  render() {
    const { movies, loader, buttonIsActive, error } = this.state;

    const notFoundCondition = movies.length === 0 && !loader && !error;
    const notFoundElement = notFoundCondition ? (
      <Error text="К сожалению, по вашему запросу ничего не найдено =(" />
    ) : null;

    const moviesListCondition = movies.length !== 0 && !error;
    const moviesListElement = moviesListCondition ? (
      <MoviesList moviesData={movies} />
    ) : null;

    const errorElement = error ? <Error text="Произошла ошибка =(" /> : null;
    const loaderElement = loader && !error ? <Loader /> : null;

    const buttonActivity =
      buttonIsActive && !error && this.dataController.max !== movies.length;

    return (
      <div className="movies-catalog">
        <h1>Каталог фильмов</h1>
        <Search onSearchChange={this.onSearchChange} />
        {notFoundElement}
        {moviesListElement}
        {loaderElement}
        {errorElement}
        <Button onClickAction={this.showMoreMovies} active={buttonActivity} />
      </div>
    );
  }
}
