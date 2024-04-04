import express from 'express';
import connect from './config/database.js';

import apiRoutes from './routes/index.js';

import {UserRepository, TweetRepository} from './repository/index.js';

import LikeService from './services/like-service.js';

const app = express();

import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.listen(3000, async ()=>{
    console.log('server has started at Port: 3000');
    await connect();
    console.log('Database connected');

    const userRepo = new UserRepository();
    const tweetRepo = new TweetRepository();
    const tweets = await tweetRepo.getAll(0, 10);
    const users = await userRepo.getAll();
    const likeService = new LikeService();
    console.log("user",users[0].id)
    await likeService.toggleLike(tweets[0].id, 'Tweet', users[0].id);
});