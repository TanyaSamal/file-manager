import { createWriteStream } from 'fs';

export const addNewFile = async (fileName) => {
  try {
    if (!fileName.includes('.')) throw new Error('Invalid filename');

    await addFile(fileName);

    console.log('File has been created');
  } catch (err) {
    if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};

function addFile(fileName) {
  return new Promise((resolve, reject) => {
    const writableStream = createWriteStream(fileName, {flags: "wx"});

    writableStream.on('close', () => resolve());
    writableStream.on('error', () => reject());

    writableStream.close();
  });
}
