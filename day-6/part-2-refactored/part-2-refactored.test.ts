import path from 'path';
import fs from 'fs';
import { LabPatrol } from './part-2-refactored';
import { convertLayoutToArray } from '../helpers';

let patrol: LabPatrol;

beforeEach(() => {
  const filePath = path.resolve(__dirname, '../test-input.txt');
  const data = fs.readFileSync(filePath, 'utf-8');

  const layoutArray = convertLayoutToArray(data);

  patrol = new LabPatrol(layoutArray);
});

describe('Refactored part 2', () => {
  describe('Getting guard position', () => {
    test('should get coordinate {col: 4, row: 6} for the guard position in UP direction', () => {
      const layout = `....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..^.....
        ........#.
        #.........
        ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getPosition(layoutArray)).toEqual({ col: 4, row: 6 });
    });
    test('should get coordinate {col: 9, row: 3} for the guard position in UP direction', () => {
      const layout = `....#.....
        .........#
        ..........
        ..#......^
        .......#..
        ..........
        .#........
        ........#.
        #.........
        ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getPosition(layoutArray)).toEqual({ col: 9, row: 3 });
    });
    test('should get coordinate {col: 4, row: 6} for the guard positionin RIGHT direction', () => {
      const layout = `....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..>.....
        ........#.
        #.........
        ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getPosition(layoutArray)).toEqual({ col: 4, row: 6 });
    });
    test('should get coordinate {col: 9, row: 3} for the guard position in DOWN direction', () => {
      const layout = `....#.....
        .........#
        ..........
        ..#......v
        .......#..
        ..........
        .#........
        ........#.
        #.........
        ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getPosition(layoutArray)).toEqual({ col: 9, row: 3 });
    });
    test('should get coordinate {col: 9, row: 3} for the guard position in LEFT direction', () => {
      const layout = `....#.....
        .........#
        ..........
        ..#......<
        .......#..
        ..........
        .#........
        ........#.
        #.........
        ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getPosition(layoutArray)).toEqual({ col: 9, row: 3 });
    });
  });
  describe('Getting guard direction', () => {
    test('should get UP for the guard position', () => {
      const layout = `....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..^.....
        ........#.
        #.........
        ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getDirection(layoutArray)).toBe('UP');
    });
    test('should get RIGHT for the guard position', () => {
      const layout = `....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..>.....
        ........#.
        #.........
        ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getDirection(layoutArray)).toBe('RIGHT');
    });
    test('should get DOWN for the guard position', () => {
      const layout = `....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..v.....
        ........#.
        #.........
        ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getDirection(layoutArray)).toBe('DOWN');
    });
    test('should get LEFT for the guard position', () => {
      const layout = `....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..<.....
        ........#.
        #.........
        ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.getDirection(layoutArray)).toBe('LEFT');
    });
  });
  describe('Guard moving', () => {
    test('should move the guard up one step', () => {
      const layout = `....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#..^.....
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      const newLayout = `....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ....^.....
          .#........
          ........#.
          #.........
          ......#...`;
      const newLayoutArray = convertLayoutToArray(newLayout);
      expect(patrol.move(layoutArray)).toStrictEqual(newLayoutArray);
    });
    test('should move the guard right one step', () => {
      const layout = `....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#..>.....
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      const newLayout = `....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#...>....
          ........#.
          #.........
          ......#...`;
      const newLayoutArray = convertLayoutToArray(newLayout);
      expect(patrol.move(layoutArray)).toStrictEqual(newLayoutArray);
    });
    test('should move the guard down one step', () => {
      const layout = `....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#..v.....
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      const newLayout = `....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#........
          ....v...#.
          #.........
          ......#...`;
      const newLayoutArray = convertLayoutToArray(newLayout);
      expect(patrol.move(layoutArray)).toStrictEqual(newLayoutArray);
    });
    test('should move the guard left one step', () => {
      const layout = `....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#..<.....
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      const newLayout = `....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#.<......
          ........#.
          #.........
          ......#...`;
      const newLayoutArray = convertLayoutToArray(newLayout);
      expect(patrol.move(layoutArray)).toStrictEqual(newLayoutArray);
    });
  });
  describe('Checking for obstruction', () => {
    test('should return false when there is no obstruction ahead in UP direction', () => {
      const layout = `....#.....
          .........#
          ....^.....
          ..#.......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(false);
    });
    test('should return true when there is an obstruction ahead in UP direction', () => {
      const layout = `....#.....
          ....^....#
          ..........
          ..#.......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(true);
    });
    test('should return false when there is no obstruction ahead in RIGHT direction', () => {
      const layout = `....#.....
          .......>.#
          ..........
          ..#.......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(false);
    });
    test('should return true when there is an obstruction ahead in RIGHT direction', () => {
      const layout = `....#.....
          ........>#
          ..........
          ..#.......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(true);
    });
    test('should return false when there is no obstruction ahead in DOWN direction', () => {
      const layout = `....#.....
          .........#
          .......v..
          ..#.......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(false);
    });
    test('should return true when there is an obstruction ahead in DOWN direction', () => {
      const layout = `....#.....
          .........#
          ..........
          ..#....v..
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(true);
    });
    test('should return false when there is no obstruction ahead in LEFT direction', () => {
      const layout = `....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#.<......
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(false);
    });
    test('should return true when there is an obstruction ahead in LEFT direction', () => {
      const layout = `....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#<.......
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      expect(patrol.checkObstructionAhead(layoutArray)).toBe(true);
    });
  });
  describe('Avoiding an obstruction', () => {
    test('should avoid the obstruction by turning right 90 degrees in UP direction', () => {
      const layout = `....#.....
          ....^....#
          ..........
          ..#.......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      const newLayout = `....#.....
          ....>....#
          ..........
          ..#.......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const newLayoutArray = convertLayoutToArray(newLayout);
      expect(patrol.avoidObstruction(layoutArray)).toStrictEqual(
        newLayoutArray
      );
    });
    test('should avoid the obstruction by turning right 90 degrees in RIGHT direction', () => {
      const layout = `....#.....
          ........>#
          ..........
          ..#.......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      const newLayout = `....#.....
          ........v#
          ..........
          ..#.......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const newLayoutArray = convertLayoutToArray(newLayout);
      expect(patrol.avoidObstruction(layoutArray)).toStrictEqual(
        newLayoutArray
      );
    });
    test('should avoid the obstruction by turning right 90 degrees in DOWN direction', () => {
      const layout = `....#.....
          .........#
          ..........
          ..#....v..
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      const newLayout = `....#.....
          .........#
          ..........
          ..#....<..
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const newLayoutArray = convertLayoutToArray(newLayout);
      expect(patrol.avoidObstruction(layoutArray)).toStrictEqual(
        newLayoutArray
      );
    });
    test('should avoid the obstruction by turning right 90 degrees in DOWN direction', () => {
      const layout = `....#.....
          .........#
          ..........
          ..#<......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const layoutArray = convertLayoutToArray(layout);
      const newLayout = `....#.....
          .........#
          ..........
          ..#^......
          .......#..
          ..........
          .#........
          ........#.
          #.........
          ......#...`;
      const newLayoutArray = convertLayoutToArray(newLayout);
      expect(patrol.avoidObstruction(layoutArray)).toStrictEqual(
        newLayoutArray
      );
    });
  });
  describe('Getting sum of different positions to add an obstruction', () => {
    test('should get the sum of position an obstruction can be added to trap the guard in a loop', () => {
      expect(patrol.getSumOfLoopOptions()).toBe(6);
    });
  });
});
