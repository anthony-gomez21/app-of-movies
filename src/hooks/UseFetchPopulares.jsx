import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

function UseFetchPopulares({ movieOrTv, page, setLoading }) {
  const type = movieOrTv === 'movie' ? 'movie' : 'tv';

  const URL_POPULAR = `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${page}`;

  const [populares, setPopulares] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  useEffect(() => {
    const getPopulares = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: API_KEY,
        },
      };

      try {
        const response = await fetch(URL_POPULAR, options);
        const data = await response.json();
        setTotalPages(data.total_pages);
        setPopulares(data.results);
      } catch (error) {
        throw new Error(`Error fetch Popular ${error}`);
      } finally {
        setLoading(false);
      }
    };

    getPopulares();
  }, [type, page]);

  return { populares, totalPages };
}

export default UseFetchPopulares;
