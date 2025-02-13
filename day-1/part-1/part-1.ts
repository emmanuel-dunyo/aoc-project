import fs from 'fs';
import path from 'path';

export class List {
  private leftList: number[] = [];
  private rightList: number[] = [];

  readList() {
    const filePath = path.resolve(__dirname, 'input.txt');
    const data = fs.readFileSync(filePath, 'utf-8');

    const lines = data.split('\n');

    lines.map((line) => {
      const numbers = line.split(/\s+/);
      const firstNumber = numbers[0];
      const secondNumber = numbers[1];

      this.leftList.push(Number(firstNumber));
      this.rightList.push(Number(secondNumber));
    });
  }

  getDistance() {
    const sortedLeft = this.leftList.sort((a, b) => a - b);
    const sortedRight = this.rightList.sort((a, b) => a - b);

    const minLength = Math.min(sortedLeft.length, sortedRight.length);
    let totalDistance = 0;

    for (let i = 0; i < minLength; i++) {
      totalDistance += Math.abs(sortedLeft[i] - sortedRight[i]);
    }

    return totalDistance;
  }

  getSimilarity() {
    let score = 0;

    for (let i = 0; i < this.leftList.length; i++) {
      const matches = this.rightList!.filter(
        (n) => n == this.leftList[i]
      ).length;

      score += this.leftList[i] * matches;
    }
  }
}
