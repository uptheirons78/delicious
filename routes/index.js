const express = require('express');
const router = express.Router();
//import storeController with all the different controller
const storeController = require('../controllers/storeController');
//import catchErrors object from errorHandlers
const { catchErrors } = require('../handlers/errorHandlers');
//use the homePage controller
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));
router.post('/add/:id', catchErrors(storeController.updateStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));


module.exports = router;
