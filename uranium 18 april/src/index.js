const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

const mongoose = require('mongoose')

mongoose.connect(
    "mongodb+srv://functionUpUranium-2:JECVxS0v96bKoG0a@cluster0.j1yrl.mongodb.net/mayankgoyal-DB?retryWrites=true&w=majority",{
    useNewurlParser:true
}).then(()=>{
    console.log("MoongoDB is connected")
}).catch(err=>console.log(err));

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
