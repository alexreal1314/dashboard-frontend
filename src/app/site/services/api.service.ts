import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private readonly configService: ConfigService) { }

  public get(url: string, options = {} as any): Observable<any> {
    return this.http.get(`${this.configService.API_URL}${url}`, options);
  }

  public post(url: string, data: any, options = {} as any): Observable<any> {
    return this.http.post(`${this.configService.API_URL}${url}`, data, options);
  }

  public put(url: string, data: any, options = {} as any): Observable<any> {
    return this.http.put(`${this.configService.API_URL}${url}`, data, options);
  }

  public delete(url: string, options = {} as any): Observable<any> {
    return this.http.delete(`${this.configService.API_URL}${url}`, options);
  }
}
