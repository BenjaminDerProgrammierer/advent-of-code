export function part1(input: string): number {
    let instructions: string[] = input.split('');
    let floor: number = 0;
    for (let instruction of instructions) {
        instruction === '(' ? floor++ : floor--;
    }
    return floor;
}