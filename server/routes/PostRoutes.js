import express from 'express';
import * as PostsController from '../controllers/PostController.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = express.Router();

router.get('/posts/:type', PostsController.getAll);
router.get('/tags', PostsController.getLastTags);
router.get('/post/:id', PostsController.getOne);
router.post('/posts', checkAuth, PostsController.createPost);
router.delete('/posts/:id', checkAuth, PostsController.deletePost);
router.patch('/posts/:id', checkAuth, PostsController.updatePost);

export default router;
