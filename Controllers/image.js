var path = require('path')
var fs = require('fs')

var imagePath = path.resolve("./img" , "112.png")


var png = fs.readFileSync(imagePath)
     
var buff =  new Buffer.from(png).toString("base64")
module.exports = buff
   
