export function added을or를 (name: string, prefix: (_str: string) => string = (str) => str): string {
  // 을 또는 를이 추가된 문자열 반환

  const charCode = name.charCodeAt(name.length - 1);
  const consonantCode = (charCode - 44032) % 28;

  if (consonantCode === 0) {
    return `${prefix(name)}를`;
  }
  return `${prefix(name)}을`;
}