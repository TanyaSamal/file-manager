import { readdir } from 'fs/promises';

export const showFiles = async (folder) => {
  const listArr = [];

  try {
      const files = await readdir(folder, { withFileTypes: true });

      for (const file of files) {
        listArr.push(`${file.name}`);
      }

      console.log(listArr);
  } catch (err) {
      if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};
