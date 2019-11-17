import BaseService from './base-service';

export default class SwapiService extends BaseService {
  constructor() {
    super({
      host: 'https://swapi.co/api/',
    });
  }

  async getAllMovies() {
    const result = await this.getResource('films/');

    return result.results.map(film => {
      const id = film.url.match(/\/(\d+)/)[1];

      return {
        id,
        imageUrl: null,
        title: film.title,
        director: film.director,
      };
    });
  }
}
