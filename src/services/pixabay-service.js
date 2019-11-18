import BaseService from './base-service';

export default class PixabayService extends BaseService {
  constructor() {
    super('https://pixabay.com/api/?key=14312176-9ee087bb2f43bb3ba861a31e1&q=');
  }

  /* Метод возвращает url первого найденного изображения, 
     или выбрасывает ошибку если изображения не найдены */
  async getImage(text) {
    const urlEncoded = encodeURIComponent(text.toLowerCase()) // eslint-disable-line prettier/prettier
      .replace(/%20/g, '+');

    const result = await this._getResource(urlEncoded);

    if (result.totalHits !== 0) {
      const url = result.hits[0].webformatURL;

      return url;
    }

    throw new Error(`nothing is found for '${result}' request.`);
  }
}
