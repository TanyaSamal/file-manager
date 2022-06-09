import { rename } from 'fs/promises';
import { dirname, join } from 'path';

export const renameFile = async (pathToFile, newName) => {
  try {
    if (!newName || !newName.includes('.')) throw new Error('Incorrect input');
    const newFilePath = join(dirname(pathToFile), newName);
    console.log(newFilePath);
    await rename(pathToFile, newFilePath);
  } catch (err) {
    if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};
