const mongoose=require("mongoose")
const authorSchema= new mongoose.Schema
(
    {
        authorname:String,
        age:Number,
        address:String,
        rating:Number,
    },
    {timestamps:true}
);
module.exports=mongoose.model("newAuthor",authorSchema)