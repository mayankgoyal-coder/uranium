const developerModel = require('../models/developerModel')
const batchModel = require("../models/batchModel")

// 2. Write an api POST  /developers that creates a developer from the details in the request body. Please note that the gender should be an enum with the following allowed values - male, female and other. Also, batch attribute is a reference to the batches collection.

const createDeveloper = async (req,res)=> {

    if(!req.body.name)
    return res.send("name is a required field")

    if(!(req.body.gender== "male" || req.body.gender== "female"|| req.body.gender=="other" ))
    return res.send("gender is a required field")

     if(!req.body.batch_id) 
     return res.send('batch id is required')

     const isValid = await batchModel.findById({_id:req.body.batch_id})
      if (!isValid)
      return res.send("entered batchId is not valid")

      const savedData = await developerModel.create(req.body)
      return res.send({msg:savedData})
}


// 3. Write an api GET /scholarship-developers that fetches the list of eligible developers for scholarship. An eligible developer is female with percentage greater than or equal to 70


const getScholarshipDeveloper =async (req,res) => {
    const getData = await developerModel.find({gender:"female", percentage:{$gte:70}})
    if(getData.length==0)
    return res.send("No developer elegible for scholarship")

    res.send ({msg : getData})
}

// 4. Write an api GET /developers?percentage=value1&program=value2 that only returns the developers for a given program with a percentage greater than or equal to the received value. Please note the batch name and the program values are received in the request as query params.

/* For example GET /developers?percentage=55&program=radium should return all the developers from radium batch with a percentage greater than or equal to 55*/

const getDeveloperByPP = async (req,res)=> {

    if(!req.query.percentage || !req.query.program)
        return res.send(" percentage and program are required field")
        let batch_id = await batchModel.find({program:req.query.program}).select({_id:1})
        batch_id=batch_id.map(inp => inp.id)
    const getData = await developerModel.find({percentage:{$gte:parseInt(req.query.percentage)},batch:{$in:batch_id}}).populate('batch',{name:1,program:1,_id:0})

    if(getData.length==0)
    return res.send ("NO Developer found as per your criteria")

    res.send({ msg : getData})
}

const getAllDevelopers = async (req,res) => {
    const getData = await developerModel.find().populate('batch',{name:1,program:1,_id:0})
    res.send({msg:getData})
}

module.exports.getDeveloperByPP = getDeveloperByPP;
module.exports.create = createDeveloper;
module.exports.getScholarshipDeveloper = getScholarshipDeveloper;
module.exports.getAllDevelopers=getAllDevelopers;