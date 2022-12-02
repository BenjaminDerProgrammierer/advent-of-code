import { readFileSync } from 'fs';
import { logError, logHighlight, logSuccess } from '../../functions/log';
const log = console.log;

export function part1(input: string): string | number {
  const calories = getCalories(input);
  return Math.max(...calories);
}

export function part2(input: string): string | number {
  const calories = getCalories(input);
  return calories.sort((a, b) => b - a).slice(0, 3).reduce((prev, curr) => prev + curr, 0);
}

function getCalories(input: string): number[] {
  const elves = splitInput(input);
  const calories = elves.map((e) =>
    e
      .split(/\r?\n/)
      .map((c) => parseInt(c))
      .reduce((prev, curr) => prev + curr, 0)
  );
  return calories;
}

function splitInput(input: string): string[] {
  return input.split(/\r?\n\r?\n/);
}

try {
  const input = readFileSync('./2022/01/input.txt', 'utf-8');
  const solution1 = part1(input);
  const solution2 = part2(input);

  logHighlight('*** Day 01 ***');
  console.time('Duration part 1');
  logSuccess('Part 1:', solution1);
  console.timeEnd('Duration part 1');

  console.time('Duration part 2');
  logSuccess('Part 2:', solution2);
  console.timeEnd('Duration part 2');
} catch (e: any) {
  logError(e);
}
