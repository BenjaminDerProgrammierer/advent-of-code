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

  let iinput;
  iinput = input.split(`\n  \n  `);
  let iiinput = [];
  for (const text of iinput) {
    iiinput.push(text.split('\n  '));
  }
  solution = 0;
  let fst = 0;
  let snd = 0;
  let trd = 0;
  for (let i = 0; i <= iiinput.length; i++) {

    for (let j = 0; j <= iiinput.length; j++) {
       += parseInt(iiinput[i][j]);
    }
    if (sum > solution) solution = sum;
  }
  solution = (fst + snd + trd)
  //format output
  if (test && solution == getTestSolution()) {
    solution = 'Richtig';
  } else if (test) {
    solution = 'FALSCH: ' + String(solution);
  } else {
    solution = 'Lösung: ' + String(solution);
  }
  return String(solution);
}