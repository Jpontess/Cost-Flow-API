import { config } from "dotenv"
import { error } from "node:console";
import { Pool } from "pg";

config();

const pool = new Pool({
    connectionString: process.env.BD_PRODUCTION,
    ssl: {rejectUnauthorized: false}
});

pool.connect((error, client, release) => {
    if (error) console.log(`Error to the connection in database`);

    console.log("Success to the connection in database")
})

export default pool;