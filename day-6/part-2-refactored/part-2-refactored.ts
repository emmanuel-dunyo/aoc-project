import { Coord } from '../Coord';
import { cloneLayout } from '../helpers';

// enum Direction {
//   Up = 'UP',
//   Down = 'DOWN',
//   Left = 'LEFT',
//   Right = 'RIGHT',
// }

export class LabPatrol {
  layout: string[][] = [];

  constructor(patrolLayout: string[][]) {
    this.layout = patrolLayout;
  }

  getPosition(layout: string[][]): Coord {
    for (let row = 0; row < layout.length; row++) {
      for (let col = 0; col < layout[row].length; col++) {
        if ('^>v<'.includes(layout[row][col])) return new Coord(row, col);
      }
    }
    return new Coord(-1, -1);
  }

  getDirection(layout: string[][]): string {
    for (let row of layout) {
      for (let cell of row) {
        if (cell === '>') return 'RIGHT';
        if (cell === '<') return 'LEFT';
        if (cell === 'v') return 'DOWN';
        if (cell === '^') return 'UP';
      }
    }
    return 'UP';
  }

  move(layout: string[][]): string[][] {
    const direction = this.getDirection(layout);
    const { row, col } = this.getPosition(layout);

    if (direction === 'UP' && row > 0) {
      layout[row - 1][col] = '^';
      layout[row][col] = '.';
    }
    if (direction === 'RIGHT' && col < layout[0].length - 1) {
      layout[row][col + 1] = '>';
      layout[row][col] = '.';
    }
    if (direction === 'DOWN' && row < layout.length - 1) {
      layout[row + 1][col] = 'v';
      layout[row][col] = '.';
    }
    if (direction === 'LEFT' && col > 0) {
      layout[row][col - 1] = '<';
      layout[row][col] = '.';
    }

    return layout;
  }

  checkObstructionAhead(layout: string[][]): boolean {
    const { row, col } = this.getPosition(layout);
    const direction = this.getDirection(layout);

    let positionAhead: string | undefined;

    if (direction === 'UP' && row > 0) {
      positionAhead = layout[row - 1][col];
    }
    if (direction === 'RIGHT' && col < layout[0].length - 1) {
      positionAhead = layout[row][col + 1];
    }
    if (direction === 'DOWN' && row < layout.length - 1) {
      positionAhead = layout[row + 1][col];
    }
    if (direction === 'LEFT' && col > 0) {
      positionAhead = layout[row][col - 1];
    }
    return positionAhead
      ? positionAhead === '#' || positionAhead === 'O'
      : false;
  }

  avoidObstruction(layout: string[][]): string[][] {
    const direction = this.getDirection(layout);
    const { row, col } = this.getPosition(layout);

    if (direction === 'UP') {
      layout[row][col] = '>';
    }
    if (direction === 'RIGHT') {
      layout[row][col] = 'v';
    }
    if (direction === 'DOWN') {
      layout[row][col] = '<';
    }
    if (direction === 'LEFT') {
      layout[row][col] = '^';
    }
    return layout;
  }

  getSumOfLoopOptions(): number {
    let count = 0;

    for (let rowIndex = 0; rowIndex < this.layout.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < this.layout[rowIndex].length;
        colIndex++
      ) {
        if (
          this.layout[rowIndex][colIndex] === '#' ||
          this.layout[rowIndex][colIndex] === '^'
        ) {
          continue;
        }

        console.log(rowIndex, colIndex);

        let layout = cloneLayout(this.layout);

        layout[rowIndex][colIndex] = 'O';

        const visitedStates = new Set<string>();

        while (true) {
          const { row, col } = this.getPosition(layout);
          const direction = this.getDirection(layout);

          const stateKey = `${row},${col},${direction}`;

          if (
            (row === 0 && direction === 'UP') ||
            (col === layout[0].length - 1 && direction === 'RIGHT') ||
            (row === layout.length - 1 && direction === 'DOWN') ||
            (col === 0 && direction === 'LEFT')
          ) {
            break;
          }

          if (visitedStates.has(stateKey)) {
            count++;
            break;
          }

          visitedStates.add(stateKey);

          if (this.checkObstructionAhead(layout)) {
            layout = this.avoidObstruction(layout);
          }

          layout = this.move(layout);
        }

        layout[rowIndex][colIndex] = '.';
      }
    }

    return count;
  }
}
