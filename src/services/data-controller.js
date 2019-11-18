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

  get max() {
    return this.maxCount;
  }

  async getMovies() {
    if (!this.isLoading) {
      this.isLoading = true;
      const { currentCount, defaultCount, increaseCount, movies } = this;

      let newCount =
        currentCount === 0 ? defaultCount : currentCount + increaseCount;

      if (newCount > this.maxCount) {
        newCount = this.maxCount;
      }

      const requests = [];
      for (let i = 1; i <= newCount; i += 1) {
        if (!movies[i]) {
          movies[i] = {
            id: i,
            loaded: false,
          };

          requests.push(
            (async () => {
              const result = await this.swapiService.getMovie(i);

              movies[i].loaded = true;
              movies[i].title = result.title;
              movies[i].director = result.director;

              try {
                const url = await this.pixabayService.getImage(movies[i].title);
                movies[i].imageUrl = url;
              } catch (err) {
                movies[i].imageUrl = placeholder;
              }
            })()
          );
        }
      }

      await Promise.all(requests);
      this.isLoading = false;
      this.currentCount = newCount;
    }

    return Object.entries(this.movies)
      .filter(([id]) => +id <= this.currentCount)
      .map(([, movie]) => movie);
  }
}
