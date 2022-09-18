var dbn = require("../Controllers/DbController.js")
var db = new dbn()
module.exports = [
    {
        action : 'login' , 
        exec : (data, master)=>{
          var userId = data._userId
          console.log(data)

          db.loginUser( data.email , data.password ).then(res=>{
            // do something
            master.emitToClient( userId, "loginSucess", { data : res })
          }).catch(err=>{
            // do something
            master.emitToClient( userId , "loginFailed" , { data : err})
          })
        }
    },{
      action : "register",
      exec : (data , master)=>{
        // do something
        var userId = data._userId
        db.registerUser(data.username , data.email , data.password).then(res=>{
          master.emitToClient( userId, "registerSucess", { data : res })
        }).catch(err=>{
          // do something
          master.emitToClient( userId, "registerFailed", { data : err })
        })
      }
    },{
      action : "postChat",
      exec : (data , master)=>{
        // do sth
         var userId = data._userId
         db.postChat( data.email , data.chat).then(res=>{
           master.emitToClient( userId, "postSucess", { data : res })
         }).catch(err=>{
           master.emitToClient( userId, "PostFailed", { data : err })
         })
      }
    },{
      action : "getUsers",
      exec : ( data , master )=>{
        var userId = data._userId
        db.getUsers().then(res=>{
          master.emitToClient( userId, "usersFetchSucess", { data : res })
         }).catch(err=>{
           master.emitToClient( userId, "usersFetchFailed", { data : err })
         })
       }
    },{
      action : "addShipment",
      exec : (data , master)=>{
          var userId = data._userId
          db.addShipment( data.email , data.options , data.consignment).then(res=>{
            master.emitToClient( userId, "addShipmentSucess", { data : res })
          }).catch(err=>{
            master.emitToClient( userId, "addShipmentFailed", { data : err })
          })
      }
    },{
      action : "updateShipment",
      exec : (data , master)=>{
         var userId = data._userId
         db.updateShipmentStatus( data.shipmentTrackingId, data.options).then(res=>{
           master.emitToClient( userId, "updateShipmentSucess", { data : res })
         }).catch(err=>{
           master.emitToClient( userId, "updateShipmentFailed", { data : err })
         })
      }
    },{
      action : 'trackShipment',
      exec : (data , master)=>{
        var userId = data._userId
        db.trackShipment(data.shipmentTrackingId).then(res=>{
          master.emitToClient( userId, "trackShipmentSucess", { data : res })
        }).catch(err=>{
          master.emitToClient( userId, "trackShipmentFailed", { data : err })
        })
      }
    }
 ]