import { createHash } from 'crypto';
import { createReadStream } from 'fs';

export const calcHash = async (pathToFile) => {
  try {
    const hash = await getSHA(pathToFile);
    console.log(hash);
  } catch (err) {
    if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};

function getSHA(pathToFile) {
  return new Promise((resolve, reject) => {
    let stream = createReadStream(pathToFile);
    let hash = createHash('sha256');

    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}