var mongoose = require('mongoose')
var Schema = mongoose.Schema
const ShipmentSchema = mongoose.Schema({
  shipmentInfo : {
    status : String,
    address : String
  },
shipment_invoice : {
  type : Schema.Types.ObjectId,
  ref : 'Invoice'
},
invoice_name : String,
  shipmentTrackingId : {
    type : Schema.Types.ObjectId
  },
  totalShipmentWeight : Number,
})

module.exports = mongoose.model( 'Shipment', ShipmentSchema );