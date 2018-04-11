const mongoose = require('mongoose');
const Store = mongoose.model('Store');
// Multer is a node.js middleware for handling multipart/form-data,
// which is primarily used for uploading files.
const multer = require('multer');
//useful package for resizing photos
const jimp = require('jimp');


//setting options for multer
const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter (req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That filetype is not allowed!'}, false);
        }
    }
}

exports.homePage = (req, res) => {
    res.render('index', { title: 'Delicious' });
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' });
};

exports.upload = multer(multerOptions).single('photo');

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save(); //here we create a store and await till it is also saved!
    //Only after saving the store ...
    //flash a message (using flash-connect module)
    req.flash('success', `Successfully Created ${store.name}. Would You Like To Leave a Review?`);
    res.redirect(`/store/${store.slug}`); //redirect to store page
};

exports.getStores = async (req, res) => {
    //Query the DB for a list of all stores
    const stores = await Store.find(); //find all the stores
    res.render('stores', { title: 'Stores', stores }); //we pass the var stores in our template
};

exports.editStore = async (req, res) => {
    //find the store with given ID
    const store = await Store.findOne({ _id: req.params.id });
    //confirm they are the ower of the store
    //TODO
    //render edit form to update store
    res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
    // set location data to be a point
    req.body.location.type = 'Point';
    //find and update store
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();
    req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`);
    //redirect to the store and tell it is update
    res.redirect(`/stores/${store._id}/edit`);
};

