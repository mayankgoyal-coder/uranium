const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type: String,
        required:true
    }, 
    authorName: {
        type: String,
        required:true
    }, 
    tags: [String],
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    totalPages:{
        type: String
    },
    stockAvailable:Boolean,
    sales: {type: Number, default: 20},
    year:{
        type: Number,
        default: 2022
    }
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
