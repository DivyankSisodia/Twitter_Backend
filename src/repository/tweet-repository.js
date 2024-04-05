import Tweet from '../models/tweets.js';
import Comment from '../models/comment.js';
import CrudRepository from './crud-repository.js';

class TweetRepository extends CrudRepository {

    constructor() {
        super(Tweet);
    }

    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id)
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'comments',
                        }
                    }
                })
                .lean();
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(offset, limit) {
        try {
            const tweets = await Tweet.find().skip(offset).limit(limit);
            return tweets;
        } catch (error) {
            console.log(error);
        }
    }

    async find(id) {
        try {
            const tweet = await Tweet.findById(id).populate({ path: 'likes' });
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
}

export default TweetRepository;
