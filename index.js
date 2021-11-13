//index.js
const app = require('./app');
const appWs = require('./app-ws');

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`App Express is running!`);
})

const ws = appWs(server);

setInterval(() => {
    ws.broadcast(
        {numero: Math.random()});
}, 1000)