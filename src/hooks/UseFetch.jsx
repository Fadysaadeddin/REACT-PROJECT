// hooks/useFetch.js

import { useState, useEffect } from 'react';

const useFetch = (url) => {
  // States to store response, loading, and error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset error and loading when URL changes
    setLoading(true);
    setError(null);

    // Fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // The hook will refetch when the `url` changes

  return { data, loading, error };
};

export default useFetch;
