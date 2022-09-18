var controlSystem = require('./TcimModel/controlSystemModel')
var control = new controlSystem('master')
var sock = require('socket.io')
var schemes = require('./Schemas/schema')
var app = require('./expressApp')
control 
   .startServer(3000 , app)
   .integrateSocketCommunucation(sock)
   .setActionSchemes(schemes)
   .on('sysError' , err=>{
       console.log(err)
   }) 