export class Reactor {
  public reports: number[][] = [];
  public hasDampened: boolean;

  constructor(input: string) {
    this.reports = input
      .split('\n')
      .map((report) => report.split(' ').map((level) => Number(level)));

    this.hasDampened = false;
  }

  checkLevelsIncrease(report: number[]) {
    const isSafe = report.every((level, i) => {
      if (i < report.length - 1) {
        return level < report[i + 1];
      }
      return true;
    });

    return isSafe;
  }

  checkLevelsDecrease(report: number[]): boolean {
    const isSafe = report.every((level, i) => {
      if (i < report.length - 1) {
        return level > report[i + 1];
      }
      return true;
    });

    return isSafe;
  }

  checkDifferenceIsBetweenOneAndThree(report: number[]): boolean {
    const isSafe = report.every((level, i) => {
      if (i < report.length - 1) {
        const diff = Math.abs(level - report[i + 1]);
        return diff > 0 && diff <= 3;
      }
      return true;
    });

    return isSafe;
  }

  dampenProblem(input: number[]) {
    const isSafe = input.some((_, i) => {
      const report = [...input];
      report.splice(i, 1);
      return (
        (this.checkLevelsIncrease(report) ||
          this.checkLevelsDecrease(report)) &&
        this.checkDifferenceIsBetweenOneAndThree(report)
      );
    });

    return isSafe;
  }

  count(): number {
    const safe = this.reports.filter((report, i) => {
      return this.dampenProblem(report);
    }).length;
    return safe;
  }
}
