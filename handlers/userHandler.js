const JSEncrypt = require('node-jsencrypt'),
  crypt = new JSEncrypt(),
  expiredTokenDate = 0.1 * 3600 * 1000 // 0.1 day
  tokenPublicKey =
    '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrRxLdvg03/1KX9xJAW0USP3pSqJTSkwEY3aQ2tphPkKmGAZxVPUgiNjyGxhplR6Q+YKKybmveL/TbhKEWCXRXcRkZVEQo3vG2SFozWcgJIFaCw7g6aU73hG3kYxb+uJsUPR7AUls/YECKeouCKEYgg+aqmJm0zgT+p3vBd/lNzwIDAQAB-----END PUBLIC KEY-----';

function login(req, res) {
  try {
    if (req.body.password === 'phillip') {
      crypt.setPublicKey(tokenPublicKey);
      let authToken = crypt.encrypt(
        JSON.stringify({
          expiredDate: new Date().getTime() + expiredTokenDate ,
        })
      )
      res.cookie('authToken', authToken);
      res.send({
        success: true,
        authToken: authToken ,
      });
    } else res.send({ success: false, message: 'Sai mật khẩu' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}

module.exports = {
  login,
};
