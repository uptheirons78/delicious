const express = require('express');
const router = express.Router();
//import storeController with all the different controller
const storeController = require('../controllers/storeController');

//use the homePage controller
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.post('/add', storeController.createStore);

module.exports = router;
