import { getInput } from './input';
import { getTestInput, getTestSolution1, getTestSolution2 } from './testinput';

export function aoc(part: boolean, test: boolean): string {
  let input;
  let solution;
  let testsolution;
  solution = 0;

  if (test) {
    input = getTestInput().split(`\n  \n  `);
  } else {
    input = getInput().split(`\n  \n  `);
  }
  let inputarray = [];
  for (const text of input) {
    inputarray.push(text.split('\n  '));
  }
  //PARTS
  /* PART 1 */ if (!part) {
    testsolution = getTestSolution1();

    for (const i of inputarray) {
      let sum = 0;
      for (const j of inputarray[i]) {
        sum += parseInt(inputarray[i][j]);
      }
      if (sum > solution) solution = sum;
    }

    /*PART 2 */
  } else {
    testsolution = getTestSolution2();

    let fst = 0;
    let snd = 0;
    let trd = 0;

    for (const i of inputarray) {
      let sum = 0;
      for (const j of inputarray[i]) {
        sum += parseInt(inputarray[i][j]);
      }
      if (sum > fst) {
        trd = snd;
        snd = fst;
        fst = sum;
      } else if (sum > snd) {
        trd = snd;
        snd = sum;
      } else if (sum > trd) {
        trd = sum;
      }
    }
    solution = fst + snd + trd;
  }
  //format output
  if (test && solution == testsolution) {
    solution = 'Richtig';
  } else if (test) {
    solution = 'FALSCH: ' + String(solution);
  } else {
    solution = 'Lösung: ' + String(solution);
  }
  return String(solution);
}
