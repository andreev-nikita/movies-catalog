import BaseService from './base-service';

export default class PixabayService extends BaseService {
  constructor() {
    super({
      host:
        'https://pixabay.com/api/?key=14312176-9ee087bb2f43bb3ba861a31e1&orientation=horizontal&q=',
    });
  }

  async getImage(text) {
    const urlEncoded = encodeURIComponent(text.toLowerCase()) // eslint-disable-line prettier/prettier
      .replace(/%20/g, '+');

    const result = await this.getResource(urlEncoded);

    if (result.totalHits !== 0) {
      return result.hits[0].webformatURL;
    }

    throw new Error(`nothing is found for '${result}' request.`);
  }
}
