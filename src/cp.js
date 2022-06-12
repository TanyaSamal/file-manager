import { mkdir, stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { basename, join } from 'path';
import { access } from 'fs';

export const copyExistedFile = async (pathToFile, pathToNewDirectory) => {
  try{
    const fileStat = await stat(pathToFile);

    if (!fileStat.isFile()) {
      throw new Error('Invalid filename');
    }

    access(pathToNewDirectory, async (err) => {
        if (err) {
          try {
            await mkdir(pathToNewDirectory);
          } catch (err) {
            if (err) console.log('\x1b[31mOperation failed\x1b[0m');
          }
        }

        const readable = createReadStream(pathToFile);
        const writable = createWriteStream(join(pathToNewDirectory, basename(pathToFile)));

        readable.pipe(writable);
    });
  } catch (err) {
    if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};
