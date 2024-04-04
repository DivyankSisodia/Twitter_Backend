import TweetService from '../services/tweet-services.js';

const tweetService = new TweetService();

export const createTweet = async (req, res) => {
    try {
        console.log(req.body);
        const response = await tweetService.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Tweet created successfully',
            data: response,
            err: {},
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Tweet creation failed',
            data: {},
            err: error,
        });
    }
};