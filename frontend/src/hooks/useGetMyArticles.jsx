import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export const useGetMyArticles = () => {
  const [myArticles, setMyArticles] = useState([""]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    setloading(true);
    const config = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    axios
      .get("/api/auth/me/articles", config)
      .then((response) => {
        const payload =
          response.data && response.data.data
            ? response.data.data
            : response.data;

        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        Promise.all([payload, delay]).then(() => {
          setMyArticles(payload);
          setloading(false);
        });
      })
      .catch((err) => {
        console.error("Axios Error:", err);
        setError(err.message);
        setloading(false);
      });
  }, []);

  return { myArticles, loading, error };
};
