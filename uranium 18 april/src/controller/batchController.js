const  batchModel  = require("../models/batchModel")


// 1. Write an api POST /batches that creates a batch from the details in the request body. Please note that the program should be an enum with the following allowed values only - backend and frontend

const createBatch = async (req,res) => {
    if(!(req.body.program=='backend' || req.body.program=="frontend"))
    return res.send("enter a valid program either backend or frontend")

    if(!req.body.name)
    return res.send("Name is a required field")

    const savedData = await batchModel.create(req.body)
    return res.send({msg : savedData})
}

const getBatches = async (req,res) => {
    const getData =  await batchModel.find()
    res.send({msg : getData})
}


module.exports.createBatch = createBatch;
module.exports.getBatches= getBatches;