import { Severity } from '../enums';

export const SEVERITY_RANKS: Record<Severity, number> = {
  [Severity.Low]: 0,
  [Severity.Medium]: 1,
  [Severity.High]: 2,
}
