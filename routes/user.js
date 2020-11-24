const express = require('express'),
  router = express.Router(),
  userHandler = require('../handlers/userHandler');
router.post('/login', userHandler.login);
router.put('/change-pwd', userHandler.changePwd);

module.exports = router;
