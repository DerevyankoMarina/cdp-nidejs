var http = require("http"),
    url = require("url");


function start(route) {
  function onRequest(request, responce) {
    console.log('Request received');

    var pathname = url.parse(request.url).pathname;
    var userId = request.url.slice(11);
    //console.log(pathname);

    route(pathname, request, responce, userId);

    /*  if (request.url === '/api/users' && request.method === 'GET') {
     getUsers(response);
     }*/
  }

  http.createServer(onRequest).listen(3000);
  console.log('server is running ...');
}

exports.start= start;




