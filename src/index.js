require('dotenv').config({ path: "./.env" });
const loaders = require('./loaders');

async function startApp() {
    await loaders.Server.connect();
    await loaders.Redis.connect();
    await loaders.DB.connect();
}

startApp().catch((error) => console.error('Error starting app:', error));
