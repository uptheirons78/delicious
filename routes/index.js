const express = require('express');
const router = express.Router();
//import storeController with all the different controller
const storeController = require('../controllers/storeController');

//use the homePage controller
router.get('/', storeController.homePage);

module.exports = router;
