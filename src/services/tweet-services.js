import { TweetRepository, HashtagRepository } from '../repository/index.js';

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        try {
            const content = data.content;
            console.log(data)
            let tags = content.match(/#[a-zA-Z0-9_]+/g);
            if (tags && tags.length > 0) {
                tags = tags
                    .map((tag) => tag.substring(1))
                    .map((tag) => tag.toLowerCase());
            }
            const tweet = await this.tweetRepository.create(data);
            await tweet.save();
            if (tags && tags.length > 0) {
                let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
                let titleOfPresentTags = alreadyPresentTags.map((tags) => tags.title);

                let newTags = tags.filter((tag) => !titleOfPresentTags.includes(tag));
                newTags = newTags.map((tag) => {
                    return {
                        title: tag,
                        tweets: [tweet.id],
                    };
                });
                console.log(newTags);
                await this.hashtagRepository.bulkCreate(newTags);

                alreadyPresentTags.forEach((tag) => {
                    tag.tweets.push(tweet.id);
                    tag.save();
                });
            }
            console.log(tweet);

            return tweet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService;
