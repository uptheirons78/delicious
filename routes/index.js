const express = require('express');
const router = express.Router();
//import storeController with the all different controller
const storeController = require('../controllers/storeController');

//use the homePage controller
router.get('/', storeController.homePage);

module.exports = router;
