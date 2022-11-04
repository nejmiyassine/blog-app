import express from 'express';
import {
  addPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from '../controllers/postController';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default router;
