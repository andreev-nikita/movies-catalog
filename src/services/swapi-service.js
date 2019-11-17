export default class SwapiService {
  host = 'https://swapi.co/api/';

  async getResource(url) {
    const fullUrl = `${this.host}${url}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error(
        `Could not get data from ${fullUrl}, response status ${response.status}`
      );
    }

    return response.json();
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
