export function convertLayoutToArray(input: string): string[][] {
  return input.split('\n').map((line) => line.trim().split(''));
}

export function convertArrayToLayout(array: string[][]): string {
  return array.map((row) => row.join('')).join('\n');
}

export function cloneLayout(layout: string[][]): string[][] {
  return layout.map((row) => [...row]);
}

export function convertToArray(str: string): string[] {
  return str
    .trim()
    .split('\n')
    .map((line) => line.trim());
}
