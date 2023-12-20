import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FetchDiscover from '../../hooks/UseFetchDiscover';
import styles from './aside.module.css';
import { useCallback, useEffect, useState } from 'react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../AppContext';

const Aside = ({ genres, loading }) => {
  const {
    handleSearchData,
    changePage,
    page,
    setSearchName,
    isMenuOpen,
    toggleMenu,
  } = useAppContext();

  const [activeGenreId, setActiveGenreId] = useState(
    genres.length > 0 ? genres[0].id : null
  );

  const [selectGenre, setSelectGenre] = useState({
    id: null,
    minYear: 1999,
    maxYear: 2023,
    pages: page,
  });

  const fetchDiscover = FetchDiscover(page);

  // PARA OBTENER EL ID DEL GENERO

  const handleGenre = useCallback((id) => {
    setSelectGenre((prevSelectGenre) => ({
      ...prevSelectGenre,
      id: id,
    }));
    setActiveGenreId(id);
  }, []);

  // PARA OBTENER EL AÑO MINIMO DEL GENERO

  const handleMinYear = useCallback((minYear) => {
    setSelectGenre((prevSelectGenre) => ({
      ...prevSelectGenre,
      minYear: minYear,
    }));
  }, []);

  // PARA OBTENER EL AÑO MAXIMO DEL GENERO

  const handleMaxYear = useCallback((maxYear) => {
    setSelectGenre((prevSelectGenre) => ({
      ...prevSelectGenre,
      maxYear: maxYear,
    }));
  }, []);

  //handle Submit

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchData(selectGenre);
    setSearchName('');
  };

  // PARA CAMBIAR PAGES AL ESTADO ACTUAL

  useEffect(() => {
    if (activeGenreId === null && genres.length > 0) {
      handleGenre(genres[0].id);
    }
  }, [page, fetchDiscover]);

  console.log(isMenuOpen);

  return (
    <div
      className={`${styles.asideContainer} ${
        !isMenuOpen ? styles.asideContainerOpen : ''
      } `}
    >
      <aside className={`${styles.aside} ${isMenuOpen ? styles.open : ''}`}>
        <span className={styles.textAside}>Genre of movies and tv</span>
        {loading ? (
          <div className={styles.loadingContainer}>
            <h3>Loading ...</h3>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.btnGenreContainer}>
              {genres.map((genre) => (
                <div key={genre.id}>
                  <button
                    onClick={() => handleGenre(genre.id)}
                    className={`${styles.btnGenre} ${
                      activeGenreId === genre.id ? styles.active : ''
                    }`}
                  >
                    <FontAwesomeIcon
                      className={styles.iconGenre}
                      icon={faPlay}
                    />

                    <p className={styles.genreName}>{genre.name}</p>
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <span className={styles.textAside}>Year of release</span>

              <div className={styles.inputs}>
                <input
                  className={styles.input}
                  type="number"
                  min={1940}
                  max={2023}
                  placeholder="1940"
                  onChange={(e) => handleMinYear(e.target.value)}
                />
                <p>-</p>
                <input
                  className={styles.input}
                  type="number"
                  min={1940}
                  max={2023}
                  placeholder="2023"
                  onChange={(e) => handleMaxYear(e.target.value)}
                />
              </div>
              <div className={styles.btnContainer}>
                <button
                  onClick={() => {
                    changePage(1);
                    toggleMenu();
                  }}
                  type="submit"
                  className="btn"
                >
                  <p>Search</p>
                </button>
              </div>
            </form>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Aside;
