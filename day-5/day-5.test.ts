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
    test('should check if 75,47,61,53,29 is ordered correctly', () => {
      const update = [75, 47, 61, 53, 29];
      expect(printer.checkUpdateOrder(update)).toBe(true);
    });

    test('should check if 97,61,53,29,13 is ordered correctly', () => {
      const update = [97, 61, 53, 29, 13];
      expect(printer.checkUpdateOrder(update)).toBe(true);
    });

    test('should check if 75,29,13 is ordered correctly', () => {
      const update = [75, 29, 13];
      expect(printer.checkUpdateOrder(update)).toBe(true);
    });

    test('should check if 75,97,47,61,53 is ordered correctly', () => {
      const update = [75, 97, 47, 61, 53];
      expect(printer.checkUpdateOrder(update)).toBe(false);
    });

    test('should check if 61,13,29 is ordered correctly', () => {
      const update = [61, 13, 29];
      expect(printer.checkUpdateOrder(update)).toBe(false);
    });

    test('should check if 97,13,75,29,47 is ordered correctly', () => {
      const update = [97, 13, 75, 29, 47];
      expect(printer.checkUpdateOrder(update)).toBe(false);
    });
  });

  test('should get the sum of middle numbers of the correct updates', () => {
    expect(printer.getSumOfMiddlePages()).toBe(143);
  });

  describe('Reordering incorrect updates', () => {
    test("should reorder '75,97,47,61,53' => '97,75,47,61,53'", () => {
      expect(printer.reorderUpdate([75, 97, 47, 61, 53])).toStrictEqual([
        97, 75, 47, 61, 53,
      ]);
    });

    test("should reorder '61,13,29' => '61,29,13'", () => {
      expect(printer.reorderUpdate([61, 13, 29])).toStrictEqual([61, 29, 13]);
    });

    test("should reorder '97,13,75,29,47' => '97,75,47,29,13'", () => {
      expect(printer.reorderUpdate([97, 13, 75, 29, 47])).toStrictEqual([
        97, 75, 47, 29, 13,
      ]);
    });

    test("should reorder '31,14,72,52,46,38,49,76,74,22,98,68,29,75,89,21,77' => '31,14,72,52,46,38,49,76,74,22,98,68,75,29,89,21,77'", () => {
      expect(
        printer.reorderUpdate([
          31, 14, 72, 52, 46, 38, 49, 76, 74, 22, 98, 68, 29, 75, 89, 21, 77,
        ])
      ).toStrictEqual([
        31, 14, 72, 52, 46, 38, 49, 76, 74, 22, 98, 68, 75, 29, 89, 21, 77,
      ]);
    });

    test("should reorder '21,25,67,34,75,29,52' => '21,25,67,34,75,29,52'", () => {
      expect(printer.reorderUpdate([21, 25, 67, 34, 75, 29, 52])).toStrictEqual(
        [21, 25, 67, 34, 75, 29, 52]
      );
    });
  });

  test('should get sum of incorrect updates middle number, after ordering them', () => {
    expect(printer.getSumOfIncorrectMiddlePages()).toBe(123);
  });
});
