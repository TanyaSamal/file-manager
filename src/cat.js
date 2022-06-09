import { createReadStream } from 'fs';

export const readFileContent = async (fileName) => {
  try {
    const content = await getFileContent(fileName);
    console.log(content);
  } catch (err) {
    if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};

function getFileContent(fileName) {
  return new Promise((resolve, reject) => {
    const readableStream = createReadStream(fileName);
    let data = '';

    readableStream.on('data', chunk => data += chunk.toString());
    readableStream.on('end', () => resolve(data));
    readableStream.on('error', (err) => reject(err));
  })
}
