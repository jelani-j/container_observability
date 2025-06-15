//Main file to grab sql data from database
import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';

const api = express();
api.use(cors());

// establish database connection
const db = await mysql.createConnection({
    host: 'host.docker.internal',
    user: 'root',
    password: 'password',
    port: 3305
});

//use data from front end to grab data in database
api.get('/items', async (req, res) =>{
    const dbName = req.query.db;
    const tblName = req.query.table;
    //in case name or table name is incorrect
    if (!dbName || !tblName) {
        return res.status(400).send("Missing db or table parameter.");
    }
    try{
        // Switch to propper database
        await db.changeUser({ database: `${dbName}`});
        const getsql = `SELECT * FROM ${tblName}`;
        const [results] = await db.query(getsql);
        res.json(results);
    }catch (err){
        console.error("Error fetching table:", err);
        res.status(500).send('Error fetching items.');
    }
    console.log("Successful Grab from", dbName, "table:", tblName);
});

//Open server 
api.listen(3305, (res) => {
console.log("Server Listening on port 3305");
});