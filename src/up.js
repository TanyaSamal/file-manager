import { sep } from 'path';

export const up = (currentDirName) => {
  const dirArray = currentDirName.split(sep);
  if (dirArray.length > 1) {
    dirArray.pop();
    currentDirName = (dirArray.length == 1) ? `${dirArray[0] + sep}` : dirArray.join(sep);
  }
  return currentDirName;
}
