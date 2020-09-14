/*
  app.js

  Superbot back-end entry point
*/
const express = require('express');
const app = express();

// TODO: For RuneScape Plugin
//        api routes for posting data
// TODO: For Panel Front-End
//        api routes for logging in
//        api routes for bot management and creation
// TODO: For Bot Communication
//        create websocket server and management connections
//        simple authentication over socket like a password system
//        https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4 (not using typescript)
//        https://gist.github.com/jfromaniello/8418116

app.get('/ping', function (req, res) {
  // Example route to test react application proxy
  return res.send('pong');
});

app.listen(process.env.PORT || 8080);