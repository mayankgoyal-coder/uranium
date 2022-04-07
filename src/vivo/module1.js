const b = require ("lodash");

const month = ['january','february','march','april','may','june','july','august','september','october','november','december']
const monthsplitedarr = b.chunk (month,4)
module.exports.monthsplitedarr = monthsplitedarr

const odd = [1,3,5,7,9,11,13,15,17,19];
module.exports.tail = b.tail(odd)

const dup1 = [8,7,6,5,4,3]
const dup2 = [9,3,6,5]
const dup3 = [2,4,6,8]
const dup4 = [7,6,5,4]
const dup5 = [9,1,2,3]
module.exports.union = b.union(dup1,dup2,dup3,dup4,dup5)
module.exports.form = b.fromParis([['horror','the shining'],['drama','titanic'],['thriller','shutter island']['fantasy','pas labrinth']])