import { createReadStream } from 'fs';

export const readFileContent = async (fileName) => {
  try {
    const readableStream = createReadStream(fileName);
    readableStream.pipe(process.stdout);
  } catch (err) {
    if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};
