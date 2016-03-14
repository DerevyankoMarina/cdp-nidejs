var url = require("url"),
    path = require("path"),
    fs = require("fs"),
    db = require("../fake-db");

function getStaticContent(request, response) {

  var uri = url.parse(request.url).pathname,
      filename = path.join(process.cwd(), uri);

  fs.exists(filename, (exists) => {
    if (!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) {
      filename += 'views/index.html';
    }

    fs.readFile(filename, "binary", (err, file) => {
      if (err) {
        generateErr(response);
      }
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}

function getUsers(request, response) {
  var users = "";

  request.on("data", (data) => {
    users += data;
  });

  request.on("end", () => {
    var collection = users || "";
    db.getCollection( (err, collection) => {
      if(err) {
        generateErr(response);
      }
      response.writeHead(200);
      response.end(JSON.stringify(collection));
    })
  })
}

function createUser(request, response) {

  var user = "";

  request.on("data", (data) => {
    user += data;
  });

  request.on("end", () => {
    var model = JSON.parse(user);
    db.create( model, (err, data) => {
      if (err) {
        generateErr(response);
      } else {
        response.writeHead(200);
        response.end(JSON.stringify(data));
      }
    });
  });
}

function updateUser(request, response) {
  var user = "";

  request.on("data", (data) => {
    user += data;
  });

  request.on("end", () => {
    var model = JSON.parse(user);
    db.update(model, (err, updatedUser) => {
      if(err) {
        generateErr(response);
      }
      response.writeHead(200);
      response.end(JSON.stringify(updatedUser));
    })
  })
}

function removeUser(userId, response) {
  db.remove(userId, (err) => {
    if(err) {
      generateErr(response);
    }
    console.log('success')
  })
}

function getById(response, userId) {
  db.getById(userId, (err, model) => {
    if(err) {
      generateErr(response);
    }
    response.writeHead(200);
    response.end(JSON.stringify(model));
  })
}

function generateErr(response) {
  response.writeHeader(500);
  response.end("No records has been found");
}

exports.getStaticContent = getStaticContent;
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.removeUser = removeUser;
exports.getById = getById;