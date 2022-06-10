import { mkdir } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { basename, join } from 'path';
import { access } from 'fs';

export const copyExistedFile = async (pathToFile, pathToNewDirectory) => {
    access(pathToNewDirectory, async (err) => {
      try {
        if (!basename(pathToFile).includes('.')) {
          throw new Error('Invalid filename');
        }

        if (err) {
          await mkdir(pathToNewDirectory);
        }

        const readable = createReadStream(pathToFile);
        const writable = createWriteStream(join(pathToNewDirectory, basename(pathToFile)));

        readable.pipe(writable);

      } catch (err) {
        if (err) console.log('\x1b[31mOperation failed\x1b[0m');
      }
    });
};
