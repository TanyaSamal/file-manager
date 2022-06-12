import { rm } from 'fs/promises';

export const removeFile = async (pathToFile) => {
  try {
    await rm(pathToFile);
  } catch (err) {
    if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};
