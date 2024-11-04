// https://adventofcode.com/


const elements = {
  year: document.getElementById('year') as HTMLInputElement, // number input
  day: document.getElementById('day') as HTMLInputElement, // number input
  part: document.getElementById('part') as HTMLInputElement, // Radio input
  test: document.getElementById('test') as HTMLInputElement, // Checkbox
  submit: document.querySelector("input[type='submit']") as HTMLInputElement, // Submit Button
  solution: document.getElementById('solution') as HTMLSpanElement, // Text output
}

let day = 1;
let part = 1;
let test = false;
let year = 2015;

elements.year.addEventListener('input', () => {
  if (elements.year.value == "") return;
  if (Number(elements.year.value) > 2099) {
    elements.year.value = '2099';
  }
  if (Number(elements.year.value) < 2015) {
    elements.year.value = '2015';
  }
  year = Number(elements.year.value);
});

elements.day.addEventListener('input', () => {
  if (elements.day.value == "") return;
  if (Number(elements.day.value) > 25) {
    elements.day.value = '25';
  }
  if (Number(elements.day.value) < 1) {
    elements.day.value = '1';
  }
  day = Number(elements.day.value);
});

elements.part.addEventListener('input', () => {
  part = Number(elements.part.value);
});

elements.test.addEventListener('input', () => {
  test = elements.test.checked;
});

elements.submit.addEventListener('click', submit);

function submit() {
  console.log(`Year: ${year} Day: ${day}, Part: ${part}, Test: ${test}`);
  //TODO: import both parts of the day, and the inputs, execute the correct part with the correct input and log the result
  //TODO: catch error if the module is not found, just log it as not found and continue (execute as much as possible [input/testinput are only needed for their respective values of the test variable. the parts are only needed for their respective values of the part variable]) 
}
function getPath(year: number, day: number, part: number):
{ input: string; testInput: string; testOutput: string; script: string; } {
  return {
    input: `./days/${year}/day${day}/input.in`,
    testInput: `./days/${year}/day${day}/test.in`,
    testOutput: `./days/${year}/day${day}/test.out`,
    script: `./days/${year}/day${day}/day${day}.ts`,
  }
}

let originalConsole = console;
console = {
  ...originalConsole,
  log: function(...args: any[]) {
    let text = args.join(' ');
    elements.solution.innerHTML += `<br>${text}`;
    originalConsole.log(text);
  }
};
