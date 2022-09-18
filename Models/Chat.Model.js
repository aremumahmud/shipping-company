var mongoose = require('mongoose')
var Schema = mongoose.Schema
const ChatSchema = mongoose.Schema({
  msg : String,
  from : Boolean,
  time : Date
})

module.exports = mongoose.model( 'Chat', ChatSchema );