var url = require("url"),
    path = require("path"),
    fs = require("fs"),
    requestHandlers = require("./requestHandlers");

function route(pathname, request, responce, userId) {
  var method = request.method;

  console.log("About to route a request for " + pathname);

  if (method === "GET") {
    if (pathname === "/api/users") {
      requestHandlers.getUsers(request, responce);
    } else {
      requestHandlers.staticContent(request, responce);
    }
  } else  if (method === "POST") {
    requestHandlers.createUser(request, responce);
  } else {
  console.log("No request handler found for " + pathname);
  }
}

exports.route = route;
