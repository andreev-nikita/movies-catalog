import BaseService from './base-service';

export default class SwapiService extends BaseService {
  constructor() {
    super({
      host: 'https://swapi.co/api/',
    });
  }

  async getMovie(id) {
    const response = await this.getResource(`films/${id}`);

    return {
      id,
      imageUrl: null,
      title: response.title,
      director: response.director,
    };
  }

  async searchMovies(text) {
    const response = await this.getResource(`films/?search=${text}`);
    const idRegExp = /\/(\d+)\//;

    return response.results.map(data => +data.url.match(idRegExp)[1]);
  }
}
