import SwapiService from './swapi-service';
import PixabayService from './pixabay-service';
import placeholder from '../components/movie/placeholder.png';

export default class DataController {
  constructor(obj) {
    ({
      defaultCount: this.defaultCount,
      increaseCount: this.increaseCount,
    } = obj);

    this.currentCount = 0;
    this.maxCount = 7;

    this.swapiService = new SwapiService();
    this.pixabayService = new PixabayService();
    this.movies = {};
    this.isLoading = false;
  }

  async searchMovies(text, id) {
    this.lastSearchId = id;

    if (text === '') {
      return this.getMovies(false);
    }

    const moviesIdArr = await this.swapiService.searchMovies(text);
    await this._updateMoviesData(moviesIdArr);

    if (id === this.lastSearchId) {
      return {
        movies: moviesIdArr.map(i => this.movies[i]),
        search: true,
      };
    }

    return null;
  }

  async getMovies(changeCount = true) {
    if (!this.isLoading) {
      this.isLoading = true;
      const { currentCount, defaultCount, increaseCount } = this;

      let newCount;
      if (changeCount) {
        newCount =
          currentCount === 0 ? defaultCount : currentCount + increaseCount;
      } else {
        newCount = currentCount;
      }

      if (newCount > this.maxCount) {
        newCount = this.maxCount;
      }

      const idArr = [];
      for (let i = 1; i <= newCount; i += 1) {
        idArr.push(i);
      }

      await this._updateMoviesData(idArr);

      this.isLoading = false;
      this.currentCount = newCount;
    }

    return {
      movies: Object.entries(this.movies)
        .filter(([id]) => +id <= this.currentCount)
        .map(([, movie]) => movie),
      search: false,
    };
  }

  async _updateMoviesData(idArr) {
    const { movies } = this;
    const requests = [];

    idArr.forEach(id => {
      if (!movies[id]) {
        movies[id] = {
          id,
          loaded: false,
        };

        movies[id].promise = (async () => {
          const result = await this.swapiService.getMovie(id);

          movies[id].title = result.title;
          movies[id].director = result.director;

          try {
            const url = await this.pixabayService.getImage(movies[id].title);
            movies[id].imageUrl = url;
          } catch (err) {
            movies[id].imageUrl = placeholder;
          }

          movies[id].loaded = true;
        })();

        requests.push(movies[id].promise);
      } else if (!movies[id].loaded) {
        requests.push(movies[id].promise);
      }
    });

    await Promise.all(requests);
  }

  get max() {
    return this.maxCount;
  }
}
