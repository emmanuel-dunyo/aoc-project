export function calculateMulInstructions(input: string): number {
  const pattern = /don't\(\)|do\(\)|mul\([0-9]{1,3},[0-9]{1,3}\)/g;

  const instructions = input.match(pattern) || [];
  let validInstructions: string[] = [];
  let allow = true;
  for (let index = 0; index < instructions.length; index++) {
    const doCondition = instructions[index] === 'do()';
    const doNotCondition = instructions[index] === `don't()`;

    if (doCondition) {
      allow = true;
    }
    if (doNotCondition) {
      allow = false;
    }

    if (allow && !doCondition) {
      validInstructions.push(instructions[index]);
    }
  }

  const sum = validInstructions
    .map((x) => {
      const instruction = x
        .substring(4, x.length - 1)
        .split(',')
        .map((n) => Number(n));
      const mul = instruction.reduce((a, b) => a * b, 1);
      return mul;
    })
    .reduce((a, b) => a + b, 0);

  return sum || 0;
}
