const express = require('express');
const router = express.Router();
const { getOffices } = require('../controllers/officeController');

router.get('/', getOffices);

module.exports = router;
