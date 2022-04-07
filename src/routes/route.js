const express = require('express');
const lg = require('../logger/logger')
const samsung= require('../util/helper')
const redmi = require('../validator/formatter')
const oppo = require('../vivo/module1.js')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log(lg.exwelcome())
    console.log(samsung.exprintdate())
    console.log(samsung.exprintmonths())
    console.log(samsung.exgetbatchinfo())
    console.log(redmi.extrim())
    console.log(redmi.exchangetolowercase())
    console.log(redmi.exchangetouppercase())
    //console.log(oppo.monthsplitedarr())
    //console.log(oppo.tail())
    //console.log(oppo.union())
    //console.log(oppo.form())
    
    res.send('My first ever april month!')
});

module.exports = router;
// adding this comment for no reason