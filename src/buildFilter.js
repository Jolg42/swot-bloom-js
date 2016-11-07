import fs from 'fs';
import { createFilter, serialise } from './lib/swot';

const mOverN = process.argv[2];
const k = process.argv[3];
let filterPromise;

if (!isNaN(mOverN) && !isNaN(k)) {
  filterPromise = createFilter(+mOverN, +k);
} else {
  filterPromise = createFilter();
}

filterPromise.then((bloom) => {
  fs.writeFile('./src/lib/bloom.json', serialise(bloom), (error) => {
    if (error) {
      console.error(`write error: '${error.message}'`);
    } else {
      console.log('Successfully generated bloom filter');
      if (!isNaN(mOverN) && !isNaN(k)) {
        console.log(`with m/n = ${mOverN} and k = ${k}`);
      } else {
        console.log('with m/n = 12 and k = 9');
      }
    }
  });
});
