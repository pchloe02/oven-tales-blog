import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useGetRecipes = ({ initialPage = 1, initialLimit = 10 } = {}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [pagination, setPagination] = useState(null);

  const fetchPage = useCallback(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    axios
      .get(`/api/articles?page=${page}&limit=${limit}`)
      .then((response) => {
        if (!mounted) return;
        const payload =
          response.data && response.data.data
            ? response.data.data
            : response.data;
        setRecipes(Array.isArray(payload) ? payload : []);
        setPagination(
          response.data && response.data.pagination
            ? response.data.pagination
            : null
        );
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("useGetRecipes axios error:", err);
        setError(err.message || "Unknown error");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [page, limit]);

  useEffect(() => {
    const cancel = fetchPage();
    return () => {
      if (typeof cancel === "function") cancel();
    };
  }, [fetchPage]);

  return {
    recipes,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    pagination,
  };
};

export default useGetRecipes;
