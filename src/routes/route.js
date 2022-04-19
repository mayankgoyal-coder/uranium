const express = require('express');
const router = express.Router();
const authordetails = require("../models/newauthor")
const bookdetails = require("../models/newbook")
const publisherdetails=require("../models/newpublisher")

//●	Write create APIs for authors

router.post("/createauthor",async function(req,res){
    const data=await authordetails.create(req.body)
    res.send({msg:data})
})

//●	create APIs for publisher

router.post("/createpublisher",async function(req,res){
    const data=await publisherdetails.create(req.body)
    res.send({msg:data})
})

//	create APIs for books

router.post("/createbooks",async function(req,res){
    const data=await bookdetails.create(req.body)
    res.send({msg:data})
})

//==================================================================================

//a)	The authorId is present in the request body. If absent send an error message that this detail is required

router.post("/createbook",async function(req,res)
 {
    const allDetails=req.body
    if(allDetails.author==undefined)
    {
        res.send("Error!!! Author Id Destails is required.... ")
    }else{
        const data=await bookdetails.create(req.body)
        res.send({msg:data})
    }

//=================================================================================

//b)	If present, make sure the authorId is a valid ObjectId in the author collection. If not then send an error message that the author is not present.


    if(allDetails.author!=undefined)
    {
        const getdetails=await authordetails.find()
        if(getdetails[0]._id!=allDetails.author)
        {
            res.send("Author Id is not present ")
        }
    }
//===================================================================================

//c)	The publisherId is present in the request body. If absent send an error message that this detail is required

    if(allDetails.publisher==undefined)
    {
        res.send("Error!!! Publisher id Details is required.... ")
    }

//==========================================================================================

//d)	If present, make sure the publisherId is a valid ObjectId in the publisher collection. If not then send an error message that the publisher is not present.

    if(allDetails.publisher!=undefined)
    {
        const getdetails=await publisherdetails.find()
        if(getdetails[0]._id!=allDetails.publisher)
        {
            res.send("Publisher id Is not present ......")
        }
    }
})
//========================================================================================

//Write a GET api that fetches all the books along with their author details (you have to populate for this) as well the publisher details (you have to populate for this)

    router.get("/allBooksDetails",async function(req,res){
        const data=await bookdetails.find().populate('author publisher')
        res.send({msg:data})
    });



    /* Create at least 4 publishers (Penguin, Bloomsbury, Saraswati House, HarperCollins). Create at least 6 authors with ratings 2, 3, 3.5, 4, 4.5 and 5. Create around 10 books with these publishers and authors.
    Create a new PUT api /books and perform the following two operations
     a) Add a new boolean attribute in the book schema called isHardCover with a default false value. For the books published by 'Penguin' and 'HarperCollins', update this key to true.
     b) For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60) */


     router.put("/updateBooks",async function(req,res){
         const data = await publisherdetails.find({name:{$in:['penguin','harpercollins']}}).select({_id:1})
         const books = await bookdetails.updateMany({_id:{$in:data }},{isHardCover:true})
         res.send({msg:data})
     });
    
    module.exports = router;