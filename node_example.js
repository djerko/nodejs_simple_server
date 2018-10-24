var http = require('http')

var server = http.createServer(function (request, response) {
  var url = request.url
  var data = url.split('?')

  if(data[0] === '/suma') {
    var suma = 0
    var input = data[1].split('&')
    input.forEach(function(numero) {
      var splitted = numero.split('=')[1]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        suma += number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:suma}))
  }

  else if (data[0]==='/multiplica') {
    var mult = 1
    var input = data[1].split('&')
    input.forEach(function(numero) {
      var splitted = numero.split('=')[1]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        mult = mult*number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:mult}))
    }

    else if (data[0]==='/fibonacci') {
      var serie=[]
      serie[0]=0
      serie[1]=1
      var input = data[1].split('&')
      input.forEach(function(numero) {
        var splitted = numero.split('=')[1]
        if(isNumeric(splitted)) {
          //Ok, it's a number
          var number = Number(splitted)
          for(var i=2; i<=number;i++){
            serie[i]=serie[i-1]+serie[i-2]
          }

        } else {
          //It's not a number, so we show an error message and sends to the client
          response.writeHead(400, {'Content-Type': 'application/json'})
          response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
        }
      })
      //If everithing was OK, we send code 200 response, using json format
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end(JSON.stringify({result:serie}))

    }
})



/**
 ** isNumeric returns true if input is a number. This can be done using the oppsite behaviour from isNaN function
 **/
function isNumeric(num) {
  //isNaN returns false if the input is a number, true otherwise
  return !isNaN(num)
}

server.listen(8080)
