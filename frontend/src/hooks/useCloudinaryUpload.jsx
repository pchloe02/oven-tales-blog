import { useState } from "react";

export default function useCloudinaryUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'upload Cloudinary");
      }

      const data = await response.json();

      setLoading(false);
      return {
        url: data.secure_url,
        public_id: data.public_id,
      };
    } catch (err) {
      const message = err.message || "Erreur lors de l'upload";
      setError(message);
      setLoading(false);
      throw err;
    }
  };

  return { uploadImage, loading, error };
}
