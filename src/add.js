import { writeFile } from 'fs/promises';

export const addNewFile = async (fileName) => {
  try {
    if (!fileName.includes('.')) throw new Error('Invalid filename');
    await writeFile(fileName, '');
  } catch (err) {
    if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};
