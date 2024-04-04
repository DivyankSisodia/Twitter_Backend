const Tweet = require('../models/tweets');

class TweetRepository{

    async create(data){
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            const tweets = await Tweet.find();
            return tweets;
        } catch (error) {
            console.log(error);
        }
    }

    async get(id){
        try {
            const tweet = await Tweet.findById(id);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id){
        try {
            const response = await Tweet.findByIdAndRemove(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getWithComments(id){
        try {
            const tweet = await Tweet.findById(id).populate('comments');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = TweetRepository();