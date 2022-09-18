var ion = new controlSocket()
ion.connect('/')

var socket = ion.Socket

socket.on('loginSucess' , re=>{
    console.log('sucess :' , re)
})
socket.on('loginFailed' , er=>{
    console.log('failed : ' ,er)
})


el('submit').onclick = function(){
    var email = el('email').value
    var password = el('password').value
    var username = el('username').value
    if(email && password && username){
    ion.emit('login' , {
        email,
        password,
        username
    })
    }else{
        console.log('fill in fields')
    }
}