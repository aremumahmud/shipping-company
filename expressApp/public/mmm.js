function el(e){return document.getElementById(e)}

function respawn(url){

    axios.get(url)
    .then(function (response) {
      console.log(response);

      var val = Number(el('count').innerHTML)
                el('count').innerHTML = val + 1
            //   respawn(url)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      var val = Number(el('err').innerHTML)
            el('err').innerHTML = val + 1
            respawn(url)
    })
    
}

            respawn('http://mudremcloudstore.aremzy.repl.co/')