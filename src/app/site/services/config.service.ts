import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public API_URL: any;
  private CONFIG_URL: string = environment.production === true ? `./assets/config/config.json` : `../../assets/config/config.json`;

  constructor(private http: HttpClient) {}

  public async loadConfig() : Promise<boolean> {
    try {
      const data = await this.http.get(this.CONFIG_URL).toPromise();
      this.API_URL = (data as any).hostname;
      return true;

    } catch(err) {
      return false;
    }
  }
}
