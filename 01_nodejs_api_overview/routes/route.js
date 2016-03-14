var url = require("url"),
    path = require("path"),
    fs = require("fs"),
    requestHandlers = require("./requestHandlers");

function route(pathname, method, request, response, userId) {

  var id = /^\/api\/users\/\w{5,}$/;

  if (method === "GET") {

    if (pathname === "/api/users") {
      requestHandlers.getUsers(request, response);

    } else if( id.test(pathname) ) {
      requestHandlers.getById(response, userId);

    } else {
      requestHandlers.getStaticContent(request, response);
    }

  } else  if (method === "POST") {
    requestHandlers.createUser(request, response);

  } else if(method === "DELETE") {
    requestHandlers.removeUser(userId, response);

  } else if(method === "PUT" && id.test(pathname)) {
    requestHandlers.updateUser(request, response);

  } else {
    console.log("No request handler found for " + pathname);
  }
}

exports.route = route;
