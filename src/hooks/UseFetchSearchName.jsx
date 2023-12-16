import React, { useEffect, useState } from 'react';
const API_KEY = import.meta.env.VITE_API_KEY;

function UseFetchSearchName({ submitSearch, movieOrTv }) {
  const type = movieOrTv === 'movie' ? 'movie' : 'tv';
  const [fetchSearchName, setFetchSearchName] = useState([]);

  const URL_NAME = `https://api.themoviedb.org/3/search/${type}?query=${submitSearch}&include_adult=false&language=en-US&page=1`;

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: API_KEY,
        },
      };

      try {
        const response = await fetch(URL_NAME, options);
        const data = await response.json();
        setFetchSearchName(data.results);
      } catch (error) {
        console.log(`Error fetch UseFetchSearchName : ${error}  `);
      }
    };

    fetchMovies();
  }, [submitSearch]);

  return { fetchSearchName };
}

export default UseFetchSearchName;
