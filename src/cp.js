import { copyFile, mkdir } from 'fs/promises';
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

        await copyFile(pathToFile, join(pathToNewDirectory, basename(pathToFile)));

      } catch (err) {
        if (err) console.log('\x1b[31mOperation failed\x1b[0m');
      }
    });
};
