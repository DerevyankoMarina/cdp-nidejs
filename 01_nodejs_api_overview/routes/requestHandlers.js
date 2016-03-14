var url = require("url"),
    path = require("path"),
    fs = require("fs"),
    db = require("../fake-db");

function staticContent(request, response) {

  var uri = url.parse(request.url).pathname,
      filename = path.join(process.cwd(), uri);
//  console.log("process.cwd(): " + process.cwd());

  fs.exists(filename, function (exists) {
    if (!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) {
      filename += 'views/index.html';
    }

    fs.readFile(filename, "binary", function (err, file) {
      if (err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}

function getUsers() {
  var data = "";

  request.on("data", (data) => {
    user += data;
  });

  db.getCollection(function(err, collection){
    if(err) {
      console.log(err);
      return;
    }
    console.log(collection);
  })

}

function createUser(request, response) {

  var user = "";

  request.on("data", (data) => {
    user += data;
  });

  request.on('end', () => {
    var model = JSON.parse(user);

    db.create( model, (err, data) => {
      if (err) {
        response.writeHeader(500);
        response.end("No records has been found");
      } else {
        response.writeHead(200);
        response.end(JSON.stringify(data));
      }
    });

  });

}

function update(res) {
  console.log("Request handler 'update' was called.");

}

function remove(res) {
  console.log("Request handler 'remove' was called.");

}

function getById(res) {
  console.log("Request handler 'getById' was called.");

}



exports.staticContent = staticContent;
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.update = update;
exports.remove = remove;
exports.getById = getById;


/*

module.exports = function(req, res) {
  var method = req.method;
  console.log(method);

}


var DB = require("../fake-db");


function getUsers(res) {
  db.getCollection(function (err, result) {
    if (err) {
      res.statusCode = 404;
      res.end();
    } else {
      res.writeHeader();
      res.end(JSON.stringify(result));
    }
  });
}




function create(res) {

}

*/
