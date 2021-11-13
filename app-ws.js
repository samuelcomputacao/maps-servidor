const WebSocket = require('ws');

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
    console.log(`onMessage: ${data.toString()}`);
    ws.identificador = data.toString();
}

function onConnection(ws, req) {
    const {key} = req.headers;
    if(key!== process.env.KEY_WS){
        ws.close();
        console.log(`Closed`);
    }else{
        ws.on('message', data => onMessage(ws, data));
        ws.on('error', error => onError(ws, error));
        console.log(`onConnection`);
    }
   
}

function broadcast(jsonObject) {
    if (!this.clients) return;
    this.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            if(client.identificador === process.env.KEY_MESSAGE){
                client.send(JSON.stringify(jsonObject));
            }
        }
    });
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });

    wss.on('connection', onConnection);
    wss.broadcast = broadcast;

    console.log(`App Web Socket Server is running!`);
    return wss;
}