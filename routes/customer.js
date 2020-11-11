const express = require('express'),
  router = express.Router(),
  customerHandler = require('../handlers/customerHandler');

router.post('/create', customerHandler.create);
router.post('/update', customerHandler.update);
router.get('/list', customerHandler.list);
router.get('/delete/:id', customerHandler.deleteCustomer);

module.exports = router;
