import Like from '../models/like.js';
import CrudRepository from './crud-repository.js';

class LikeRepository extends CrudRepository{
    constructor(){
        super(Like);
    }

    async findByUserAndLikeable(data) {
        try {
            const like = await this.model.findOne(data).exec(); // Make sure to use exec() to execute the query
            return like;
        } catch (error) {
            throw error;
        }
    }
}

export default LikeRepository;