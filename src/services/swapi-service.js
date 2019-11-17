import BaseService from './base-service';

export default class SwapiService extends BaseService {
  constructor() {
    super({
      host: 'https://swapi.co/api/',
    });
  }

  async getFilm(id) {
    const result = await this.getResource(`films/${id}`);

    return {
      title: result.title,
      director: result.director,
    };
  }

  async getAllFilms() {
    const result = await this.getResource('films/');

    return {
      count: result.count,
      films: result.results.map(film => {
        return {
          title: film.title,
          director: film.director,
        };
      }),
    };
  }
}
