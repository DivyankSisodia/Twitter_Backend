const express = require('express');
const connect = require('./config/database');

const app = express();

app.listen(3000, async ()=>{
    console.log('server has started at Port: 3000');
    await connect();
    console.log('Database connected');
})