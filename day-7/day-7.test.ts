import path from 'path';
import fs from 'fs';
import {
  formatEquationToArray,
  getTotal,
  validateEquation,
  validateWithConcat,
} from './day-7';
import { convertToArray } from '../helpers';

describe('day-7', () => {
  describe('formatting equation to array', () => {
    test(`should format '190: 10 19' equation to array`, () => {
      const equation = '190: 10 19';
      const equationArray = [190, 10, 19];

      expect(formatEquationToArray(equation)).toEqual(equationArray);
    });

    test(`should format '161011: 16 10 13' equation to array`, () => {
      const equation = '161011: 16 10 13';
      const equationArray = [161011, 16, 10, 13];

      expect(formatEquationToArray(equation)).toEqual(equationArray);
    });
  });

  describe(`Checking if equations can be made true with the operatiors '+' and '*'`, () => {
    test(`should return true for combination: '190: 10 19'`, () => {
      const equation = '190: 10 19';
      const equationArray = formatEquationToArray(equation);
      const target = equationArray[0];
      const numbers = equationArray.slice(1);

      expect(validateEquation(target, numbers)).toBe(true);
    });

    test(`should return true for combination: '3267: 81 40 27'`, () => {
      const equation = '3267: 81 40 27';
      const equationArray = formatEquationToArray(equation);
      const target = equationArray[0];
      const numbers = equationArray.slice(1);

      expect(validateEquation(target, numbers)).toBe(true);
    });

    test(`should return true for combination: '292: 11 6 16 20'`, () => {
      const equation = '292: 11 6 16 20';
      const equationArray = formatEquationToArray(equation);
      const target = equationArray[0];
      const numbers = equationArray.slice(1);

      expect(validateEquation(target, numbers)).toBe(true);
    });

    test(`should return false for combination: '161011: 16 10 13'`, () => {
      const equation = '161011: 16 10 13';
      const equationArray = formatEquationToArray(equation);
      const target = equationArray[0];
      const numbers = equationArray.slice(1);

      expect(validateEquation(target, numbers)).toBe(false);
    });

    test(`should return false for combination: '191: 10 19'`, () => {
      const equation = '191: 10 19';
      const equationArray = formatEquationToArray(equation);
      const target = equationArray[0];
      const numbers = equationArray.slice(1);

      expect(validateEquation(target, numbers)).toBe(false);
    });
  });

  describe('Calculating total result', () => {
    const filePath = path.resolve(__dirname, './test-input.txt');
    const data = fs.readFileSync(filePath, 'utf-8');
    const input = convertToArray(data);

    expect(getTotal(input)).toBe(3749);
  });

  describe('Concatenating digits', () => {
    const equation = '191: 10 19';
    const equationArray = formatEquationToArray(equation);
    const target = equationArray[0];
    const numbers = equationArray.slice(1);

    expect(validateWithConcat(target, numbers)).toBe(true);
  });
});
