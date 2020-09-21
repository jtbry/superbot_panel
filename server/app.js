const http = require("http");
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const websocket = require('./websocket_server');
const log = require('./helpers/log');
const app = express();
const sessionSecret = process.env.sessionSecret || "placeholder";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: sessionSecret, cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false}));
app.use("/", require("./routes/index"));

const server = http.createServer(app);
server.listen(process.env.PORT || 8080, () => {
  log.info("App", `API Listening on ${process.env.PORT || 8080}`);
  websocket.startWebsocketServer(server);
});