const add = (a: number, b: number) => a + b;
const multiply = (a: number, b: number) => a * b;

type Equation = {
  fn: typeof add | typeof multiply;
  operands: number[];
};

const readIncorrectly = (
  memo: Equation[],
  line: string,
  lineIndex: number,
  lines: string[],
): Equation[] => {
  const matches: string[] = line.match(/\d+|[+*]/g) || [];

  if (!matches) {
    throw new Error("Oh no!");
  }

  matches.forEach((el, matchIndex) => {
    if (typeof memo[matchIndex] === "undefined") {
      memo[matchIndex] = {
        fn: add,
        operands: [],
      } as Equation;
    }

    if (lineIndex === lines.length - 1) {
      if (el === "*") {
        memo[matchIndex].fn = multiply;
      }
    } else {
      memo[matchIndex].operands.push(parseInt(el));
    }
  });

  return memo;
};

const readCorrectly = (lines: string[]): Equation[] => {
  let current: Equation = { fn: add, operands: [] };
  const equations = [];

  for (let i = lines[0].length - 1; i >= 0; i--) {
    const match = lines
      .map((str) => str[i])
      .join("")
      .match(/^\s*(?<number>\d+)\s*(?<operator>[*+])?\s*$/);
    if (!match || !match.groups) {
      continue;
    }

    current.operands.push(parseInt(match.groups.number));

    if (match.groups.operator) {
      current.fn = match.groups.operator === "*" ? multiply : add;

      equations.push(current);

      current = {
        fn: add,
        operands: [],
      };
    }
  }

  console.log(lines, equations);

  return equations;
};

export const cephalopodHomework = (
  input: string,
  correctly = false,
): number => {
  const lines = input.trim().split("\n");

  let equations = [];
  if (correctly) {
    equations = readCorrectly(lines);
  } else {
    equations = lines.reduce<Equation[]>(readIncorrectly, []);
  }

  return equations.reduce(
    (sum, equation) => sum + equation.operands.reduce(equation.fn),
    0,
  );
};
