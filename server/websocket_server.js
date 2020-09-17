const WebSocket = require("ws");
const log = require("./helpers/log");
const db = require("./helpers/database");

function startWebsocketServer(server) {
  const wss = new WebSocket.Server({server});
  wss.on("connection", handleWsConnection)
}

function handleWsConnection(ws) {
  // Wait for authenticate event
  let isAuth = false;
  ws.on("message", (data) => {
    let message = JSON.parse(data);
    if(message.event == "authenticate") {
      // Authenticate client
      db.get("SELECT * FROM Bots WHERE code = ?", [message.data])
        .then((row) => {
          if(row) {
            isAuth = true;
            onAuthClientConnected(ws, row.code);
          } else {
            log.Warn(`WebSocket`, `${ws._socket.remoteAddress} failed authentication w/ ${message.data}`);
            isAuth = false;
          }
        })
        .catch((error) => {
          isAuth = false;
          log.Error("WebSocket", "Database Error When Authenticating", error);
        });
    } else if(!isAuth) {
      // If message sent w/o auth disconnect
      ws.terminate();
    } else {
      processWsMessage(ws, message);
    }
  });

  // Send authenticate event
  ws.send(JSON.stringify({
    event: "authenticate",
    data: ""
  }));

  // Disconnect client if they do not get auth'd
  setTimeout(() => {  
    if(!isAuth) {
      ws.terminate();
    }
  }, 5000);
}

function onAuthClientConnected(ws, code) {
  // Update data for this client (logged_in, ip)
  log.Info(`WebSocket`, `${ws._socket.remoteAddress} has authenticated with ${code}`);
  db.run("UPDATE Bots SET last_online = ?, is_online = 1, last_ip = ? WHERE code = ?", [Date.now(), ws._socket.remoteAddress, code])
    .catch((err) => {
      log.Error("WebSocket", `Auth Connect Error ${code}`, err);
    })

  // Handle when an auth client dc
  ws.on("close", () => {
    db.run("UPDATE Bots SET last_online = ?, is_online = 0 WHERE code = ?", [Date.now(), code])
      .catch((err) => {
        log.Error("WebSocket", `Auth DC Error ${code}`, err);
      });
  });
}

function processWsMessage(ws, message) {
  console.log(`Auth'd Message: ${message.data}`);
}

module.exports = {
  startWebsocketServer
}