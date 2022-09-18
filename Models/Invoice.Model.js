var mongoose = require('mongoose')
var Schema = mongoose.Schema
const InvoiceSchema = mongoose.Schema({
  customize : {
  },
  images : {
     
      logo : String,
  },
  
  sender : {
      company : String,
      address : String,
      zip : String,
      city : String,
      country : String
  },
  client : {
      company : String,
      address : String,
      zip : String,
      city : String,
      country : String
   },
  information : {
      
      number : String,
     
      date : String,
 
      ['due-date'] : String 
  },
  
  products : [],
 
  ["bottom-notice"] : String,
 
   settings : {
      currency : String, 
 
  },
  
  translate : {},
})

module.exports = mongoose.model( 'Invoice', InvoiceSchema );