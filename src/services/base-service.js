export default class BaseService {
  constructor(host) {
    this.host = host;
  }

  async _getResource(url) {
    const fullUrl = `${this.host}${url}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error(
        `Could not get data from ${fullUrl}, response status ${response.status}`
      );
    }

    return response.json();
  }
}
