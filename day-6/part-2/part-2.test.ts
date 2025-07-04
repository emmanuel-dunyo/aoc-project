import fs from 'fs';
import { LabPatrol } from './part-2';
import path from 'path';
import { convertToArray } from '../../helpers';

let patrol: LabPatrol;

beforeEach(() => {
  const filePath = path.resolve(__dirname, '../test-input.txt');
  const data = fs.readFileSync(filePath, 'utf-8');
  const input = convertToArray(data);

  patrol = new LabPatrol(input);
});

describe('Part 2', () => {
  describe('Finding start position', () => {
    it('should correctly find start position and direction: UP', () => {
      const input = `...
                     #^.
                     #.#`;
      const inputArray = convertToArray(input);
      expect(patrol.findStart(inputArray)).toStrictEqual({
        row: 1,
        col: 1,
        dir: 0,
      });
    });

    it('should correctly find start position and direction: RIGHT', () => {
      const input = `...
                     #>.
                     #.#`;
      const inputArray = convertToArray(input);
      expect(patrol.findStart(inputArray)).toStrictEqual({
        row: 1,
        col: 1,
        dir: 1,
      });
    });

    it('should correctly find start position and direction: DOWN', () => {
      const input = `...
                     #.v
                     #.#`;
      const inputArray = convertToArray(input);
      expect(patrol.findStart(inputArray)).toStrictEqual({
        row: 1,
        col: 2,
        dir: 2,
      });
    });

    it('should correctly find start position and direction: LEFT', () => {
      const input = `<..
                     ...
                     #.#`;
      const inputArray = convertToArray(input);
      expect(patrol.findStart(inputArray)).toStrictEqual({
        row: 0,
        col: 0,
        dir: 3,
      });
    });

    it('should return out of bounds coordinates when guard is not present', () => {
      const input = `...
                     #..
                     #.#`;
      const inputArray = convertToArray(input);
      expect(patrol.findStart(inputArray)).toStrictEqual({
        row: -1,
        col: -1,
        dir: -1,
      });
    });
  });

  describe('Simulating with an obstacle', () => {
    it('should detect a loop when an obstacle is placed in row 6 col 3', () => {
      const result = patrol.simulateWithObstacle(6, 3);
      expect(result).toBe(true);
    });

    it('should NOT detect a loop when an obstacle is placed in row 0 col 0', () => {
      const result = patrol.simulateWithObstacle(0, 0);
      expect(result).toBe(false);
    });

    it('should detect a loop when an obstacle is placed in row 7 col 6', () => {
      const result = patrol.simulateWithObstacle(7, 6);
      expect(result).toBe(true);
    });

    it('should detect a loop when an obstacle is placed in row 8 col 1', () => {
      const result = patrol.simulateWithObstacle(8, 1);
      expect(result).toBe(true);
    });

    it('should NOT detect a loop when an obstacle is placed in row 8 col 2', () => {
      const result = patrol.simulateWithObstacle(8, 2);
      expect(result).toBe(false);
    });
  });

  it('should count valid positions where a new obstacle causes a loop', () => {
    expect(patrol.countValidObstructionPositions()).toEqual(6);
  });
});
