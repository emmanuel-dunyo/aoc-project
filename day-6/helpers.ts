export function convertLayoutToArray(layout: string): string[][] {
  return layout.split('\n').map((line) => line.trim().split(''));
}
