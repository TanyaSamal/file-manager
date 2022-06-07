import { homedir, EOL } from 'os';
import readline from 'readline';

import { up } from './src/up.js';
import { changeDirectory } from './src/cd.js';
import { showFiles } from './src/ls.js';

let startDirectory = homedir();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `You are currently in ${ startDirectory + EOL}`
});

const setDirectory = async (newDirName) => {
  if (newDirName === '..') startDirectory = up(startDirectory);
  else {
    const newPath = await changeDirectory(startDirectory, newDirName);
    if (newPath !== '') {
      startDirectory = newPath;
    } else {
      console.log('\x1b[31mOperation failed\x1b[0m');
    }
  }
}

const switchOperation = async (inputLine) => {
  const inputArray = inputLine.split(' ');
  const command = inputArray.shift();
  const inputArgs = inputArray;

  switch (command) {
    case 'up':
      startDirectory = up(startDirectory);
      break;
    case 'cd':
      await setDirectory(inputArgs[0]);
      break;
    case 'ls':
      await showFiles(startDirectory);
      break;
    default:
      console.log(`Invalid input ${command}`);
      break;
  }

  rl.setPrompt(`You are currently in ${ startDirectory + EOL}`);
}

const start = (userName) => {
  rl.prompt();

  rl.on('line', async (line) => {
    await switchOperation(line.trim());
    rl.prompt();
  }).on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}!`);
    process.exit(0);
  });
}

const argument = process.argv[2];
const startIndex = argument.indexOf('=');
if (startIndex !== -1) {
  const userName = argument.slice(startIndex + 1);
  console.log(`Welcome to the File Manager, ${userName}!`);
  start(userName);
} else {
  console.log('Incorrect --username argument');
  process.exit();
}
