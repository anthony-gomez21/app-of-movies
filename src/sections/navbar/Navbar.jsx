import React, { useState } from 'react';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSearch, faTv } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../AppContext';

const Navbar = () => {
  const { movieOrTv, typeChange, setSubmitSearch, search, setSearch } =
    useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitSearch(search);
    setSearch('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>App Of Movies</h1>

      <nav className={styles.navbar}>
        <div className={styles.containerBtn}>
          <button
            onClick={() => typeChange('movie', 1)}
            className={movieOrTv === 'movie' ? 'btn active' : 'btn'}
          >
            Movies
            <FontAwesomeIcon className={styles.iconBtn} icon={faFilm} />
          </button>

          <button
            onClick={() => typeChange('tv', 1)}
            className={movieOrTv === 'tv' ? 'btn active' : 'btn'}
          >
            Tv
            <FontAwesomeIcon className={styles.iconBtn} icon={faTv} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            type="text"
            placeholder="Avengers, Leo, The Creator ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">
            <FontAwesomeIcon className={styles.iconTop} icon={faSearch} />
            <FontAwesomeIcon className={styles.icon} icon={faSearch} />
          </button>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
