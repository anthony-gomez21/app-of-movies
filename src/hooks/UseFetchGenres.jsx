import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

function UseFetchGenres({ movieOrTv }) {
  const type = movieOrTv === 'movie' ? 'movie' : 'tv';

  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL_GENRES = `https://api.themoviedb.org/3/genre/${type}/list?language=en`;

  useEffect(() => {
    const getGenresFetch = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: API_KEY,
        },
      };

      try {
        const response = await fetch(URL_GENRES, options);
        const data = await response.json();

        setGenres(data.genres);
      } catch (error) {
        throw new Error(`Error fetch genres ${error}`);
      } finally {
        setLoading(false);
      }
    };

    getGenresFetch();
  }, [movieOrTv]);

  return { genres, loading };
}

export default UseFetchGenres;
