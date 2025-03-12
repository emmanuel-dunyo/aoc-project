type GuardCoord = {
  row: number;
  col: number;
};

class Coord implements GuardCoord {
  constructor(readonly row: number, readonly col: number) {}
}

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

    const newLayout = layout.map((row) => [...row]);
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

    const newLayout = rotatedLayout.map((row) => [...row]);
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

    const newLayout = layout.map((row) => [...row]);

    if (row > 0) {
      newLayout[row - 1][col] = '^';
    }
    newLayout[row][col] = isAvoiding ? '+' : '.';

    return newLayout;
  }

  addObstruction(position: string): string {
    switch (position) {
      case '.':
        return 'O';
      case '#':
      case '^':
      default:
        return position;
    }
  }

  removeObstruction(layout: string[][]): string[][] {
    const { row, col } = this.getPosition(layout, 'O');
    if (row > 0) {
      layout[row][col] = '.';
    }

    return layout;
  }

  // ....#.....
  // ....+...+#
  // ..........
  // ..#.......
  // .......#..
  // ....^.....
  // .#.O+...+.
  // ........#.
  // #.........
  // ......#...

  // 1. 1,4: 2,3 -> 3,2 -> 4,1 -> 5,0
  // 2,3 checks: 1,3 && 2,4

  detectLoop(layout: string[][]): boolean {
    const positions: Coord[] = [];

    layout.forEach((row, rowIndex) => {
      row.forEach((position, colIndex) => {
        if (position === '+') {
          positions.push(new Coord(rowIndex, colIndex));
        }
      });
    });

    // 1. 1,4: 2,3 -> 3,2 -> 4,1 -> 5,0
    // 2,3 checks: 1,3 && 2,4

    let detected: boolean = false;

    for (const position of positions) {
      // get all the rest of the '+' on that row

      // for each of the other positions, now check if there are corecponding '+' in the rest of the columns
      for (
        let rowIndex = position.row + 1;
        rowIndex < layout.length;
        rowIndex++
      ) {
        const rowAvoidCoords = positions.filter(
          (rowPosition) =>
            rowPosition.row === position.row &&
            !(
              rowPosition.row === position.row &&
              rowPosition.col === position.col
            )
        );

        for (const avoidCoord of rowAvoidCoords) {
          // console.log(
          //   '🚀 ~ detectLoop:',
          //   rowIndex,
          //   position,
          //   rowAvoidCoords,
          //   layout[rowIndex][position.col],
          //   position.col,
          //   layout[rowIndex][avoidCoord.col],
          //   avoidCoord.col
          // );

          if (
            layout[rowIndex][position.col] === '+' &&
            layout[rowIndex][avoidCoord.col] === '+'
          ) {
            detected = true;
            break;
          }
        }
        if (detected) break;
      }
      if (detected) break;
    }

    return detected || false;
  }

  getSumOfLoopOptions(): number {
    return 6;
  }
}
