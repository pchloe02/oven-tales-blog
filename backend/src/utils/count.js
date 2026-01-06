import dotenv from 'dotenv';
dotenv.config();

import { connectDB, disconnectDB } from '../config/database.js';
import User from '../models/User.js';
import Article from '../models/Article.js';
import Comment from '../models/Comment.js';

const run = async () => {
    try {
        await connectDB();
        const users = await User.countDocuments();
        const articles = await Article.countDocuments();
        const comments = await Comment.countDocuments();
        console.log(`counts -> users: ${users}, articles: ${articles}, comments: ${comments}`);
        await disconnectDB();
        process.exit(0);
    } catch (err) {
        console.error('Error counting documents:', err);
        process.exit(1);
    }
};

run();
