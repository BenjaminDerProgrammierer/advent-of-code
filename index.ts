//add dey

import { aoc } from './2Day1/Part2';

const textInput = document.getElementById('day') as HTMLInputElement;
const swapButton = document.getElementById('swap') as HTMLButtonElement;
const loadButton = document.getElementById('load') as HTMLButtonElement;
const solutionSpan = document.getElementById('solution') as HTMLSpanElement;
const buttonTextSpan = document.getElementById('test') as HTMLSpanElement;

let day: number;
let part = 1;

buttonTextSpan.innerHTML = 'click LOAD';
loadButton.addEventListener('click', () => {
  day = parseInt(textInput.value);
  //console.log(day);
  load();
});
swapButton.addEventListener('click', () => {
  part++;
  load();
});

function load() {
  part === 5 ? (part = 1) : (part = part);
  let aoctest: boolean;
  let aocpart: boolean;
  let partString: string;
  switch (part) {
    case 1:
      aoctest = true;
      aocpart = false;
      partString = 'TEST, Part 1';
      break;
    case 2:
      aoctest = false;
      aocpart = false;
      partString = 'NORMAL, Part 1';
      break;
    case 3:
      aoctest = true;
      aocpart = true;
      partString = 'TEST, Part 2';
      break;
    case 4:
      aoctest = false;
      aocpart = true;
      partString = 'NORMAL, Part 2';
      break;
  }
  buttonTextSpan.innerHTML = String(partString);
  solutionSpan.innerHTML = String(aoc(aocpart, aoctest));
}
