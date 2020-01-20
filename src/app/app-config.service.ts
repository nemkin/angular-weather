import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private url = '/assets/api_keys.json';
  private appConfig: any;

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get(this.url)
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  get openWeatherApiKey() {
    if (!this.appConfig) {
      throw Error('API key file not is not loaded! Did you save your API keys to /assets/api_keys.json?');
    }
    return this.appConfig.openWeatherMapApiKey;
  }
}
