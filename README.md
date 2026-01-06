# Oven Tales

## Description

Oven Tales est une application de blog communautaire (backend + frontend) dédiée au partage de recettes de cuisine. Chaque utilisateur peut créer, éditer et partager ses recettes, commenter et interagir avec la communauté.

## Stack technique

- Backend : Node.js, Express, Mongoose
- Base de données : MongoDB
- Frontend : React (Vite)
- Auth : JWT
- Outils : Docker (option pour MongoDB), npm

## Prérequis

- Node.js (v16+ recommandé)
- npm
- Docker (si vous lancez MongoDB via Docker) ou une instance MongoDB accessible
- Git

## Instructions d'installation

1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd ecv_framework_js
```

2. Installer les dépendances backend

```bash
cd backend
npm install
```

3. Installer les dépendances frontend

```bash
cd ../frontend
npm install
```

4. Configuration `.env`

- Créez un fichier `.env` dans le dossier `backend` (copiez éventuellement un `.env.example` si présent).
- Variables communes à définir :
  - `MONGO_URI` : URI de connexion MongoDB (ex: `mongodb://localhost:27017/ecv_db`)
  - `JWT_SECRET` : clé secrète pour signer les JWT
  - `PORT` : port du serveur backend (par défaut: `3000`)
  - `CLIENT_URL` : URL du frontend (ex: `http://localhost:5173`)

Exemple `.env` minimal :

```
MONGO_URI=mongodb://localhost:27017/ecv_db
JWT_SECRET=change_me_secure
PORT=3000
CLIENT_URL=http://localhost:5173
```

5. Lancer MongoDB (Docker)

Vous pouvez utiliser le `docker-compose.yml` fourni dans `backend` ou lancer un conteneur MongoDB directement :

- Avec docker-compose (depuis le dossier `backend`) :

```bash
cd backend
docker-compose up -d
```

- Ou via `docker run` :

```bash
docker run -d --name ecv-mongo -p 27017:27017 -v mongo-data:/data/db mongo:6
```

6. Lancer le backend

Depuis le dossier `backend` :

```bash
# si un script dev est présent (nodemon)
npm run dev
# sinon
npm start
```

Le backend écoute sur le port défini dans `backend/.env` (par défaut `3000`).

7. Lancer le frontend

Depuis le dossier `frontend` :

```bash
npm run dev
```

Par défaut Vite démarre sur `http://localhost:5173` (ou autre port indiqué par Vite).

## Seeder

But: utilitaire pour peupler la base de données locale avec des `users`, `articles` et `comments` réalistes pour le développement et les tests.

Fichier: backend/src/utils/seeder.js

Variables d'environnement:

- MONGODB_URI: URI de connexion MongoDB utilisée par le backend (ex: mongodb://localhost:27017/ecv_db). Assurez-vous que cette variable est définie dans backend/.env.

Commandes:

```bash
# depuis le dossier racine du projet
cd backend

# Supprime toutes les données (users, articles, comments)
npm run seed:destroy

# Importe les données de seed
npm run seed

# OU tout enchaîner
npm run seed:destroy && npm run seed
```

Ce que le seeder crée:

- 3 utilisateurs (Alice, Bob, Clara)
- 27 articles (générés pour tester la pagination à 9 articles par page)
- 1 à 3 commentaires par article, chacun lié à un article et à un user

Dates: Les champs createdAt/updatedAt des articles et commentaires sont générés de façon réaliste mais plafonnés au 01/01/2026.

Vous pourrez vous connecter en utilisant les identifiants suivants :

```
{ name: 'Alice Admin', email: 'alice@example.com', password: 'password123', role: 'admin' },
{ name: 'Bob Contributor', email: 'bob@example.com', password: 'password123' },
{ name: 'Clara Reader', email: 'clara@example.com', password: 'password123' }
```

## Structure du projet

- `backend/`

  - `docker-compose.yml`
  - `package.json`
  - `src/`
    - `server.js`
    - `config/database.js`
    - `controllers/` — logique des routes (`articleController.js`, `authController.js`, `commentController.js`, `userController.js`)
    - `middleware/` — middleware (`auth.js`, `errorHandler.js`)
    - `models/` — modèles Mongoose (`Article.js`, `Comment.js`, `User.js`)
    - `routes/` — définitions des routes (`articles.js`, `auth.js`, `comments.js`)
    - `utils/`

- `frontend/`
  - `package.json`
  - `vite.config.js`
  - `public/`
  - `src/`
    - `main.jsx` / `index.css` / `App.jsx`
    - `components/`
    - `pages/`
    - `hooks/`
    - `context/`
    - `utils/`

## Contribuer

1. Forker le dépôt
2. Créer une branche descriptive (`feature/ma-fonctionnalite`)
3. Ouvrir une Pull Request détaillant les changements
