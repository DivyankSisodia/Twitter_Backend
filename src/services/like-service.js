import { LikeRepository, TweetRepository } from '../repository/index.js';
import Tweet from '../models/tweets.js';

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) { // /api/v1/likes/toggle?id=modelid&type=Tweet
        console.log(modelId, modelType, userId);
        if (modelType == 'Tweet') {
            var likeable = await this.tweetRepository.find(modelId)
        } else if (modelType == 'Comment') {  
            // TODO
        } else {
            throw new Error('unknown model type');
        }
        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });
        console.log("exists", exists);
        if (exists) {
            const removedLike = await this.likeRepository.destroy(exists._id); // Adjust this line based on your repository implementation

            likeable.likes.pull(exists._id);
            await likeable.save();

            console.log('Before removal:', likeable);
            console.log('Removed like:', removedLike);

            var isAdded = false;

        } else {
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
            likeable.likes.push(newLike);
            await likeable.save();

            console.log(likeable);

            var isAdded = true;
            console.log('newLike', userId)
        }
        return isAdded;
    }
}

export default LikeService;