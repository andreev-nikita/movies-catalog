import BaseService from './base-service';

export default class SwapiService extends BaseService {
  constructor() {
    super('https://swapi.co/api/');
  }

  async getMovie(id) {
    const response = await this._getResource(`films/${id}`);

    return {
      id,
      imageUrl: null,
      title: response.title,
      director: response.director,
    };
  }

  /* Метод выполняет запрос на сервер для поиска фильмов,
     в названии которых содержится строка text.
     Возвращает массив id фильмов, которые удовлетворяют условию.
     Id находим в url, так как в ответе сервера не содержатся id фильмов */
  async searchMovies(text) {
    const response = await this._getResource(`films/?search=${text}`);
    const idRegExp = /\/(\d+)\//;

    return response.results.map(data => +data.url.match(idRegExp)[1]);
  }
}
