import path from 'path';
import fs from 'fs';
import { Locations } from './day-1';

let locations: Locations;

beforeEach(() => {
  const filePath = path.resolve(__dirname, 'test-input.txt');
  const data = fs.readFileSync(filePath, 'utf-8');

  const lines = data.split('\n');
  const leftList = lines.map((line) => {
    const numbers = line.split(/\s+/);
    return Number(numbers[0]);
  });
  const rightList = lines.map((line) => {
    const numbers = line.split(/\s+/);
    return Number(numbers[1]);
  });

  locations = new Locations(leftList, rightList);
});

describe('day-1', () => {
  describe('Reordering list', () => {
    const dataProvider = [
      { list: [1, 2, 3], expected: [1, 2, 3] },
      { list: [23, 34, 59, 100, 1, 7], expected: [1, 7, 23, 34, 59, 100] },
    ];

    dataProvider.forEach((testCase) => {
      it(`should reorder ${testCase.list.join()} in ascesding order to ${testCase.expected.join()}`, () => {
        expect(locations.reorderListAscending(testCase.list)).toStrictEqual(
          testCase.expected
        );
      });
    });
  });

  describe('Getting distance', () => {
    const dataProvider = [
      [23, 4, 19],
      [3, 4, 1],
      [2, 5, 3],
      [3, 9, 6],
    ];

    dataProvider.forEach((testCase) => {
      it(`should get the distance between ${testCase[0]} and ${testCase[1]}, expected: ${testCase[2]}`, () => {
        expect(locations.getDistance(testCase[0], testCase[1])).toBe(
          testCase[2]
        );
      });
    });
  });

  describe('Getting similarity', () => {
    const dataProvider = [
      {
        listA: [3, 4, 2, 1, 3, 3],
        listB: [4, 3, 5, 3, 9, 3],
        expected: [9, 4, 0, 0, 9, 9],
      },
      { listA: [1, 2, 3], listB: [3, 2, 1], expected: [1, 2, 3] },
      { listA: [5, 4, 5], listB: [5, 5, 1], expected: [10, 0, 10] },
    ];

    dataProvider.forEach((testCase) => {
      it(`should get the similarity between ${testCase.listA.join(
        ','
      )} and ${testCase.listB.join(',')}, expected: ${
        testCase.expected
      }`, () => {
        expect(
          locations.getSimilarity(testCase.listA, testCase.listB)
        ).toStrictEqual(testCase.expected);
      });
    });
  });

  describe('Total distance', () => {
    it(`should get the total distance of lists`, () => {
      expect(locations.getTotalDistance()).toBe(11);
    });
  });

  describe('Similarity score', () => {
    it(`should get the similarity score of lists`, () => {
      expect(locations.getSimilarityScore()).toBe(31);
    });
  });
});
