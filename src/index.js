const express = require('express');
const connect = require('./config/database');
const Tweet = require('./models/tweets');
const Comment = require('./models/comment');
const app = express();

app.listen(3000, async ()=>{
    console.log('server has started at Port: 3000');
    await connect();
    console.log('Database connected');
    // const tweet = await Tweet.create({content: 'my tweet'});
    // console.log(tweet);
    // tweet.comments.push({content: 'my comment'});
    // await tweet.save();
    // console.log(tweet);

    const tweet = await Tweet.create({content: 'tweet with comment schema'});
    const comment = await Comment.create({content: 'comment with tweet schema'}); 

    tweet.comments.push(comment);
    await tweet.save();
    console.log(tweet);
})