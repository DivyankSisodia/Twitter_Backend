import Tweet from '../models/tweets.js';

class TweetRepository{

    async create(data){
        try {
            const tweet = await Tweet.create(data);
            console.log(tweet);
            return tweet;
        } catch (error) {
            console.log('something went wrong in tweet repository');
            throw error;
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

export default TweetRepository;