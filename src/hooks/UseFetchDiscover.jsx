import React, { useEffect, useState } from 'react';
const API_KEY = import.meta.env.VITE_API_KEY;

function UseFetchDiscover({ searchData, movieOrTv, page }) {
  const [dataDiscover, setDataDiscover] = useState([]);
  const [totalPagesDiscover, setTotalPagesDiscover] = useState([]);

  const type = movieOrTv === 'movie' ? 'movie' : 'tv';

  useEffect(() => {
    const getFetchDiscover = async () => {
      if (!searchData) return;

      let URL_DISCOVER;

      if (type === 'movie') {
        URL_DISCOVER = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&release_date.gte=${searchData.minYear}&release_date.lte=${searchData.maxYear}&sort_by=popularity.desc&with_genres=${searchData.id}`;
      } else if (type === 'tv') {
        URL_DISCOVER = `https://api.themoviedb.org/3/discover/${type}?first_air_date.gte=${searchData.minYear}&first_air_date.lte=${searchData.maxYear}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${searchData.id}`;
      }

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: API_KEY,
        },
      };

      try {
        const response = await fetch(URL_DISCOVER, options);
        const responseData = await response.json();

        setTotalPagesDiscover(responseData.total_pages);
        setDataDiscover(responseData.results);
      } catch (error) {
        console.error(`fetchDiscover error: ${error}`);
      }
    };

    getFetchDiscover();
  }, [searchData, type, page]);

  return { dataDiscover, totalPagesDiscover };
}

export default UseFetchDiscover;
