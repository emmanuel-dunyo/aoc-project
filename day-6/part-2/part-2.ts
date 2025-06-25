// //! Read and parse the input file
// const input = fs.readFileSync('./day-6/input.txt', 'utf-8').trim().split('\n');
// const rows = input.length;
// const cols = input[0].length;

// // Direction vectors (up, right, down, left)
// const directions = [
//   [-1, 0],
//   [0, 1],
//   [1, 0],
//   [0, -1],
// ];

// // Locate the guard's initial position and direction
// let startRow: any, startCol: any, startDir: any;
// for (let r = 0; r < rows; r++) {
//   for (let c = 0; c < cols; c++) {
//     if ('^>v<'.includes(input[r][c])) {
//       startRow = r;
//       startCol = c;
//       startDir = '^>v<'.indexOf(input[r][c]); // Map direction symbol to index
//       break;
//     }
//   }
// }

// // Function to simulate guard movement with an optional extra obstacle
// const simulateWithObstacle = (obstacleRow: any, obstacleCol: any) => {
// let guardRow = startRow,
//   guardCol = startCol,
//   guardDir = startDir;
//   const visited = new Set();
//   visited.add(`${guardRow},${guardCol},${guardDir}`);

//   while (true) {
//     const [dr, dc] = directions[guardDir];
//     const nextRow = guardRow + dr;
//     const nextCol = guardCol + dc;

//     // Check if the next position is outside the grid
//     if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
//       return false; // Guard exits the grid
//     }

//     // Treat the additional obstacle as if it's a `#`
//     const nextCell =
//       nextRow === obstacleRow && nextCol === obstacleCol
//         ? '#'
//         : input[nextRow][nextCol];
//     if (nextCell === '#') {
//       // Obstacle ahead, turn right
//       guardDir = (guardDir + 1) % 4;
//     } else {
//       // Move forward
//       guardRow = nextRow;
//       guardCol = nextCol;
//     }

//     const state = `${guardRow},${guardCol},${guardDir}`;
//     if (visited.has(state)) {
//       return true; // Loop detected
//     }
//     visited.add(state);
//   }
// };

// // Count valid positions for the new obstruction
// let validPositions = 0;

// for (let r = 0; r < rows; r++) {
//   for (let c = 0; c < cols; c++) {
//     // Skip positions that are not empty or are the starting position
//     if (input[r][c] === '#' || (r === startRow && c === startCol)) {
//       continue;
//     }

//     // Simulate guard movement with an obstacle at (r, c)
//     if (simulateWithObstacle(r, c)) {
//       validPositions++;
//     }
//   }
// }

// console.log(
//   `Number of valid positions for a new obstruction: ${validPositions}`
// );

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
  // private startRow: number = 0;
  // private startCol: number = 0;
  // private startDir: number = 0;

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
