export function getEnumByValue<T>(enumType: any, str: string): T | undefined {
  const set = Object.entries(enumType);
  const firstMatch = set.find(kv => isMatch(str, kv));
  return firstMatch?.[1] as T;
}

export function isMatch(candidate: string, [key, value]: [string, unknown]): boolean {
  const compareTo = `${value}`;
  return compareTo.localeCompare(candidate, undefined, { sensitivity: 'accent' }) === 0;
}
