const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a Store Name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    }, 
    tags: [String]
});

//set the slug, before 'save'
storeSchema.pre('save', function(next) {
    if(!this.isModified('name')) {
        next(); //skip it!
        return; //stop this function from running
    }
    this.slug = slug(this.name);
    next(); 
});

module.exports = mongoose.model('Store', storeSchema);