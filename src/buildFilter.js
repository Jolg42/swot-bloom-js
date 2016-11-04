import fs from 'fs';
import { createFilter, serialise } from './lib/swot';

createFilter().then((bloom) => {
  fs.writeFile('./src/lib/bloom.json', serialise(bloom), (error) => {
    if (error) {
      console.error(`write error: '${error.message}'`);
    } else {
      console.log('Successfully generated bloom filter');
    }
  });
});
