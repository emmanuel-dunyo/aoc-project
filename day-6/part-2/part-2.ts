import { Coord } from '../Coord';
import { cloneLayout } from '../helpers';

export class LabPatrol {
  layout: string[][] = [];

  constructor(patrolLayout: string[][]) {
    this.layout = patrolLayout;
  }

  getPosition(layout: string[][], item: string): Coord {
    const row = layout.findIndex((row) => {
      return row.includes(item);
    });
    const col = row > -1 ? layout[row].indexOf(item) : -1;
    return new Coord(row, col);
  }

  checkObstructionAhead(layout: string[][]): boolean {
    const guardPosition = this.getPosition(layout, '^');

    if (guardPosition.row <= 0) {
      return false;
    }

    const positionAhead = layout[guardPosition.row - 1][guardPosition.col];

    return positionAhead === '#' || positionAhead === 'O';
  }

  stepForward(layout: string[][]): string[][] {
    const guardPosition = this.getPosition(layout, '^');
    const { row, col } = guardPosition;

    if (this.checkObstructionAhead(layout)) {
      return layout;
    }

    const newLayout = cloneLayout(layout);
    if (row > 0) {
      newLayout[row - 1][col] = '^';
    }
    newLayout[row][col] = '.';

    return newLayout;
  }

  avoidObstruction(layout: string[][]): string[][] {
    const rotatedLayout = layout[0].map((_, index) =>
      layout.map((row) => row[row.length - 1 - index])
    );

    const guardPosition = this.getPosition(rotatedLayout, '^');
    const { row, col } = guardPosition;

    const newLayout = cloneLayout(rotatedLayout);
    if (row > 0) {
      newLayout[row - 1][col] = '^';
    }
    newLayout[row][col] = '+';

    return newLayout;
  }

  updateLayout(layout: string[][], movement: 'forward' | 'avoid'): string[][] {
    const isAvoiding = movement === 'avoid';

    const guardPosition = this.getPosition(layout, '^');
    const { row, col } = guardPosition;

    const newLayout = cloneLayout(layout);

    if (row > 0) {
      newLayout[row - 1][col] = '^';
    }
    newLayout[row][col] = isAvoiding ? '+' : '.';

    return newLayout;
  }

  getSumOfLoopOptions(): number {
    let count = 0;

    for (let rowIndex = 0; rowIndex < this.layout.length; rowIndex++) {
      const row = this.layout[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        let layout = cloneLayout(this.layout);

        // add obstruction
        layout[rowIndex][colIndex] = 'O';
        // console.log(rowIndex, colIndex, layout);

        // patrol the lab
        while (true) {
          const { row } = this.getPosition(layout, '^');
          if (row === -1) {
            break;
          }

          if (this.checkObstructionAhead(layout)) {
            // console.log(rowIndex, colIndex, layout);
            layout = this.avoidObstruction(layout);
          }

          layout = this.stepForward(layout);
          // console.log(rowIndex, colIndex, layout);
        }

        // remove obstruction
        layout[rowIndex][colIndex] = '.';
      }
    }

    return count;
  }
}
