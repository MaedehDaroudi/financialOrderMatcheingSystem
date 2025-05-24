const http = require('http');
const express = require('express');
const routes = require('../api/routes/order.routes');


class Server {
    constructor() { }

    static async connect() {
        const app = express();
        app.use(express.json());
        app.use('/api/order', routes);
        const server = http.createServer(app);
        server.listen(process.env.MARKET_DATA_SERVER_PORT || 8080, () => {
            console.log('Server is running in port: ', process.env.MARKET_DATA_SERVER_PORT || 8080);
        });
    }
}

module.exports = Server

