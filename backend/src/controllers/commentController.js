import Comment from "../models/Comment.js";
import QueryFeatures from '../utils/queryFeatures.js';
import AppError from '../utils/AppError.js';
import { catchAsync } from '../middleware/errorHandler.js';

const createComment = catchAsync(async (req, res, next) => {
    const { articleId } = req.params;
    // accept both french and english fields
    const content = req.body.content ?? req.body.contenu;
    const author = req.body.author ?? req.body.auteur ?? (req.user && (req.user.name || req.user.username || req.user.email));
    const email = req.body.email ?? (req.user && req.user.email);
    const authorId = req.user ? req.user._id : undefined;

    if (!articleId) {
        return next(new AppError('Article manquant', 400));
    }

    if (!content || (typeof content === 'string' && content.trim() === "")) {
        return next(new AppError("Le contenu du commentaire est requis", 400));
    }

    const comment = new Comment({
        content,
        author,
        authorId,
        email,
        article: articleId
    });

    await comment.save();

    res.status(201).json({
        status: 'success',
        data: {
            comment,
            message: `Commentaire ${comment.id} créé avec succès`
        }
    });
});


const getAllComments = catchAsync(async (req, res, next) => {
    const totalCount = await Comment.countDocuments();
    const features = new QueryFeatures(Comment.find(), req.query)
        .filter()
        .search()
        .sort()
        .limitFields()
        .paginate();


    const comments = await features.query;

    const paginationInfo = features.getPaginationInfo(totalCount);

    const response = {
        success: true,
        count: comments.length,
        totalCount: totalCount,
        data: comments
    };

    if (paginationInfo) {
        response.pagination = paginationInfo;
    }

    res.status(200).json(response);
})

const getCommentsByArticle = catchAsync(async (req, res, next) => {
    const { articleId } = req.params;
    if (!articleId) {
        return next(new AppError('Article manquant', 400));
    }
    const comments = await Comment.find({ article: articleId });
    res.status(200).json({
        status: 'success',
        results: comments.length,
        data: {
            comments
        }
    });
});

const deleteComment = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
        return next(new AppError('Commentaire non trouvé', 404));
    }

    // authorization: only author or admin can delete
    const isAdmin = req.user && req.user.role === 'admin';
    const isAuthor = req.user && (
        (comment.authorId && comment.authorId.equals(req.user._id)) ||
        (comment.author && (comment.author === req.user.name || comment.author === req.user.username || comment.author === req.user.email))
    );
    if (!isAdmin && !isAuthor) {
        return next(new AppError('Action non autorisée', 403));
    }

    await comment.remove();
    res.status(204).json({
        status: 'success',
        data: {
            message: `Commentaire ${id} supprimé avec succès`
        }
    });
});

const updateComment = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    // accept both french and english fields
    const content = req.body.content ?? req.body.contenu;

    if (content === undefined || (typeof content === 'string' && content.trim() === '')) {
        return next(new AppError("Le contenu du commentaire est requis", 400));
    }

    const update = { content };
    // allow updating author/email if provided
    if (req.body.author ?? req.body.auteur) {
        update.author = req.body.author ?? req.body.auteur;
    }
    if (req.body.email !== undefined) update.email = req.body.email;

    const comment = await Comment.findById(id);
    if (!comment) return next(new AppError('Commentaire non trouvé', 404));

    // authorization: only author or admin can edit
    const isAdmin = req.user && req.user.role === 'admin';
    const isAuthor = req.user && (
        (comment.authorId && comment.authorId.equals(req.user._id)) ||
        (comment.author && (comment.author === req.user.name || comment.author === req.user.username || comment.author === req.user.email))
    );
    if (!isAdmin && !isAuthor) {
        return next(new AppError('Action non autorisée', 403));
    }

    Object.assign(comment, update);
    if (update.author) comment.author = update.author;
    if (update.email !== undefined) comment.email = update.email;
    await comment.save();

    res.status(200).json({
        status: 'success',
        data: { comment }
    });
});

export { createComment, getAllComments, getCommentsByArticle, deleteComment, updateComment }