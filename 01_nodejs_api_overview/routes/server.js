var http = require("http"),
    url = require("url");

function start(route) {
  function onRequest(request, responce) {
    console.log('Request received');

    var pathname = url.parse(request.url).pathname,
        method = request.method,
        userId = request.url.slice(11);

    route(pathname, method, request, responce, userId);
  }

  http.createServer(onRequest).listen(3000);
  console.log('server is running ...');
}

exports.start= start;