import express from 'express';

import { createTweet, getTweet } from '../../controller/tweet-controller.js';
import { toggleLike } from '../../controller/like-controller.js';
import { createComment } from '../../controller/comment-controller.js';
import { signUp } from '../../controller/auth-controller.js';

const router = express.Router();

router.post('/tweets', createTweet);
router.get('/tweets/:id', getTweet);

router.post('/likes/toggle', toggleLike);

router.post('/comments', createComment);

router.post('/signup', signUp);

export default router;

