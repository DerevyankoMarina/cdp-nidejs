var server = require('./routes/server'),
    router = require("./routes/route");

server.start(router.route);

// http://www.nodebeginner.ru/#a-basic-http-server