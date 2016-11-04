const blacklist = {
  'si.edu': true,
  'america.edu': true,
};

export default filter => (email) => {
  const domain = email.split('@').reverse()[0];
  return blacklist[domain] === undefined && filter.test(domain);
};
