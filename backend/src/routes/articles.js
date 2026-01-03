import express from 'express';
const router = express.Router();

import {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,

} from '../controllers/articleController.js';
import { protect } from '../middleware/auth.js';

router.get('/', getAllArticles);
router.get('/:id', getArticleById);

router.use(protect);
router.post('/', createArticle);
router.patch('/:id', updateArticle);
router.delete('/:id', deleteArticle);


export default router;
