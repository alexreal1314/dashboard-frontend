import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/site/services/api.service';
import { StatisticsResponse } from '../interfaces';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly API_PREFIX = "api";

  constructor(private apiService: ApiService) {}

  public getStatistics(sourceType: string): Observable<StatisticsResponse> {
    let params = new HttpParams();

    if (sourceType !== '') {
      params = params.append('sourceType', sourceType);
    }

    return this.apiService.get(`/${this.API_PREFIX}/dashboard`,{ params });
  }

  public getSources(): Observable<string[]> {
    return this.apiService.get(`/${this.API_PREFIX}/dashboard/sources`);
  }

  public getRiskScore(sourceType: string): Observable<{score: number}> {
    let params = new HttpParams();

    if (sourceType !== '') {
      params = params.append('sourceType', sourceType);
    }

    return this.apiService.get(`/${this.API_PREFIX}/dashboard/riskscore`, { params });
  }
}
