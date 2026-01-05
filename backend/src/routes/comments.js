import express from 'express';
const router = express.Router();

import { createComment, getAllComments, getCommentsByArticle, deleteComment, updateComment } from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js';

router.post('/:articleId', protect, createComment);
router.get('/', getAllComments);
router.get('/:articleId', getCommentsByArticle);
router.delete('/:id', protect, deleteComment);
router.patch('/:id', protect, updateComment);
export default router;