const express = require('express'),
  router = express.Router(),
  customerHandler = require('../handlers/customerHandler');
router.post('/create', customerHandler.create);

module.exports = router;
