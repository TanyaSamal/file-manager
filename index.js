import { homedir, EOL } from 'os';
import { resolve } from 'path';
import readline from 'readline';

import { up } from './src/up.js';
import { changeDirectory } from './src/cd.js';
import { showFiles } from './src/ls.js';
import { readFileContent } from './src/cat.js';
import { addNewFile } from './src/add.js';
import { renameFile } from './src/rn.js';
import { copyExistedFile } from './src/cp.js';
import { moveFile } from './src/mv.js';
import { removeFile } from './src/rm.js';

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
  const inputArgs = [...inputArray];

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
    case 'cat':
      await readFileContent(resolve(startDirectory, inputArgs[0]));
      break;
    case 'add':
      await addNewFile(resolve(startDirectory, inputArgs[0]));
      break;
    case 'rn':
      await renameFile(resolve(startDirectory, inputArgs[0]), inputArgs[1]);
      break;
    case 'cp':
      await copyExistedFile(resolve(startDirectory, inputArgs[0]), resolve(startDirectory, inputArgs[1]));
      break;
    case 'mv':
      await moveFile(resolve(startDirectory, inputArgs[0]), resolve(startDirectory, inputArgs[1]));
      break;
    case 'rm':
      await removeFile(resolve(startDirectory, inputArgs[0]));
      break;
    default:
      console.log(`\x1b[31mInvalid input ${command}\x1b[0m`);
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
  console.log('\x1b[31mIncorrect --username argument\x1b[0m');
  process.exit();
}
