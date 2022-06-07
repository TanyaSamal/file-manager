import { resolve } from 'path';
import { access, stat } from 'fs/promises';

export const changeDirectory = async (startUrl, pathToDir) => {
  let newPath = resolve(startUrl, pathToDir);
  
  try {
    await access(newPath);
    const fsStat = await stat(newPath);
    newPath = fsStat.isDirectory() ? newPath : '';
    return newPath;
  } catch (err) {
    if (err) return '';
  }
}
