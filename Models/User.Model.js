var mongoose = require('mongoose')
var Schema = mongoose.Schema
const UserSchema = mongoose.Schema({
  shipments :	[{ 
    type: Schema.Types.ObjectId,
    ref: 'Shipment' 
  }],
  username : {
    type : String,
    unique : true,
    required : true
  },
  email : {
    type : String,
    unique : true,
    required : true
  },
  password : {
    type : String,
    required : true,
  },
  time : Date,
  chats : [{
    type : Schema.Types.ObjectId,
    ref : 'Chat'
  }]
})

module.exports = mongoose.model( 'User', UserSchema );