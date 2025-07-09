type EquationData = {
  target: number;
  numbers: number[];
};
export class Equation implements EquationData {
  readonly target: number;
  readonly numbers: number[];

  constructor(equationString: string) {
    const [target, ...numbers] = equationString
      .replace(':', '')
      .split(' ')
      .map(Number);

    this.target = target;
    this.numbers = numbers;
  }
}

export function validateEquation(target: number, numbers: number[]): boolean {
  function evaluateCombination(index: number, current: number): boolean {
    if (index === numbers.length) return current === target;

    const next = numbers[index];
    return (
      evaluateCombination(index + 1, current + next) ||
      evaluateCombination(index + 1, current * next) ||
      evaluateCombination(index + 1, Number(`${current}${next}`))
    );
  }

  return evaluateCombination(1, numbers[0]);
}

export function getTotal(input: string[]): number {
  let result: number = 0;

  for (const equation of input) {
    const { target, numbers } = new Equation(equation);

    if (validateEquation(target, numbers)) result += target;
  }

  return result;
}
