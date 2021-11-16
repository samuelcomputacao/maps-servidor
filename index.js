//index.js
const app = require('./src/server/app');
const appWs = require('./src/websocket/app-ws');

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`App Express is running!`);
})

const ws = appWs(server);

setInterval(() => {
    ws.broadcast(
        {numero: Math.random()});
}, 1000)