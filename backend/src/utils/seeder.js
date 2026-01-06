import dotenv from 'dotenv';
dotenv.config();

import { connectDB, disconnectDB } from '../config/database.js';
import User from '../models/User.js';
import Article from '../models/Article.js';
import Comment from '../models/Comment.js';

const usersData = [
    { name: 'Alice Admin', email: 'alice@example.com', password: 'password123', role: 'admin' },
    { name: 'Bob Contributor', email: 'bob@example.com', password: 'password123' },
    { name: 'Clara Reader', email: 'clara@example.com', password: 'password123' }
];

const articlesData = [

];

// Générer dynamiquement des recettes réalistes pour tester la pagination
const TOTAL_ARTICLES = 27; // 9 par page => 3 pages
const categories = ['Apéros', 'Entrées', 'Plats', 'Desserts', 'Astuces'];

const introductions = [
    'Hello les amis ! Découvrez ma recette secrète pour un plat délicieux et facile à préparer.',
    'Bonjour tout le monde ! Aujourd\'hui, un classique revisité qui plaira à toute la famille, garanti sans prise de tête !',
    'C\'est la recette parfaite pour les soirs de semaine, ce plat rapide est plein de saveurs.',
    'Coucou mes gourmands ! Voici une explosion de goûts dans chaque bouchée, idéal pour impressionner vos invités.',
    'Cette recette saine et gourmande deviendra vite un incontournable de votre cuisine.'
];
const mains = ['poulet', 'saumon', 'aubergine', 'courgette', 'bœuf', 'lentilles', 'pommes de terre', 'poireau', 'champignons', 'cabillaud'];
const methods = ['Rôti', 'Grillé', 'Sauté', 'En papillote', 'Confit', 'Poêlé', 'Braisé', 'Au four', 'En cocotte'];
const modifiers = ['aux herbes', 'à la moutarde', 'au citron', 'à la provençale', 'crémeux', 'épicé', 'végétarien', 'facile', 'express', 'traditionnel'];

function makeRecipe(i) {
    const main = mains[i % mains.length];
    const method = methods[i % methods.length];
    const mod = modifiers[(i + 2) % modifiers.length];
    const titre = `${method} de ${main} ${mod}`;
    const intro = introductions[i % introductions.length];

    const baseIngredients = [
        `500 g de ${main}`,
        "2 cuillères à soupe d'huile d'olive",
        '1 oignon émincé',
        "2 gousses d'ail hachées",
        'Sel et poivre au goût'
    ];
    if (main === 'saumon' || main === 'cabillaud') baseIngredients[0] = `4 filets de ${main}`;
    if (main === 'lentilles') baseIngredients[0] = '300 g de lentilles vertes';

    const steps = [
        'Préchauffer le four à 180°C si nécessaire.',
        `Assaisonner ${main} avec sel, poivre et herbes.`,
        'Faire revenir l’oignon et l’ail, puis cuire le plat selon la méthode choisie.',
        'Vérifier la cuisson et servir chaud avec un accompagnement léger.'
    ];

    const contenu = `${intro}\n\n Ingrédients:\n- ${baseIngredients.join('\n- ')}\n\nPréparation:\n1. ${steps.join('\n2. ')}`;
    return { titre, contenu, categorie: categories[i % categories.length], };
}

if (articlesData.length < TOTAL_ARTICLES) {
    for (let i = articlesData.length; i < TOTAL_ARTICLES; i++) {
        articlesData.push(makeRecipe(i));
    }
}

// Les commentaires seront générés après la création des articles ci-dessous

const importData = async () => {
    try {
        await connectDB();

        await Comment.deleteMany();
        await Article.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.create(usersData);

        // Build articles with realistic createdAt/updatedAt timestamps
        // Ensure no date is after 2026-01-01
        const MAX_DATE = new Date('2026-01-01T00:00:00Z').getTime();
        const articlesToCreate = articlesData.map((a, i) => {
            const daysAgo = Math.floor(Math.random() * 90); // within last 90 days
            const extraMs = Math.floor(Math.random() * 24 * 60 * 60 * 1000);
            // base created time anchored to MAX_DATE
            const createdAtTs = Math.max(0, MAX_DATE - (daysAgo * 24 * 60 * 60 * 1000) - extraMs);
            const createdAt = new Date(createdAtTs);
            // updatedAt within 7 days after creation but never after MAX_DATE
            const updatedAt = new Date(Math.min(createdAtTs + Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000), MAX_DATE));

            return {
                ...a,
                auteur: createdUsers[i % createdUsers.length]._id,
                createdAt,
                updatedAt
            };
        });

        const createdArticles = await Article.create(articlesToCreate);

        // Générer automatiquement 1 à 3 commentaires par article et les lier, avec dates réalistes
        const commentsToCreate = [];
        createdArticles.forEach((article, idx) => {
            const numComments = (idx % 3) + 1; // 1, 2 ou 3
            for (let c = 0; c < numComments; c++) {
                const user = createdUsers[(idx + c) % createdUsers.length];
                // comment date a bit after article createdAt, but never after MAX_DATE
                const articleCreated = new Date(article.createdAt).getTime();
                const commentOffset = Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000); // up to 7 days
                const commentCreatedTs = Math.min(articleCreated + commentOffset, MAX_DATE);
                const commentCreatedAt = new Date(commentCreatedTs);
                const commentUpdatedAt = new Date(Math.min(commentCreatedTs + Math.floor(Math.random() * 24 * 60 * 60 * 1000), MAX_DATE));

                commentsToCreate.push({
                    content: `Commentaire ${c + 1} pour ${article.titre}`,
                    author: user.name,
                    email: user.email,
                    article: article._id,
                    authorId: user._id,
                    published: true,
                    createdAt: commentCreatedAt,
                    updatedAt: commentUpdatedAt
                });
            }
        });

        await Comment.create(commentsToCreate);

        console.log('✅ Données de seed importées avec succès');
        await disconnectDB();
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'import des données :', error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await Comment.deleteMany();
        await Article.deleteMany();
        await User.deleteMany();
        console.log('🗑️  Toutes les données ont été supprimées');
        await disconnectDB();
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de la suppression des données :', error);
        process.exit(1);
    }
};

const run = async () => {
    const arg = process.argv[2];
    if (arg === '--destroy') return await destroyData();
    return await importData();
};

run();
