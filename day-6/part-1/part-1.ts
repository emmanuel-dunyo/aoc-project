type GuardCoord = {
  row: number;
  col: number;
};

class CoordsClass implements GuardCoord {
  constructor(readonly row: number, readonly col: number) {}
}

export class LabPatrol {
  layout: string[][] = [];

  constructor(patrolLayout: string[][]) {
    this.layout = patrolLayout;
  }

  getPosition(layout: string[][]): CoordsClass {
    const row = layout.findIndex((row) => {
      return row.includes('^');
    });
    const col = row > -1 ? layout[row].indexOf('^') : -1;
    return new CoordsClass(row, col);
  }

  checkObstructionAhead(layout: string[][]): boolean {
    const position = this.getPosition(layout);

    if (position.row <= 0) {
      return false;
    }

    return layout[position.row - 1][position.col] === '#';
  }

  stepForward(layout: string[][]): string[][] {
    const position = this.getPosition(layout);

    const { row, col } = position;

    if (this.checkObstructionAhead(layout)) {
      return layout;
    }

    const newLayout = layout.map((row) => [...row]);
    if (row > 0) {
      newLayout[row - 1][col] = '^';
    }
    newLayout[row][col] = 'X';

    return newLayout;
  }

  avoidObstacle(layout: string[][]): string[][] {
    const rotatedLayout = layout[0].map((_, index) =>
      layout.map((row) => row[row.length - 1 - index])
    );

    if (this.checkObstructionAhead(layout)) {
      return rotatedLayout;
    }

    return layout;
  }

  getSumOfSteps(): number {
    let layout = this.layout;

    while (true) {
      const { row } = this.getPosition(layout);
      if (row === -1) {
        break;
      }

      let newLayout = layout;
      if (this.checkObstructionAhead(layout)) {
        newLayout = this.avoidObstacle(layout);
      }

      layout = this.stepForward(newLayout);
    }

    return layout.flatMap((rows) => rows.filter((row) => row.includes('X')))
      .length;
  }
}
