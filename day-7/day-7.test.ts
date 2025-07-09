import path from 'path';
import fs from 'fs';
import { Equation, getTotal, validateEquation } from './day-7';
import { convertToArray } from '../helpers';

describe('day-7', () => {
  describe(`Checking if the numbers can make the target using +, * and || (concatenation) operators`, () => {
    test(`should return true for equation: '190: 10 19'`, () => {
      const { target, numbers } = new Equation('190: 10 19');

      expect(validateEquation(target, numbers)).toBe(true);
    });

    test(`should return true for equation: '3267: 81 40 27'`, () => {
      const { target, numbers } = new Equation('3267: 81 40 27');

      expect(validateEquation(target, numbers)).toBe(true);
    });

    test(`should return true for equation: '292: 11 6 16 20'`, () => {
      const { target, numbers } = new Equation('292: 11 6 16 20');

      expect(validateEquation(target, numbers)).toBe(true);
    });

    test(`should return false for equation: '161011: 16 10 13'`, () => {
      const { target, numbers } = new Equation('161011: 16 10 13');

      expect(validateEquation(target, numbers)).toBe(false);
    });

    test(`should return false for equation: '191: 10 19'`, () => {
      const { target, numbers } = new Equation('191: 10 19');

      expect(validateEquation(target, numbers)).toBe(false);
    });

    test(`should return true for equation: 156: 15 6`, () => {
      const { target, numbers } = new Equation('156: 15 6');

      expect(validateEquation(target, numbers)).toBe(true);
    });

    test(`should return true for equation: 7290: 6 8 6 15`, () => {
      const { target, numbers } = new Equation('7290: 6 8 6 15');

      expect(validateEquation(target, numbers)).toBe(true);
    });

    test(`should return true for equation: 192: 17 8 14`, () => {
      const { target, numbers } = new Equation('192: 17 8 14');

      expect(validateEquation(target, numbers)).toBe(true);
    });
  });

  describe('Calculating total result', () => {
    const filePath = path.resolve(__dirname, './test-input.txt');
    const data = fs.readFileSync(filePath, 'utf-8');
    const input = convertToArray(data);

    expect(getTotal(input)).toBe(11387);
  });
});
