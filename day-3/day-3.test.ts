import { calculateMulInstructions } from './day-3';
import path from 'path';
import fs from 'fs';

test('should calculate valid instructions', () => {
  const testInput =
    'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
  expect(calculateMulInstructions(testInput)).toBe(161);

  const filePath = path.resolve(__dirname, 'input.txt');
  const input = fs.readFileSync(filePath, 'utf-8');
  expect(calculateMulInstructions(input)).toBe(104083373);
});

test(`should handle do() and don't instructions`, () => {
  const testInput = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
  expect(calculateMulInstructions(testInput)).toBe(48);
});
