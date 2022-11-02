import express from 'express';
import { postController } from '../controllers/postController';

const router = express.Router();

router.get('/', postController);

export default router;
