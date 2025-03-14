export function convertLayoutToArray(input: string): string[][] {
  return input.split('\n').map((line) => line.trim().split(''));
}

export function cloneLayout(layout: string[][]): string[][] {
  return layout.map((row) => [...row]);
}
