import path from 'path';
import fs from 'fs';
import { LabPatrol } from './part-1';
import { convertLayoutToArray } from '../../helpers';

let patrol: LabPatrol;

beforeEach(() => {
  const filePath = path.resolve(__dirname, '../test-input.txt');
  const data = fs.readFileSync(filePath, 'utf-8');

  const layoutArray = convertLayoutToArray(data);

  patrol = new LabPatrol(layoutArray);
});

describe('day-6 Pt.1', () => {
  describe('Getting guard position', () => {
    test('should get coordinate {col: 4, row: 1} for the guard position', () => {
      const layout = `....#..
                      .#..^..
                      .......`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getPosition(layoutArray)).toEqual({ col: 4, row: 1 });
    });
    test('should get coordinate {col: 5, row: 1} for the guard position', () => {
      const layout = `....#.
                      ..#..^`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getPosition(layoutArray)).toEqual({ col: 5, row: 1 });
    });
  });

  describe('Checking for obstructions', () => {
    test('should return false when there is no obstruction ahead', () => {
      const layout = `......
                      .#.^..`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(false);
    });
    test('should return true where there is an obstruction ahead', () => {
      const layout = `...#..
                      ...^..`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(true);
    });
    test('should return false if the guard is no longer in the area', () => {
      const layout = `.#....
                      .....#`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(false);
    });
  });
  describe('Taking steps', () => {
    test('should take a step if there are no obstacles ahead', () => {
      const layout = `......
                      .#..^.`;
      const layoutArray = convertLayoutToArray(layout);
      const newLayout = `....^.
                         .#..X.`;
      const newLayoutArray = convertLayoutToArray(newLayout);
      expect(patrol.stepForward(layoutArray)).toStrictEqual(newLayoutArray);
    });
    test('should take a step out of the area if there are no obstacles ahead', () => {
      const layout = `...^#.
                      ......`;
      const newLayout = `...X#.
                         ......`;

      const layoutArray = convertLayoutToArray(layout);
      const newLayoutArray = convertLayoutToArray(newLayout);
      expect(patrol.stepForward(layoutArray)).toStrictEqual(newLayoutArray);
    });
    test('should NOT take a step if there is an obstacle ahead', () => {
      const layout = `...#..
                      ...^..`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.stepForward(layoutArray)).toStrictEqual(layoutArray);
    });
  });
  describe('Avoiding obstructions', () => {
    test('should turn right 90 degress at the obstruction', () => {
      const layout = `...#..
                      ...^..
                      ......`;
      const layoutArray = convertLayoutToArray(layout);

      const newLayout = `...
                         ...
                         #^.
                         ...
                         ...
                         ...`;
      const newLayoutArray = convertLayoutToArray(newLayout);

      expect(patrol.avoidObstruction(layoutArray)).toStrictEqual(
        newLayoutArray
      );
    });
  });
  describe('Counting patrol steps', () => {
    test('should get the sum of unique steps', () => {
      expect(patrol.getSumOfSteps()).toBe(41);
    });
  });
});
