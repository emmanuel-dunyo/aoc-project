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

    return positionAhead === 'O' || positionAhead === '#';
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
    newLayout[row][col] = '.';

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
    newLayout[row][col] = '.';

    return newLayout;
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

        let layout = cloneLayout(this.layout);

        layout[rowIndex][colIndex] = 'O';

        const seenLayouts = new Set<string>();
        seenLayouts.add(JSON.stringify(layout));

        while (true) {
          const { row } = this.getPosition(layout, '^');
          if (row === -1) {
            break;
          }

          if (this.checkObstructionAhead(layout)) {
            layout = this.avoidObstruction(layout);
          }

          layout = this.stepForward(layout);

          const layoutString = JSON.stringify(layout);
          if (seenLayouts.has(layoutString)) {
            count++;
            break;
          }

          seenLayouts.add(layoutString);
        }

        layout[rowIndex][colIndex] = '.';
      }
    }

    return count;
  }
}
