// https://adventofcode.com/2015/day/2
// https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABABwIYCcoEYAUMzIhQBciAzlOvgOYCUpYIAtgEYCm6iA3gFCL+IANmyiIAJjCZswZeDMQBeRPkJQAdGWSCYUHAHIAOmD201TVMhxjFAPnEatO-QA8TZizgByzdulq0Abh4+AWFRAHd0C0VEAAYggURgOE4cMMQWOGdEOGBxSWlZBDJabhDE-nTBGMznAG1YgF0EisqRRHCarLqsZvKK9IALLvqAJj7+xPTZMTYsGMGAKkEW1umYWdGY8MXB1YH2mbYAZhjBRfCgydDD80FhCgBlAElZmIBZVChBs3wcI6wABpyBs2KNgUdjrRrm1RGQQOhgKgIGwYqNFgDEABqRDoo5bHF40HHGEdKLIbFKeGI5GonFkO4PKAvWb9AC+-XQIgRSEiFiCHJ4oEgsAQKAwUFGeAIRFIFCoYDoDB8HDKU3aEikMjkZBiKiIDm0ukMxlM5ks1gUdjEhqcelcZo83lYHH8+366SoLEySCU8X6yVS6VqOTymsKOtKvFasKEIwafRjQnanSUtR6iZjQ3j4yuSemjLYFAAomJqKilJ9vr8wGlgeFgYNAqTpmwIAgxI9CyWy2x9okYHl-t2oKXy4olIIo6TEmQ2x2u6h7kXR72Pl8fkw-g3EE3+wI2Yg2II58ohwyl0yxxWlOFp0nZ-OwJ2R9f19Wt7XBI3m0nD8fT2jB9+Dndtn0XZce3HSsNxrHAdynfd+A5fN2kyVMhAuXYkOTURkC5OcwCgAAlGBvTFJQtkWchXzXQlEGo0CF1o8scK9H1KQyOBOhxfCi2kEiyJ9fYUIEMCyDgYQ1EEOBqBwdiEF-AQuSgHlEAUsABR4IA

function part1(input: string): number {
    let dimensions = input.split('\n').map(d => d.split('x').map(Number));

    let wrap = 0;
    for (let box of dimensions) {
        let l = box[0];
        let w = box[1];
        let h = box[2];

        let side1 = h*l;
        let side2 = w*h;
        let side3 = l*w;

        let smallestSIde = Math.min(side1, side2, side3)
        let surface = 2*side1 + 2*side2 + 2*side3
        wrap += surface + smallestSIde
    }
    return wrap;
}

function part2(input: string): number {
    let dimensions = input.split('\n').map(d => d.split('x').map(Number));
    
    let ribbon = 0;
    for (let box of dimensions) {
        let l = box[0];
        let w = box[1];
        let h = box[2];

        let smallestEdge = Math.min(l, w, h);
        let secondSmallestEdge;
        if (smallestEdge == l) {
            secondSmallestEdge = Math.min(w, h);
        } else if (smallestEdge == w) {
            secondSmallestEdge = Math.min(l, h);
        } else {
            secondSmallestEdge = Math.min(w, l);
        }
        let bow = l*w*h;
        let presentRibbon = 2 * smallestEdge + 2 * secondSmallestEdge;
        ribbon += bow + presentRibbon;
    }
    console.log(ribbon);
    return ribbon;
}