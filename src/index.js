const loaders = require('./loaders');
require('dotenv').config({ path: "./.env" });
const { dbConfig } = require('./config/db')


async function startApp() {
    await loaders.Server.connect();
    await loaders.Redis.init();
    await loaders.DB.connect(dbConfig);
}

startApp().catch((error) => console.error('Error starting app:', error));
