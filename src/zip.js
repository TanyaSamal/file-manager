import { pipeline }  from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compress = async (fileToCompress, archive) => {
  try {
    await pipeline(
      createReadStream(fileToCompress),
      createBrotliCompress(),
      createWriteStream(archive)
    );
    console.log('File has been compressed');
  } catch (err) {
      if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};

export const decompress = async (archive, fileName) => {
  try {
    await pipeline(
      createReadStream(archive),
      createBrotliDecompress(),
      createWriteStream(fileName)
    );
    console.log('File has been decompressed');
  } catch (err) {
      if (err) console.log('\x1b[31mOperation failed\x1b[0m');
  }
};
