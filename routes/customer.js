const express = require('express'),
  router = express.Router(),
  customerHandler = require('../handlers/customerHandler');
  
router.post('/create', customerHandler.create);
router.post('/update', customerHandler.update);
router.get('/list', customerHandler.list);

module.exports = router;
