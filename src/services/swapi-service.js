import BaseService from './base-service';

export default class SwapiService extends BaseService {
  constructor() {
    super({
      host: 'https://swapi.co/api/',
    });
  }

  async getMovie(id) {
    const result = await this.getResource(`films/${id}`);
    await new Promise(res => setTimeout(res, 2000));

    return {
      id,
      imageUrl: null,
      title: result.title,
      director: result.director,
    };
  }
}
