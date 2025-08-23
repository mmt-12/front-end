export function filterByStringProp<
  T extends Record<K, string>,
  K extends keyof T,
>(items: T[], key: K, keyword: string) {
  const lower = keyword.toLowerCase()
  return items.filter(item => item[key].toLowerCase().includes(lower))
}
