import SwapiService from './swapi-service';
import PixabayService from './pixabay-service';

export default class DataController {
  swapiService = new SwapiService();

  pixabayService = new PixabayService();

  movies = null;

  async getMovies(count) {
    if (!this.movies) {
      this.movies = await this.swapiService.getAllMovies();
    }

    const askedMovies = this.movies.slice(0, count);

    const promises = askedMovies.map((movie, i) => this.addImageUrl(i));

    const newMovies = await Promise.all(promises);

    this.movies = [...newMovies, ...this.movies.slice(count)];

    return this.movies.slice(0, count);
  }

  async addImageUrl(id) {
    const sourceMovie = this.movies[id];

    if (!sourceMovie.imageUrl) {
      let url;

      try {
        url = await this.pixabayService.getImage(sourceMovie.title);
      } catch {
        url = 'default';
      }

      return { ...sourceMovie, imageUrl: url };
    }

    return sourceMovie;
  }
}
