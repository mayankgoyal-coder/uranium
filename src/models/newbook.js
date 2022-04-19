const mongoose=require("mongoose")
const { stringify } = require("nodemon/lib/utils")
const ObjectId = mongoose.Schema.Types.ObjectId
const bookSchema=new mongoose.Schema
(
    {
        name:String,
        author:{type :ObjectId,ref:"newAuthor"},
        price:Number,
        rating:Number,
        publisher:{type:ObjectId,ref:"newPublisher"},
        isHardCover: {type:Boolean,default:false}
    },
    {timestamps:true}
)
module.exports=mongoose.model("newbook",bookSchema)