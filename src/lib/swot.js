import walk from 'walk';
import path from 'path';
import { BloomFilter } from 'bloomfilter';

const fixPath = (pathToFix, basePath) =>
  pathToFix.replace(`${basePath}/`, '').split('/').reverse().join('.');

// default values give false postive rate of ~0.5%
export const createFilter = (mOverN = 12, k = 9) => {
  let bloom;
  const basePath = path.resolve(__dirname, '../../domains');
  const walker = walk.walk(basePath, { followLinks: false });
  let domainCount = 0;
  const domains = [];

  walker.on('file', (root, stat, next) => {
    const domain = `${path.basename(stat.name, '.txt')}.${fixPath(root, basePath)}`;
    domainCount += 1;
    domains.push(domain);
    next();
  });

  const bloomPromise = new Promise((resolve, reject) => {
    walker.on('end', () => {
      bloom = new BloomFilter(
        mOverN * domainCount,
        k
      );

      domains.forEach((domain) => { bloom.add(domain); });
      resolve(bloom);
    });

    walker.on('error', (err) => {
      reject(err);
    });
  });

  return bloomPromise;
};

export const serialise = filter => JSON.stringify([...filter.buckets]);
