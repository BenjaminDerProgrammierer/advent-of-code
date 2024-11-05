// https://adventofcode.com/
const sessionCookie = "53616c7465645f5fc232990e3aaa21d2bb7162bbb0fa959c771eadc7a58acd96616e4aee1be4e3083db50b04aac7114c32cfc67e9b0586b78405d0c7e72e648d";
const elements = {
  year: document.getElementById("year") as HTMLInputElement, // number input
  day: document.getElementById("day") as HTMLInputElement, // number input
  part: document.getElementById("part") as HTMLInputElement, // Radio input
  test: document.getElementById("test") as HTMLInputElement, // Checkbox
  submit: document.querySelector("input[type='submit']") as HTMLInputElement, // Submit Button
  solution: document.getElementById("solution") as HTMLSpanElement, // Text output
};

let year = 2015;
let day = 1;
let part = 1;
let test = false;

elements.year.addEventListener("input", () => {
  if (elements.year.value == "") return;
  if (Number(elements.year.value) > 2099) {
    elements.year.value = "2099";
  }
  if (Number(elements.year.value) < 2015) {
    elements.year.value = "2015";
  }
  year = Number(elements.year.value);
});

elements.day.addEventListener("input", () => {
  if (elements.day.value == "") return;
  if (Number(elements.day.value) > 25) {
    elements.day.value = "25";
  }
  if (Number(elements.day.value) < 1) {
    elements.day.value = "1";
  }
  day = Number(elements.day.value);
});

elements.part.addEventListener("input", () => {
  part = Number(elements.part.value);
});

elements.test.addEventListener("input", () => {
  test = elements.test.checked;
});

elements.submit.addEventListener("click", submit);

async function submit() {
  console.log(
    `--- Year: ${year} Day: ${day}, Part: ${part}, Test: ${test} ---`
  );
  const { inputPath, testInputPath, testOutputPath, scriptPath } = getPath(
    year,
    day
  );

  // load files
  let input: string = "";
  let expected: string = "";
  let script: string = "";
  try {
    if (test) {
      input = await fetch(testInputPath).then((res) => res.text());
      expected = await fetch(testOutputPath).then((res) => res.text());
    } else {
      input = await getDayInput(year, day, sessionCookie);
    }
    script = await fetch(scriptPath).then((res) => res.text());
    if (
      script.startsWith("<!DOCTYPE html>") ||
      expected.startsWith("<!DOCTYPE html>") ||
      input.startsWith("<!DOCTYPE html>") ||
      /* find meta tags */ script.includes("<meta") ||
      expected.includes("<meta") ||
      input.includes("<meta")
    ) {
      throw new Error("404 - Script not found");
    }
  } catch (error) {
    console.log(`Error fetching input files: ${error}`);
    return;
  }
  console.log("Input:", input);
  let output: string = "";
  // try {
  console.log(script); // Ensure the script content is loaded correctly
  // script:
  // const day01 = {
  //   part1(input) {
  //   let instructions = input.split('');
  //   let floor = 0;
  //   for (let instruction of instructions) {
  //   instruction === '(' ? floor++ : floor--;
  //   }
  //   return floor;
  //   },
  //   part2(input) {
  //   let instructions = input.split('');
  //   let floor = 0;
  //   for (let i = 0; i < instructions.length; i++) {
  //   instructions[i] === '(' ? floor++ : floor--;
  //   if (floor === -1) {
  //   return i + 1;
  //   }
  //   }
  //   return -1;
  //   }
  //   };

  const module = await import(scriptPath);
  // Access part1 and part2 from the Day01 object within the module
  const part1 =
    module.part1 ||
    (() => {
      throw new Error("part1 function not defined");
    });
  const part2 =
    module.part2 ||
    (() => {
      throw new Error("part2 function not defined");
    });

  console.log("part1:", part1); // Verify if part1 is defined correctly
  console.log("part2:", part2); // Verify if part2 is defined correctly

  // Execute the correct part
  output = part === 1 ? part1(input) : part2(input);

  // Display the output
  console.log("Output:", output);
  if (test) {
    console.log("Expected:", expected);
    console.log("Test passed:", output === expected);
  }
  // } catch (error) {
  //   console.log("Error executing the function:", error);
  // }

  // try {
  //   console.log(script); // the script is being loaded correctly

  //   //FIXME: trying to load the script and execute the function... but it's not working
  //   let part1: any = ()=>{throw new Error("no part1 found")};
  //   let part2: any = ()=>{throw new Error("no part2 found")};

  //   // Use an IIFE to define part1 and part2 in the current scope
  //   (function () {
  //     eval(script);
  //   })();
  //   console.log(part1); // ()=>{throw new Error("no part1 found")}

  //   // if (part === 1) {
  //   //   output = eval(part1());
  //   // } else {
  //   //   output = part2();
  //   // }
  //   // console.log("SUCESS!");
  //   // console.log("Result:", output);
  //   // if (test) {
  //   //   console.log("Expected:", expected);
  //   //   console.log(`Test ${(output==expected)?"passed":"failed"}`)
  //   // }
  // } catch (error) {
  //   console.log(error);
  // }
  // try {
  //   if (test) {
  //     input = await fetch(testInputPath).then(res => res.text());
  //     expected = await fetch(testOutputPath).then(res => res.text());
  //   } else {
  //     input = await fetch(inputPath).then(res => res.text());
  //   }
  // } catch (error) {
  //   console.log(`Error fetching input files: ${error}`);
  //   return;
  // }

  // try { ///aaaaaaaah
  //   const program: string = await fetch(testInputPath).then(res => res.text());
  //   let part1: any = () => {};
  //   let part2: any = () => {};
  //   console.log(scriptPath, program);
  //   eval(program) // loads the functions
  //   if (part === 1) {
  //     output = part1(input);
  //   } else {
  //     output = part2(input);
  //   }
  // } catch (error) {
  //   console.log(`Error executing script: ${error}`);
  //   return;
  // }

  // if (test) {
  //   console.log(`RESULT: ${output}`);
  //   console.log(`EXPECTED: ${expected}`);
  //   console.log(`Test passed: ${output === expected}`);
  // } else {
  //   console.log(`Result: ${output}`);
  // }
}
function getPath(
  year: number,
  day: number
): {
  inputPath: string;
  testInputPath: string;
  testOutputPath: string;
  scriptPath: string;
} {
  let paddedDay = String(day).padStart(2, "0");
  return {
    inputPath: `https://adventofcode.com/${year}/day/${day}/input`,
    testInputPath: `./days/${year}/day${paddedDay}/test.in`,
    testOutputPath: `./days/${year}/day${paddedDay}/test.out`,
    scriptPath: `./dist/days/${year}/day${paddedDay}/day${paddedDay}.js`,
  };
}

let originalConsole = console;
console = {
  ...originalConsole,
  log: function (...args: any[]) {
    let text = args.join(" ");
    elements.solution.innerHTML += `<br>${text.replace(/\n/g, "<br>")}`;
    originalConsole.log(text);
  },
};

function getDayInput(year: any, day: any, session: any) {
  const url = `https://adventofcode.com/${+year}/day/${+day}/input`;
  return downloadContent(url, session, "");
}

async function downloadContent(url: any, session: any, postPayload: any) {
  const headers = { Cookie: `session=${session}` };
  const options = { headers };
  if (postPayload) {
    Object.assign(options, {
      body: postPayload,
      method: "POST",
    });
    Object.assign(options.headers, {
      "content-type": "application/x-www-form-urlencoded",
    });
  }
  const response = await fetch(url, options);
  if (response.status >= 400) {
    throw new Error(
      [
        `Failed to download from ${url} (${response.status})`,
        `Description: ${cleanError(await response.text())}`,
      ].join("\n"),
    );
  }
  return response.text();
}

function cleanError(s: any) {
  return s.match(/<h1>(.*)<\/h1>/)?.[1] || s;
}
