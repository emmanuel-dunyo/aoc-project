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
    expect(reactor.checkLevelsDecrease(reportOne)).toBe(false);
    expect(reactor.checkLevelsDecrease(reportTwo)).toBe(false);
    expect(reactor.checkLevelsDecrease(reportThree)).toBe(false);
  });

  test('should check any two adjacent levels differ by at least one and at most three', () => {
    const reportOne = reactor.reports[0];
    const reportTwo = reactor.reports[10];
    expect(reactor.checkDifferenceIsBetweenOneAndThree(reportOne)).toBe(true);
    expect(reactor.checkDifferenceIsBetweenOneAndThree(reportTwo)).toBe(false);
  });

  test('should get the total number of safe reports', () => {
    expect(reactor.count()).toBe(700);
  });

  test('should make a level safe after removing a level', () => {
    const reportOne = [7, 6, 4, 2, 1];
    const reportTwo = [1, 2, 7, 8, 9]; // reactor.reports[6];
    const reportThree = [9, 7, 6, 2, 1];
    const reportFour = [1, 3, 2, 4, 5];
    const reportFive = [8, 6, 4, 4, 1];
    const reportSix = [1, 3, 6, 7, 9];

    expect(reactor.dampenProblem(reportOne)).toBe(true);
    expect(reactor.dampenProblem(reportTwo)).toBe(false);
    expect(reactor.dampenProblem(reportThree)).toBe(false);
    expect(reactor.dampenProblem(reportFour)).toBe(true);
    expect(reactor.dampenProblem(reportFive)).toBe(true);
    expect(reactor.dampenProblem(reportSix)).toBe(true);

    const inputReportOne = reactor.reports[3];
    const inputReportTwo = reactor.reports[4];
    const inputReportThree = reactor.reports[5];
    expect(reactor.dampenProblem(inputReportOne)).toBe(true);
    expect(reactor.dampenProblem(inputReportTwo)).toBe(true);
    expect(reactor.dampenProblem(inputReportThree)).toBe(false);
  });
});
