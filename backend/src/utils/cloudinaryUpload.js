import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

export const uploadToCloudinary = (buffer, fileName) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                public_id: `articles/${Date.now()}-${fileName}`,
                folder: 'ecv_framework'
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id
                    });
                }
            }
        );

        // Convertir le buffer en stream et le passer à Cloudinary
        Readable.from(buffer).pipe(stream);
    });
};

export const deleteFromCloudinary = async (public_id) => {
    try {
        await cloudinary.uploader.destroy(public_id);
        console.log('Image supprimée de Cloudinary');
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'image:', error);
        throw error;
    }
};
