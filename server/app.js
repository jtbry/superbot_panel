/*
  app.js

  Superbot back-end entry point
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')
const SESSION_SECRET = "placeholder";

// TODO: For RuneScape Plugin
//        api routes for posting data
// TODO: For Panel Front-End
//        api routes for bot management and creation
// TODO: For Bot Communication
//        create websocket server and management connections
//        simple authentication over socket like a password system
//        https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4 (not using typescript)
//        https://gist.github.com/jfromaniello/8418116

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: SESSION_SECRET, cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false}));
app.use("/", require("./routes/index"));

app.get('/ping', function (req, res) {
  // Example route to test react application proxy
  return res.send('pong');
});

app.listen(process.env.PORT || 8080);