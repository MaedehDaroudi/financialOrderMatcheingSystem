const http = require('http');
const express = require('express');
const authRoutes = require('../api/routes/auth.routes');
const orderRoutes = require('../api/routes/order.routes');


class Server {
    static prefixUrl = '/api/v1'

    static async connect() {
        const app = express();
        app.use(express.json());
        app.use(`${this.prefixUrl}`, authRoutes);
        app.use(`${this.prefixUrl}/order`, orderRoutes);
        const server = http.createServer(app);
        server.listen(process.env.MARKET_DATA_SERVER_PORT || 8080, () => {
            console.log('Server is running in port: ', process.env.MARKET_DATA_SERVER_PORT || 8080);
        });
    }
}

module.exports = Server

