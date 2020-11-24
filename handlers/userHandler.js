const { use } = require('../routes');

const JSEncrypt = require('node-jsencrypt'),
  crypt = new JSEncrypt(),
  expiredTokenDate = 0.2 * 3600 * 1000,
  defaultUser = 'admin',
  tokenPublicKey =
    '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrRxLdvg03/1KX9xJAW0USP3pSqJTSkwEY3aQ2tphPkKmGAZxVPUgiNjyGxhplR6Q+YKKybmveL/TbhKEWCXRXcRkZVEQo3vG2SFozWcgJIFaCw7g6aU73hG3kYxb+uJsUPR7AUls/YECKeouCKEYgg+aqmJm0zgT+p3vBd/lNzwIDAQAB-----END PUBLIC KEY-----',
  db = require('../models'),
  User = db.user,
  log = console.log,
  md5 = require('md5'),
  login = (req, res) => {
    try {
      if (req.body.password === 'phillip') {
        crypt.setPublicKey(tokenPublicKey);
        let authToken = crypt.encrypt(
          JSON.stringify({
            expiredDate: new Date().getTime() + expiredTokenDate,
          })
        );
        res.cookie('authToken', authToken);
        res.send({
          success: true,
          authToken: authToken,
        });
      } else res.send({ success: false, message: 'Sai mật khẩu' });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  },
  changePwd = (req, res) => {
    try {
      log(req.body)
      res.send({ success: false, message:' error.message '});
      // user
      //   .findOne({
      //     where: {
      //       username: defaultUser,
      //       password: md5(req.body.password),
      //     },
      //   })
      //   .then((user) => {
      //     if (user.length == 0) {
      //       res.send({
      //         success: false,
      //         message: 'Mật khảu sai.',
      //       });
      //       return;
      //     }
      //     let userId = user.id;
      //     user
      //       .update(req.body.password, {
      //         where: { id: userId },
      //       })
      //       .then((num) => {
      //         log('num:%s', num);
      //         if (num[0] === 1) {
      //           res.send({
      //             success: true,
      //             message: 'Mật khảu đổi thành công.',
      //           });
      //         } else {
      //           res.send({
      //             success: false,
      //             message: `Thông tin không có gì thay đổi`,
      //           });
      //         }
      //       });
      //   })
      //   .catch((err) => {
      //     res.status(500).send({
      //       success: false,
      //       message:
      //         err.message || 'Some error occurred while change password.',
      //     });
      //   });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  };

module.exports = {
  login,
  changePwd,
};
