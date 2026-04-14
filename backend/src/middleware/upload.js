import multer from 'multer';
import path from 'path';

// Configuration de multer pour stocker temporairement les fichiers en mémoire
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Vérifier le type de fichier
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Format d\'image invalide. Acceptés: JPEG, PNG, GIF, WebP'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max
    }
});

export default upload;
