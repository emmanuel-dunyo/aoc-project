const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

type Position = { row: number; col: number; dir: number };

export class LabPatrol {
  private input: string[];
  private rows: number;
  private cols: number;

  constructor(input: string[]) {
    this.input = input;
    this.rows = this.input.length;
    this.cols = this.input[0].length;
  }

  findStart(input: string[]): Position {
    let position = { row: -1, col: -1, dir: -1 };

    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[0].length; col++) {
        const cell = input[row][col];
        const dirIndex = '^>v<'.indexOf(cell);
        if (dirIndex !== -1) {
          position = { row, col, dir: dirIndex };
        }
      }
    }

    return position;
  }

  simulateWithObstacle(obstacleRow: number, obstacleCol: number): boolean {
    const { row, col, dir } = this.findStart(this.input);

    let guardRow = row,
      guardCol = col,
      guardDir = dir;

    const visited = new Set<string>();
    visited.add(`${guardRow},${guardCol},${guardDir}`);

    while (true) {
      const [rowDirection, colDirection] = directions[guardDir];
      const nextRow = guardRow + rowDirection;
      const nextCol = guardCol + colDirection;

      if (
        nextRow < 0 ||
        nextRow >= this.rows ||
        nextCol < 0 ||
        nextCol >= this.cols
      ) {
        return false;
      }

      const nextCell =
        nextRow === obstacleRow && nextCol === obstacleCol
          ? '#'
          : this.input[nextRow][nextCol];

      if (nextCell === '#') {
        guardDir = (guardDir + 1) % 4;
      } else {
        guardRow = nextRow;
        guardCol = nextCol;
      }

      const state = `${guardRow},${guardCol},${guardDir}`;
      if (visited.has(state)) return true;
      visited.add(state);
    }
  }

  countValidObstructionPositions(): number {
    let validPositions = 0;
    const { row: guardRow, col: guardCol } = this.findStart(this.input);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (
          this.input[row][col] === '#' ||
          (row === guardRow && col === guardCol)
        ) {
          continue;
        }
        if (this.simulateWithObstacle(row, col)) {
          validPositions++;
        }
      }
    }

    return validPositions;
  }
}
