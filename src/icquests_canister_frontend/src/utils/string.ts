export function truncateString(
  str: string,
  num: number,
  endLength: number = 3
): string {
  if (str.length <= num) {
    return str;
  }
  const start = str.slice(0, num);
  const end = str.slice(-endLength);
  return `${start}...${end}`;
}
