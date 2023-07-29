import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { DestroyCleanupSubject, getEnumByValue } from '../utils';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CardData, StatisticsResponse } from '../interfaces';
import { Observable, of } from 'rxjs';
import { Severity } from '../enums';
import { SEVERITY_RANKS } from '../constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private cleanupSubject$ = new DestroyCleanupSubject();
  private readonly textRegex = /([a-z])([A-Z])/g;

  sourceTypes: string[] = [];
  statistics$: Observable<StatisticsResponse>;
  riskScore$: Observable<number>;

  clearWebSeverityData = [];
  darkWebSeverityData = [];

  constructor(private readonly dashboardService: DashboardService) {}

  async ngOnInit(): Promise<void> {
    await Promise.all([this.fetchSources(), this.fetchStatistics(), this.fetchRiskScore()]);
  }

  async fetchStatistics(sourceType = ''): Promise<void> {
    this.statistics$ = this.dashboardService.getStatistics(sourceType).pipe(
      takeUntil(this.cleanupSubject$),
      switchMap((data: StatisticsResponse) => of(data)),
      map((data) => this.transformData(data) as StatisticsResponse),
      tap((data) => this.prepareChartsData(data))
    );
  }

  async fetchRiskScore(sourceType = ''): Promise<void> {
    this.riskScore$ = this.dashboardService.getRiskScore(sourceType).pipe(
      takeUntil(this.cleanupSubject$),
      switchMap(({ score }) => of(score)),
    );
  }


  
  async fetchSources(): Promise<void> {
    this.dashboardService.getSources().pipe(
      takeUntil(this.cleanupSubject$),
      switchMap((data: string[]) => of(data)),
      tap((data) => this.sourceTypes = data.map((item) => item.replace(this.textRegex, "$1 $2")))
    ).subscribe();
  }

  async onChange(source: string){
    await Promise.all([this.fetchStatistics(source), this.fetchRiskScore(source)]);
  }

  private transformData(data: StatisticsResponse): any {
    return Object.keys(data).reduce((results: Record<string, {key: string, count: number}>, key: string) => {
      results[key] = data[key].map((x) => ({
        key: x.key.replace(this.textRegex, "$1 $2").toUpperCase(),
        count: x.count,
      }))

      return results;
    }, {});
  }

  private prepareChartsData(data: StatisticsResponse): void {
    data['clearWebSeverity'].sort(this.sortBySeverityRank);
    data['darkWebSeverity'].sort(this.sortBySeverityRank);

    this.clearWebSeverityData = data['clearWebSeverity'].map(item => item.count);
    this.darkWebSeverityData = data['darkWebSeverity'].map(item => item.count);
  }

  sortBySeverityRank(a: CardData, b: CardData): number {
    const s1 = getEnumByValue<Severity>(Severity, a.key);
    const s2 = getEnumByValue<Severity>(Severity, b.key);
    return SEVERITY_RANKS[s2] > SEVERITY_RANKS[s1]? 1 : -1;
  }

  ngOnDestroy(): void {
    this.cleanupSubject$.cleanup();
  }
}
