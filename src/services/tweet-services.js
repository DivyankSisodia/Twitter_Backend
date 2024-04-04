const {TweetRepository} = require('../repository/tweet-repository')

class TweetService{
    constructor(){
        this.tweetRepository = new TweetRepository();
    }



}


module.exports = TweetService;
