var server = require('./routes/server'),
    router = require("./routes/route");

server.start(router.route);