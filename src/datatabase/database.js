require('dotenv/config');
const {Pool, Client}  = require('pg');

const connectDB = async () => {
    
    if (global.connection)
        return global.connection;

    const URL = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATASOURCE}`;
    console.log(URL);
    const pool = new Pool({
        connectionString: URL
    });

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

module.exports = {connectDB};



