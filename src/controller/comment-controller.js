import CommentService from "../services/comment-service.js";

const commentService = new CommentService();

export const createComment = async(req, res) => {
    try {
        const  response = await commentService.create(req.query.modelId, req.query.modelType, req.body.userId, req.body.content);
        // console.log(response)
        return res.status(200).json({
            success: true,
            data: response,
            message: 'successfully created comment',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {},
            message: 'something went wrong',
            err: error
        })
    }
}
