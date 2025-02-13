import path from 'path';
import fs from 'fs';
import { ManualPrinter } from './day-5';

let printer: ManualPrinter;

beforeEach(() => {
  const filePath = path.resolve(__dirname, 'test-rules.txt');
  const data = fs.readFileSync(filePath, 'utf-8');
  const updatesFilePath = path.resolve(__dirname, 'test-updates.txt');
  const updatesData = fs.readFileSync(updatesFilePath, 'utf-8');

  printer = new ManualPrinter(data, updatesData);
});

describe('day-5', () => {
  describe('should check the order of the page updates', () => {
    const updatesProvider = [
      { update: ['75', '47', '61', '53', '29'], expected: true },
      { update: ['97', '61', '53', '29', '13'], expected: true },
      { update: ['75', '29', '13'], expected: true },
      { update: ['75', '97', '47', '61', '53'], expected: false },
      { update: ['61', '13', '29'], expected: false },
      { update: ['97', '13', '75', '29', '47'], expected: false },
    ];

    updatesProvider.forEach((testCase) => {
      test(`should check if ${testCase.update.join(
        ','
      )} is ordered correctly`, () => {
        expect(printer.checkUpdateOrder(testCase.update)).toBe(
          testCase.expected
        );
      });
    });
  });

  test('should get the sum of middle numbers of the correct updates', () => {
    expect(printer.getSumOfMiddlePages()).toBe(143);
  });

  describe('Reordering incorrect updates', () => {
    const updatesProvider = [
      {
        update: ['75', '97', '47', '61', '53'],
        expected: ['97', '75', '47', '61', '53'],
      },
      { update: ['61', '13', '29'], expected: ['61', '29', '13'] },
      {
        update: ['97', '13', '75', '29', '47'],
        expected: ['97', '75', '47', '29', '13'],
      },
      {
        update: [
          '31',
          '14',
          '72',
          '52',
          '46',
          '38',
          '49',
          '76',
          '74',
          '22',
          '98',
          '68',
          '29',
          '75',
          '89',
          '21',
          '77',
        ],
        expected: [
          '31',
          '14',
          '72',
          '52',
          '46',
          '38',
          '49',
          '76',
          '74',
          '22',
          '98',
          '68',
          '75',
          '29',
          '89',
          '21',
          '77',
        ],
      },
      {
        update: ['21', '25', '67', '34', '75', '29', '52'],
        expected: ['21', '25', '67', '34', '75', '29', '52'],
      },
    ];

    updatesProvider.forEach((testCase) => {
      test(`should reorder '${testCase.update.join(
        ','
      )}' => '${testCase.expected.join(',')}'`, () => {
        expect(printer.reorderUpdate(testCase.update)).toStrictEqual(
          testCase.expected
        );
      });
    });
  });

  test('should get sum of incorrect updates middle number, after ordering them', () => {
    expect(printer.getSumOfIncorrectMiddlePages()).toBe(123);
  });
});
