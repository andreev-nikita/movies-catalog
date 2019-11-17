import React from 'react';
import SwapiService from '../../services/swapi-service';
import PixabayService from '../../services/pixabay-service';
import Search from '../search/search';
import MoviesList from '../movies-list/movies-list';

export default class App extends React.Component {
  state = {
    films: null,
  };

  swapiService = new SwapiService();

  pixabayService = new PixabayService();

  componentDidMount() {
    this.swapiService.getAllFilms().then(films => {
      this.setState({ films });
    });
  }

  render() {
    const { films } = this.state;

    return (
      <div className="movies-catalog">
        <h1>Каталог фильмов</h1>
        <Search />
        <MoviesList films={films} />
      </div>
    );
  }
}
