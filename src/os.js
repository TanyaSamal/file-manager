import { EOL, cpus, homedir, userInfo, arch } from "os";

export const printOsInfo = (option) => {
  switch (option) {
    case '--EOL':
      console.log(JSON.stringify(EOL));
      break;
    case '--cpus':
      const info = cpus().map(({model, speed}) => ({model, speed: `${speed / 1000}GHz`}));
      console.table(info);
      break;
    case '--homedir':
      console.log(homedir());
      break;
    case '--username':
      console.log(userInfo().username);
      break;
    case '--architecture':
      console.log(arch());
      break;
    default:
      console.log('\x1b[31mOperation failed\x1b[0m');
      break;
  }
}
