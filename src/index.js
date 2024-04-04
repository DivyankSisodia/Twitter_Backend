const express = require('express');
const connect = require('./config/database');

const app = express();

const TweetService = require('./services/tweet-services');

app.listen(3000, async ()=>{
    console.log('server has started at Port: 3000');
    await connect();
    console.log('Database connected');

    let services = new TweetService();
    const tweet = await services.create({
        content: 'this is my #first #tweet',
    });
    console.log(tweet);
});