import path from 'path';
import fs from 'fs';
import { Reactor } from './day-2';

describe('day-2', () => {
  let reactor: Reactor;

  beforeEach(() => {
    const filePath = path.resolve(__dirname, 'input.txt');
    const data = fs.readFileSync(filePath, 'utf-8');

    reactor = new Reactor(data);
  });

  describe('Checking report levels', () => {
    test('should check levels are all increasing', () => {
      const reportOne = reactor.reports[0];
      const reportTwo = reactor.reports[1];
      const reportThree = reactor.reports[2];
      expect(reactor.checkLevelsIncrease(reportOne)).toBe(false);
      expect(reactor.checkLevelsIncrease(reportTwo)).toBe(false);
      expect(reactor.checkLevelsIncrease(reportThree)).toBe(true);
    });

    test('should check levels are all decreasing', () => {
      const reportOne = reactor.reports[3];
      const reportTwo = reactor.reports[4];
      const reportThree = reactor.reports[5];
      const reportFour = [7, 6, 4, 2, 1];
      expect(reactor.checkLevelsDecrease(reportOne)).toBe(false);
      expect(reactor.checkLevelsDecrease(reportTwo)).toBe(false);
      expect(reactor.checkLevelsDecrease(reportThree)).toBe(false);
      expect(reactor.checkLevelsDecrease(reportFour)).toBe(true);
    });

    test('should check any two adjacent levels differ by at least one and at most three', () => {
      const reportOne = reactor.reports[0];
      const reportTwo = reactor.reports[10];
      const reportThree = reactor.reports[1];
      expect(reactor.checkDifferenceIsBetweenOneAndThree(reportOne)).toBe(true);
      expect(reactor.checkDifferenceIsBetweenOneAndThree(reportTwo)).toBe(
        false
      );
      expect(reactor.checkDifferenceIsBetweenOneAndThree(reportThree)).toBe(
        false
      );
    });
  });

  describe('Counting safe reports', () => {
    test('should get the total number of safe reports', () => {
      expect(reactor.count()).toBe(700);
    });
  });

  describe('Tolerating a single bad level in a report', () => {
    const dataProvider = [
      { report: [7, 6, 4, 2, 1], expected: true },
      { report: [1, 2, 7, 8, 9], expected: false },
      { report: [9, 7, 6, 2, 1], expected: false },
      { report: [1, 3, 2, 4, 5], expected: true },
      { report: [8, 6, 4, 4, 1], expected: true },
      { report: [1, 3, 6, 7, 9], expected: true },
    ];

    dataProvider.forEach((testCase) => {
      it(`should make report ${testCase.report.toString()} safe if a single level is removed`, () => {
        expect(reactor.dampenProblem(testCase.report)).toBe(testCase.expected);
      });
    });
  });
});
