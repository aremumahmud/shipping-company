var mongoose = require('mongoose')
var User = require("../Models/User.Model.js")
var Shipment = require("../Models/Shipments.Model.js")
var Chat = require("../Models/Chat.Model.js");
const Invoice = require('../Models/Invoice.Model.js');
var genInv = require('../InvoiceGenerator')


mongoose.connect( process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/logistic' ,null ,()=>{
	console.log('connected')
}); 

var image = require('./image.js')

function dbController(){
  // constructor func
}
dbController.prototype.addShipment = function( email , options , consignment){
 return new Promise(( res , rej )=>{
    User.findOne({ email }, ( err , user)=>{
      console.log(user)
      if(err || user == null){
      rej({
        err,
        msg : "couldnt find user"
      })
      }else{
        var shipment = new Shipment()
        shipment.shipmentInfo = {
          status : "order recieved",
          address : options.address
        }
        shipment.totalShipmentWeight = options.totalWeight
        var invoice = new Invoice({
          customize : {
          },
          images : {
             
              logo : image,
          },
          
          sender : {
              company : options.sender.company,
              address : options.sender.address,
              zip : options.sender.zip,
              city : options.sender.city,
              country : options.sender.country
          },
          client : {
              company : options.client.company,
              address : options.client.address,
              zip : options.client.zip,
              city : options.client.city,
              country : options.client.country
           },
          information : {
              
              number : options.information.number,
             
              date : options.information.date,
         
              ['due-date'] : options.information['due-date'] 
          },
          
          products : consignment,
         
          ["bottom-notice"] : '"Kindly pay your invoice within 15 days."',
         
           settings : {
              currency : 'USD', 
         
          },
          
          translate : {},
        })
        invoice.save(err=>{
          rej(err)
        })
        genInv(invoice).then(resm=>{
          shipment.invoice_name = resm
          shipment.shipment_invoice = invoice
          shipment.save( err=>{
            if(err){
              rej({
                err,
                msg : "couldnt save shipment"
              })
            }else{
              user.shipments.push( shipment )
              user.save( err=>{
                if(err){
                  rej({
                    err,
                    msg : "couldnt save changes to user"
                  })
                }else{
                  res({
                    sucess : true,
                    user
                  })
                }
              })
            }
          })
        }).catch(err=>{
           rej(err)
        })
        
      }
    })
 })
  
}

dbController.prototype.updateShipmentStatus = function ( shipmentTrackingId , options){
 return new Promise((res , rej)=>{
  Shipment.findOne( shipmentTrackingId ,(err , shipment)=>{
    if (err){
      rej({
        err,
        msg : "invalid tracking id"
      })
    }else{
      shipment.shipmentInfo.status = options.status
      if (options.address){
         shipment.shipmentInfo.address = options.address
      }
      shipment.save(err=>{
        if (err){
          rej({
            err,
            msg : "couldnt save shipment"
          })
        }else{
          res({
            sucess : true,
            shipment
          })
        }
      })
    }
  })
 })
}


dbController.prototype.registerUser = function( username , email , password ){
  return new Promise((res , rej)=>{
    var newUser = new User()
    newUser.username = username
    newUser.email = email
    newUser.password = password
    newUser.save(err=>{
      if(err){
        rej({
          err,
          msg : "couldnt create user"
        })
      }else{
        res({
          sucess : true
        })
      }
    })
  })
}

dbController.prototype.loginUser = function(email , password){
  return new Promise((res,rej)=>{
   User.findOne({ email , password})
    .populate('shipments')
    .populate('chats')
    .exec(function (err , user ){
       if (err){
         rej({
           err,
           msg : "invalid username or password"
         })
       }else{
         res({
           sucess : true ,
           user
         })
       }
    })
  })
 
}

dbController.prototype.postChat = function(email , chat){
  return new Promise((res ,rej )=>{
    User.findOne({ email } , (err , user)=>{
      var newChat = new Chat()
      newChat.msg = chat.msg
      newChat.from = chat.from
      newChat.time = Date.now()
      newChat.save(err=>{
        if (err){
          rej({
            err,
            msg : "couldnt save chat"
          })
        }else{
          user.chats.push(newChat)
          user.save(err=>{
            if(err){
              rej({
                err,
                msg : "couldnt save chat"
              })
            }else{
              res({
                sucess : true,
                newChat
              })
            }
          })
        }
      })
    })
  })
}

dbController.prototype.getUsers = function(){
 return new Promise((res , rej)=>{
  User.find()
    .populate("chats")
    .populate("shipments" , {
      populate : {
        path : 'invoice',
        model : 'invoice'
      }
    })
    
    .exec((err,data)=>{
      if(err){
        rej({
          err,
          msg : "couldnt find users"
        })
      }else{
        res({
          sucess : true,
          data
        })
      }
    })
 })
}

dbController.prototype.trackShipment = function (shipmentId){
  return new Promise((res , rej)=>{
    Shipment.findOne({_id : shipmentId} , (err , shp)=>{
      if(err){
        rej(err)
      }else{
        res({
          sucess : true,
          shipment : shp
        })
      }
    })
  })
  

}
module.exports = dbController