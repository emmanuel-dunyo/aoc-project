type GuardCoord = {
  row: number;
  col: number;
};

class CoordsClass implements GuardCoord {
  constructor(readonly row: number, readonly col: number) {}
}

export class LabPatrol {
  layout: string[][] = [];

  constructor(patrolLayout: string) {
    this.layout = patrolLayout.split('\n').map((line) => line.trim().split(''));
  }

  getPosition(layout: string[][]): CoordsClass | null {
    const row = layout.findIndex((row) => {
      return row.includes('^');
    });
    const col = row > -1 ? layout[row].indexOf('^') : -1;
    if (col > -1) {
      return new CoordsClass(row, col);
    }

    return null;
  }

  checkObstructionAhead(layout: string[][]): boolean {
    const position = this.getPosition(layout);

    if (!position) {
      return false;
    }

    if (position.row < 0) {
      return false;
    }

    if (position.row - 1 < 0) {
      return false;
    }

    return layout[position.row - 1][position.col] === '#';
  }

  stepForward(layout: string[][]): string[][] {
    const position = this.getPosition(layout);

    if (!position) {
      return layout;
    }

    const { row, col } = position;

    if (this.checkObstructionAhead(layout) && row - 1 > -1) {
      return layout;
    }

    const newLayout = layout.map((row) => [...row]);
    if (row - 1 > -1) {
      newLayout[row - 1][col] = '^';
    }
    newLayout[row][col] = '.';

    return newLayout;
  }

  avoidObstacle(layout: string[][]): string[][] {
    const rotatedLayout = layout[0].map((val, index) =>
      layout.map((row) => row[row.length - 1 - index])
    );

    if (this.checkObstructionAhead(layout)) {
      return rotatedLayout;
    }

    return layout;
  }

  getSumOfSteps(): number {
    let layout = this.layout;
    let coords: GuardCoord[] = [];

    let count: number = 0;

    while (this.getPosition(layout)) {
      console.log(layout.map((x) => x.join('')).join('\n'));

      let newLayout = layout;
      if (this.checkObstructionAhead(layout)) {
        newLayout = this.avoidObstacle(layout);
      }

      const position = this.getPosition(newLayout);
      if (position) {
        console.log(position);
        coords.push(position);
      }

      layout = this.stepForward(newLayout);
      count++;
    }

    console.log(coords);
    console.log('count', count);

    // return uniqueCoords.filter(
    //   (coord, index) =>
    //     index ===
    //     uniqueCoords.findIndex(
    //       (x) => x.col === coord.col && x.row === coord.row
    //     )
    // ).length;
    return coords.length;
  }
}
