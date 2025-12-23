import { useState, useEffect } from "react";
import axios from "axios";

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/articles")
      .then((response) => {
        const payload =
          response.data && response.data.data
            ? response.data.data
            : response.data;

        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        Promise.all([payload, delay]).then(() => {
          setArticles(payload);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error("Axios Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { articles, loading, error };
};
