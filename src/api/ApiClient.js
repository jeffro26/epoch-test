import axios from "axios";

export class Client {
  constructor() {
    const baseConfig = this._defaultConfig();
    this.config = baseConfig;
    this.http = this.newHttp();
  }

  _defaultConfig() {
    return {
      headers: { Authorization: "mysecrettoken" }
    };
  }

  newHttp() {
    const http = axios.create(this.config);
    return http;
  }
  async _get(url) {
    try {
      const response = await this.http.get(url);
      return response.data;
    } catch (err) {
      window.alert(err);
      throw err;
    }
  }
}

const client = new Client();

export default client;
