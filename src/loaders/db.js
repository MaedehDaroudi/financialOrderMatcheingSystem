const { readFileSync } = require('fs');
const { config } = require('../config/db')
const path = require('path');

const { Pool } = require('pg');

class DB {
    static pool;

    static async connect() {
        let retries = 5;
        while (retries > 0) {
            try {
                this.pool = new Pool(config);
                const client = await this.pool.connect();
                await client.query('SELECT 1');
                client.release();
                console.log("Database connected.");
                return this.pool;
            } catch (err) {
                retries--;
                if (retries === 0) {
                    console.error("Database timeout");
                    throw err;
                }
                await new Promise(res => setTimeout(res, 5000));
            }
        }

        await this.init();
        return this.pool;
    }
    static async init() {
        try {
            const sql = readFileSync(path.join(__dirname, './sql/init_db.sql')).toString();
            await this.pool.query(sql);
        } catch (error) {
            console.error('Error executing init_db.sql:', error);
        }
    }

    static async query(text, params) {
        const client = await this.pool.connect();
        try {
            const res = await client.query(text, params);
            return res;
        }
        finally {
            client.release();
        }
    }

    static async close() {
        await this.pool.end();
    }
}

module.exports = DB;
