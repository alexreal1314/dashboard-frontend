import { CardData } from './card-data.interface';

export interface StatisticsResponse {
  clearWebType: CardData[];
  clearWebSeverity: CardData[];
  darkWebType: CardData[];
  darkWebSeverity: CardData[];
};
