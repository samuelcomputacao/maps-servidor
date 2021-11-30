const WebSocket = require("ws");

function onError(ws, err) {
  console.error(`onError: ${err.message}`);
}

function dispatchMsg(ws, type, value) {
  switch (type) {
    case "AUTHORIZATION":
      ws.KEY_WS = value;
      break;
    case "POSITION":
      ws.position = value;
      break;
    case "CLOSE":
      ws.close();
      break;
    default:
      break;
  }
}

function onMessage(ws, data) {
  console.log(`onMessage: ${data.toString()}`);
  const { type, value } = JSON.parse(data);
  if (type && value) {
    dispatchMsg(ws, type, value);
  }
}

function onConnection(ws, _) {
  ws.on("message", (data) => onMessage(ws, data));
  ws.on("error", (error) => onError(ws, error));
  console.log(`onConnection`);
}

function broadcast(jsonObject) {
  if (!this.clients) return;
  this.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      if (client.KEY_WS && client.KEY_WS === process.env.KEY_WS) {
        client.send(JSON.stringify("opaaa"));
      }
    }
  });
}

module.exports = (server) => {
  const wss = new WebSocket.Server({
    server,
  });

  wss.on("connection", onConnection);
  wss.broadcast = broadcast;

  console.log(`App Web Socket Server is running!`);
  return wss;
};
