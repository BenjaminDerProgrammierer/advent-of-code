import { getInput } from './input';
import { getTestInput, getTestSolution } from './testinput';

export function aoc(part: boolean, test: boolean): string {
  let input;
  let solution;
  if (test) {
    input = getTestInput();
  } else {
    input = getInput();
  }

  const numbers: number[] = [];
  for (const text of input) {
    numbers.push(parseInt(text));
  }

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 2020) {
        solution = numbers[i] * numbers[j];
      }
    }
  }

  //format output
  if (test && solution == getTestSolution()) {
    solution = 'Richtig';
  } else if (test) {
    solution = 'FALSCH: ' + solution;
  } else {
    solution = 'Lösung: ' + solution;
  }
  return solution;
}
