const express = require('express');
const router = express.Router();
const authordetails = require("../models/authors")
const bookdetails = require("../models/books")



//●	Write create APIs for both books and authors ---> If author_id is not available then do not accept the entry(in neither the author collection nor the books collection)
router.post("/createauthor", async function (req, res) { //  async = it does not get data then jumps for next line//
    const data = await authordetails.create(req.body)
    res.send({ msg: data })
})
router.post("/createbook", async function (req, res) {
    const data = await bookdetails.create(req.body)
    res.send({ msg: data })
})



//●	List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after another- first query will find the author_id for "Chetan Bhagat”. Then next query will get the list of books with that author_id )
router.get("/getchetanbook", async function (req, res) {
    const data = await authordetails.find({ author_name: "Chetan Bhagat" })
    const id = data[0].author_id
    const bookname = await bookdetails.find({ author_id: id }).select({ name: 1, _id: 0 })
    res.send({ msg: bookname })
})



//●	find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)
router.get("/updateprice", async function (req, res) {
    const data = await bookdetails.find({ name: "Two States" })
    const id = data[0].author_id
    const authorname = await authordetails.find({ author_id: id }).select({ author_name: 1, _id: 0 })
    const bookname = data[0].name
    const priceupdate = await bookdetails.findOneAndUpdate({ name: bookname }, { price: 100 }, { new: true }).select({ price: 1, _id: 0 })
    res.send({ msg:  authorname,priceupdate})
})



//●	Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 
router.get("/costbetween", async function (req, res) {
    const data = await bookdetails.find({ price: { $gte: 50, $lte: 100 } }).select({ author_id: 1, _id: 0 })
    const id = data.map(inp => inp.author_id)
    let arr = []
    for (let i = 0; i < id.length; i++) {
        let k = id[i]
        const author = await authordetails.find({ author_id: k }).select({ author_name: 1, _id: 0 })
        arr.push(author)
    }
    const authorname = arr.flat()
    res.send({ msg: authorname })
})


module.exports = router;




