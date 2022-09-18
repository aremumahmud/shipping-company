var path  = require("path")
var easyinvoice = require('easyinvoice')
var fs = require("fs")

// "quantity": 2,
// "description": "Product 1",
// "tax-rate": 6,
// "price": 33.87
// }
function generateInvoice(data){
  return new Promise((res , rej)=>{
    easyinvoice.createInvoice(data , (re)=>{
      var file_name = 'invoice' + Date.now() + '.pdf'
      fs.writeFile(file_name , re.pdf, 'base64',err=>{
        if (err){
          rej(err)
        }else{
          console.log('invoice generated sucessfully')
          res(file_name)
        }
      })
    })
  })
}

module.exports = generateInvoice
