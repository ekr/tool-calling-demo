import fs from "node:fs";
import readline from "node:readline";

export async function Chat(handler) {
  const inputArg = process.argv[2];
  const input = (inputArg && inputArg !== "-") ? fs.createReadStream(inputArg) : process.stdin;
  const isTTY = !!input.isTTY;

  const rl = readline.createInterface({
    input: input,
    output: process.stdout,
    terminal: isTTY
  });

  if (isTTY) {
    rl.setPrompt("User> ");
    rl.prompt();
  }

  for await (const line of rl) {
    if (line.trim() === "") {
        if (isTTY) rl.prompt();
        continue;
    }

    if (!isTTY) {
      // If not a TTY, we need to echo the prompt and the input line.
      console.log(`User> ${line}`);
    }

    const result = await handler(line);
    console.log(`Agent> ${result}`);
    
    if (isTTY) {
      rl.prompt();
    }
  }
}
