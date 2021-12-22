const WebSocket = require("ws");
const util = require("../util/util");

const routesService = require("../service/routes/routesService");

function onError(ws, err) {
  console.error(`onError: ${err.message}`);
}

function dispatchMsg(ws, type, value) {
  switch (type) {
    case "AUTHORIZATION":
      ws.KEY_WS = value;
      break;
    case "POSITION":
      ws.position = value.position;
      ws.route = value.route;
      break;
    case "CLOSE":
      ws.close();
      break;
    default:
      break;
  }
}

function onMessage(ws, data) {
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

function broadcast() {
  if (!this.clients) return;
  this.clients.forEach(async (client) => {
    if (client.readyState === WebSocket.OPEN) {
      if (client.KEY_WS && client.KEY_WS === process.env.KEY_WS) {
        const route = util.routeOfInterest(client.position, client.route);
        const pois = await routesService.getPois(route);
        console.log(pois);
        client.send(JSON.stringify({ type: "POIS", value: pois }));
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
