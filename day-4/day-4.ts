enum Directions {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
  DOWN = 'DOWN',
  UP = 'UP',
  DIAGONAL_DOWN_RIGHT = 'DIAGONAL_DOWN_RIGHT',
  DIAGONAL_DOWN_LEFT = 'DIAGONAL_DOWN_LEFT',
  DIAGONAL_UP_RIGHT = 'DIAGONAL_UP_RIGHT',
  DIAGONAL_UP_LEFT = 'DIAGONAL_UP_LEFT',
}

const DirectionLookup = {
  RIGHT: [0, 1],
  LEFT: [0, -1],
  DOWN: [1, 0],
  UP: [-1, 0],
  DIAGONAL_DOWN_RIGHT: [1, 1],
  DIAGONAL_DOWN_LEFT: [1, -1],
  DIAGONAL_UP_RIGHT: [-1, 1],
  DIAGONAL_UP_LEFT: [-1, -1],
} as const;

type Coordinate = { row: number; col: number };
export class Grid {
  private readonly LOOKUP = 'XMAS';

  grid: string[][];

  constructor(input: string) {
    this.grid = input
      .trim()
      .split('\n')
      .map((line) => line.split(''));
  }

  private findLine(row: number, col: number, direction: Directions): boolean {
    const [rowShift, colShift] = DirectionLookup[direction];
    const diagonal: string[] = [];
    for (let i = 0; i < this.LOOKUP.length; i++) {
      if (
        !this.grid[row + rowShift * i] ||
        !this.grid[row + rowShift * i][col + colShift * i]
      )
        return false;
      diagonal.push(this.grid[row + rowShift * i][col + colShift * i]);
    }
    return diagonal.join('') === this.LOOKUP;
  }

  findRight(row: number, col: number): boolean {
    return this.findLine(row, col, Directions.RIGHT);
  }

  findLeft(row: number, col: number): boolean {
    return this.findLine(row, col, Directions.LEFT);
  }

  findDown(row: number, col: number): boolean {
    return this.findLine(row, col, Directions.DOWN);
  }

  findUp(row: number, col: number): boolean {
    return this.findLine(row, col, Directions.UP);
  }

  findDiagonalDownRight(row: number, col: number): boolean {
    return this.findLine(row, col, Directions.DIAGONAL_DOWN_RIGHT);
  }

  findDiagonalDownLeft(row: number, col: number): boolean {
    return this.findLine(row, col, Directions.DIAGONAL_DOWN_LEFT);
  }

  findDiagonalUpRight(row: number, col: number): boolean {
    return this.findLine(row, col, Directions.DIAGONAL_UP_RIGHT);
  }

  findDiagonalUpLeft(row: number, col: number): boolean {
    return this.findLine(row, col, Directions.DIAGONAL_UP_LEFT);
  }

  findAll(): number {
    let count = 0;
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        if (this.findRight(row, col)) count++;
        if (this.findLeft(row, col)) count++;
        if (this.findUp(row, col)) count++;
        if (this.findDown(row, col)) count++;
        if (this.findDiagonalDownRight(row, col)) count++;
        if (this.findDiagonalDownLeft(row, col)) count++;
        if (this.findDiagonalUpRight(row, col)) count++;
        if (this.findDiagonalUpLeft(row, col)) count++;
      }
    }
    return count;
  }

  findAllAs(): Coordinate[] {
    let result: Coordinate[] = [];
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        if (this.grid[row][col] === 'A') {
          result.push({ row, col });
        }
      }
    }

    return result;
  }

  findMAndSFromA(coord: Coordinate): boolean {
    const count = 0;
    if (
      this.grid[coord.row - 1][coord.col - 1] === 'M' &&
      this.grid[coord.row + 1][coord.col + 1] === 'S'
    ) {
      return true;
    }

    return false;
  }
}
