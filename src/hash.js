import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

export const calcHash = async (pathToFile) => {
  
  try {
    const fileBuffer = await readFile(pathToFile);
    const hashSum = createHash('sha256');
    
    hashSum.update(fileBuffer);

    console.log(hashSum.digest('hex'));
  } catch (err) {
    if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};
