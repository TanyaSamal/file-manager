import { copyExistedFile } from './cp.js';
import { rm } from 'fs/promises';

export const moveFile = async (pathToFile, pathToNewDirectory) => {
  try {
    await copyExistedFile(pathToFile, pathToNewDirectory);
    await rm(pathToFile);
  } catch (err) {
    if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};
