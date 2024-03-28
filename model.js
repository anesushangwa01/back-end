

const mongoose = require('mongoose');

// Define Mongoose schema for Bakeryentry
const ProductEntry = new mongoose.Schema({
    img: { type: String},
    types: { type: String, required: true },
    productname: { type: String, required: true },
    refnumber: {type : String,required:true},  //ref number is used to
    packedDate: { type: Date, required: true },
    expdate: { type: Date, required: true }
});

// Define Mongoose model for Bakeryentry
const BakeryEntryModel = mongoose.model('expireentries', ProductEntry);

module.exports = BakeryEntryModel;
