export const parsePath = (inputLine) => {
  const inputArgs = [];
  let command = '';

  if (inputLine.includes(' ')) {
    command = inputLine.slice(0, inputLine.indexOf(' '));
    inputLine = `${inputLine.slice(inputLine.indexOf(' ') + 1).trim()} `;
  } else {
    command = inputLine;
    inputLine = '';
  }
  
  let idx = 0;
  const len = inputLine.length;

  while (idx < len && inputLine.trim().length !== 0) {
    if (inputLine[0] !== '"') {
      idx = inputLine.indexOf(' ');
      inputArgs.push(inputLine.slice(0, idx));
      inputLine = `${inputLine.slice(idx).trim()} `;
    } else {
      idx = inputLine.indexOf('"', 1);
      inputArgs.push(inputLine.slice(1, idx));
      inputLine = `${inputLine.slice(idx + 1).trim()} `;
    }
  }

  return {
    command,
    inputArgs
  }
}
