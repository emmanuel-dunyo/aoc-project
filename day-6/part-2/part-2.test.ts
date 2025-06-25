import fs from 'fs';
import { LabPatrol } from './part-2';
import path from 'path';
import { convertToArray } from '../helpers';

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

  // describe('Simulating with an obstacle', () => {
  //   it('should detect a loop when obstacle causes right turns', () => {
  //     const result = patrol.simulateWithObstacle(2, 2);
  //     expect(result).toBe(true);
  //   });

  //   it('should detect a loop even without immediate obstacle', () => {
  //     const result = patrol.simulateWithObstacle(3, 2);
  //     expect(result).toBe(true);
  //   });

  //   it('should detect exit from grid when path is open', () => {
  //     const result = patrol.simulateWithObstacle(-1, -1);
  //     expect(result).toBe(false);
  //   });

  //   it('should still loop without added obstacle', () => {
  //     const result = patrol.simulateWithObstacle(-1, -1);
  //     expect(result).toBe(true);
  //   });
  // });

  it('should count valid positions where a new obstacle causes a loop', () => {
    expect(patrol.countValidObstructionPositions()).toEqual(6);
  });
});
