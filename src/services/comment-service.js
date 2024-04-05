import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }
    
    async create(modelId, modelType, userId, content){
        // console.log("comment", modelId, modelType, userId, content);
        if(modelType == 'Tweet'){
            // find the tweet
            var commentable = await this.tweetRepository.get(modelId);
            console.log(commentable);
        }
        else if (modelType == 'Comment'){
            // find the comment
            var commentable = await this.commentRepository.get(modelId);
            console.log(commentable);
        }
        else{
            throw new Error('unknown model type');
        }

        console.log('Hi i got commentable and i am going for comment now')

        const comment = await this.commentRepository.create({
            content: content,
            userId: userId,
            onModel: modelType,
            commentable: modelId,
            comments: []
        });

        console.log(comment);

        commentable.comments.push(comment);
        await commentable.save();

        return comment;
    }
}

export default CommentService;