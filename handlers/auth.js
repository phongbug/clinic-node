const JSEncrypt = require('node-jsencrypt'),
  crypt = new JSEncrypt(),
  tokenPrivateKey =
    '-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgQCrRxLdvg03/1KX9xJAW0USP3pSqJTSkwEY3aQ2tphPkKmGAZxVPUgiNjyGxhplR6Q+YKKybmveL/TbhKEWCXRXcRkZVEQo3vG2SFozWcgJIFaCw7g6aU73hG3kYxb+uJsUPR7AUls/YECKeouCKEYgg+aqmJm0zgT+p3vBd/lNzwIDAQABAoGBAIQ04VguKg/uUjeg7AKnMMKsIuSI4g9Ej5U9CFN/UEQiOuiId77IBdT6nm+9nIRO73WCrDMkzrh7tfp3/st+0sCklR6IINTFH1+p9552qSDru6WpbIPsEK70yD6Cb8gfEC8PGQh1LRgzpLFMCGVcixuTRfbL3gXc2ZUmh+xmYMXBAkEA27ubu0MmMko3K/n02EU+Cij/fmlcnqkYblkDQxKJVQ3pmgVCmD4wfm2byT2TwbTPs+Rqp3nVnlR/RNJsDJESYQJBAMeMFTd6wOhB1d93HFxWgAYL/AA3B3znc5TxxxW7mn5v0c/uTR52UefoRfBDxxhqItCeTs+NsB5PIw3r6T95ri8CQHlr/4+IeLf7iOdVNba49KJ6q0y4fkTynhyENag/uwH0MS06UOV+ICANA7Q9wcOd3dTDmSg4zBG1Ear/OFPtaqECQC1gboayNGHcbr0lQd7BkNVPLlwCJ4LAwyjQnjwT8DrmRKjrAMB3mYKJ8DWFxCWKJSaZiURrbOxHhKoqxly31+MCQGDwutUtAE6q8E1hZ/+/tqr4fyG5vFW4EYXbeXcYPM6h+PoSBFSPaG/EAGfNmxPiFRll7ODBoHMHei/XXPlAHKg=-----END RSA PRIVATE KEY-----',
  isAuthenticated = (token) => {
    if (!token) return false;
    crypt.setKey(tokenPrivateKey);
    let decyptedData = crypt.decrypt(token);
    log(decyptedData);
    if (decyptedData) {
      let d1 = new Date().getTime(),
        d2 = new Date(JSON.parse(decyptedData).expiredDate).getTime();
      return d2 - d1 <= 24 * 3600 * 1000;
    }
    return false;
  };

module.exports = { isAuthenticated };
