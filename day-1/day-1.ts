export class Locations {
  constructor(public leftList: number[], public rightList: number[]) {}

  reorderListAscending(input: number[]): number[] {
    return input.sort((a, b) => a - b);
  }

  getDistance(valueA: number, valueB: number): number {
    return Math.abs(valueA - valueB);
  }

  getTotalDistance() {
    const sortedLeft = this.reorderListAscending(this.leftList);
    const sortedRight = this.reorderListAscending(this.rightList);

    const minLength = Math.min(sortedLeft.length, sortedRight.length);
    let totalDistance = 0;

    for (let i = 0; i < minLength; i++) {
      totalDistance += this.getDistance(sortedLeft[i], sortedRight[i]);
    }

    return totalDistance;
  }

  getSimilarity(listA: number[], listB: number[]): number[] {
    return listA.map((aValue) => {
      const matches = listB.filter((bValue) => bValue === aValue).length;
      return aValue * matches;
    });
  }

  getSimilarityScore(): number {
    return this.getSimilarity(this.leftList, this.rightList).reduce(
      (a, b) => a + b,
      0
    );
  }
}
