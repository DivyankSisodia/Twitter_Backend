import express from 'express';
import connect from './config/database.js';

import apiRoutes from './routes/index.js';

const app = express();

import TweetService from './services/tweet-services.js'; 
import bodyParser from 'body-parser';
import e from 'express';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.listen(3000, async ()=>{
    console.log('server has started at Port: 3000');
    await connect();
    console.log('Database connected');
});