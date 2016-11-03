function Swot(cb, mOverN, k) {
  var walk = require('walk');
  var path = require('path');
  var BloomFilter = require('bloomfilter').BloomFilter;

  // default values give false postive rate of ~0.5% 
  mOverN = mOverN || 11;
  k = k || 8;

  var blacklist = {
    'si.edu': true,
    'america.edu': true
  };

  var bloom;

  function check(email) {
    var domain = email.split('@').reverse()[0];
    return blacklist[domain] === undefined && bloom.test(domain);
  }

  function fixPath(path, basePath) {
    return path.replace(basePath + '/', '').split('/').reverse().join('.');
  }

  function init() {
    var basePath = path.resolve(__dirname, '../domains');
    var walker = walk.walk(basePath, { followLinks: false });
    var domainCount = 0;
    var domains = [];

    walker.on('file', function (root, stat, next) {
      var domain = path.basename(stat.name, '.txt') + '.' + fixPath(root, basePath);
      domainCount++;
      domains.push(domain);
      next();
    });

    walker.on('end', function () {
      bloom = new BloomFilter(
        mOverN * domainCount,
        k
      );
      
      for(var i = 0; i < domains.length; i ++) {
        bloom.add(domains[i]);
      }

      if(cb) cb();

    });
  }

  init();
  return {
    check: check
  };
}


module.exports = Swot;
