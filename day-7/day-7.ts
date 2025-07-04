export function formatEquationToArray(equation: string): Array<number> {
  return equation.replace(':', '').split(' ').map(Number);
}

export function validateEquation(target: number, numbers: number[]): boolean {
  function evaluateCombinations(index: number, current: number): boolean {
    if (index === numbers.length) return current === target;

    const next = numbers[index];
    return (
      evaluateCombinations(index + 1, current + next) ||
      evaluateCombinations(index + 1, current * next)
    );
  }

  return evaluateCombinations(1, numbers[0]);
}

export function getTotal(input: string[]): number {
  let result: number = 0;

  for (const equation of input) {
    const equationArray = formatEquationToArray(equation);
    const target = equationArray[0];
    const numbers = equationArray.slice(1);

    if (validateEquation(target, numbers)) result += target;
  }

  return result;
}

export function validateWithConcat(target: number, numbers: number[]): boolean {
  return false;
}
