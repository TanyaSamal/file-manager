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
      if (err) console.log('Operation failed');
  }
};
