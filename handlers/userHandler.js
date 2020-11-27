const JSEncrypt = require('node-jsencrypt'),
  crypt = new JSEncrypt(),
  expiredTokenDate = 0.1 * 3600 * 1000,
  defaultUser = 'admin',
  tokenPublicKey =
    '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrRxLdvg03/1KX9xJAW0USP3pSqJTSkwEY3aQ2tphPkKmGAZxVPUgiNjyGxhplR6Q+YKKybmveL/TbhKEWCXRXcRkZVEQo3vG2SFozWcgJIFaCw7g6aU73hG3kYxb+uJsUPR7AUls/YECKeouCKEYgg+aqmJm0zgT+p3vBd/lNzwIDAQAB-----END PUBLIC KEY-----',
  db = require('../models'),
  User = db.user,
  log = console.log,
  md5 = require('md5'),
  login = (req, res) => {
    try {
      User.findAll({
        where: {
          username: defaultUser,
          password: md5(req.body.password),
        },
        order: [['createdAt', 'DESC']],
      }).then((user) => {
        if (user.length === 0) {
          res.send({
            success: false,
            message: 'Mật khảu sai.',
          });
        } else {
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
        }
      });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  },
  changePwd = (req, res) => {
    try {
      log(req.body);
      User.findAll({
        where: {
          username: defaultUser,
          password: md5(req.body.password),
        },
        order: [['createdAt', 'DESC']],
      })
        .then((user) => {
          if (user.length === 0) {
            res.send({
              success: false,
              message: 'Mật khẩu sai.',
            });
            return;
          }
          let userId = user[0].id;
          User.update(
            { password: md5(req.body.newPassword) },
            {
              where: { id: userId },
            }
          ).then((num) => {
            log('num:%s', num);
            if (num[0] === 1) {
              res.send({
                success: true,
                message: 'Mật khẩu đổi thành công.',
              });
            } else {
              res.send({
                success: false,
                message: `Thông tin không có gì thay đổi`,
              });
            }
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message:
              err.message || 'Some error occurred while change password.',
          });
        });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  };

module.exports = {
  login,
  changePwd,
};
