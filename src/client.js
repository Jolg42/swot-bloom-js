import { BloomFilter } from 'bloomfilter';
import serialisedFilter from './lib/bloom.json';
import checkEmail from './lib/checkEmail';

const bloom = new BloomFilter(serialisedFilter, 9);

export default checkEmail(bloom);
