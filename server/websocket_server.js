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
  let code = undefined;
  ws.on("message", (data) => {
    let message = JSON.parse(data);
    if(message.event == "authenticate") {
      // Authenticate client
      db.get("SELECT * FROM Bots WHERE code = ?", [message.data])
        .then((row) => {
          if(row) {
            isAuth = true;
            code = row.code;
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
      processWsMessage(ws, code, message);
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

const authClients = [];
function onAuthClientConnected(ws, code) {
  // testing client side service
  ws.send(JSON.stringify({
    event: "test_event",
    data: "test message"
  }));

  // Update data for this client (logged_in, ip)
  log.Info(`WebSocket`, `${ws._socket.remoteAddress} (${code}) connected`);
  authClients.push({code: code, ws: ws});
  db.run("UPDATE Bots SET last_online = ?, is_online = 1, last_ip = ? WHERE code = ?", [Date.now(), ws._socket.remoteAddress, code])
    .catch((err) => {
      log.Error("WebSocket", `Auth Connect Error ${code}`, err);
      ws.terminate();
    })

  // Handle when an auth client dc
  ws.on("close", () => {
    log.Info(`WebSocket`, `${ws._socket.remoteAddress} (${code}) disconnected`);
    for(let i = 0; i < authClients.length; i++) {
      if(authClients[i].code == code) {
        authClients.splice(i, 1);
        break;
      }
    }
    db.run("UPDATE Bots SET last_online = ?, is_online = 0 WHERE code = ?", [Date.now(), code])
      .catch((err) => {
        log.Error("WebSocket", `Auth DC Error ${code}`, err);
        ws.terminate();
      });
  });
}

function processWsMessage(ws, code, message) {
  console.log(`Auth'd Message: ${JSON.stringify(message)}`);
}

/**
 * Send an event to a connected (auth'd) client
 * 
 * @param {string} code Code to identify client
 * @param {string} event Event to send to client
 * @param {Any} data Data to send with event
 */
function sendEventToBot(code, event, data) {
  // TODO: should probably be a promise that resolves/rejects with success/error
  for(let i = 0; i < authClients.length; i++) {
    if(authClients[i].code == code) {
      authClients[i].ws.send(JSON.stringify({
        event: event,
        data: data
      }));
      return;
    }
  }
}

module.exports = {
  startWebsocketServer,
  sendEventToBot
}