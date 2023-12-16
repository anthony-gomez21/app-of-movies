import { useAppContext } from '../../../../AppContext';
import styles from './searchName.module.css';

function SearchName({ movieOrTv, backPopular, openModal }) {
  const { submitSearch, searchName } = useAppContext();

  return (
    <div className={styles.containerContent}>
      <div className={styles.btnContainer}>
        <button onClick={() => backPopular()} className="btn">
          back to popular
        </button>
      </div>
      <h2 className={styles.title}>{submitSearch}</h2>
      <div className={styles.imgContainer}>
        {searchName.map((search) => (
          <div className={styles.imgPosterPathContainer} key={search.id}>
            <div
              onClick={() => openModal(search)}
              src={`https://image.tmdb.org/t/p/w500/$`}
              className={styles.imgPosterPath}
              style={{
                ...{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${search.poster_path})`,
                },
              }}
            ></div>
            <div>
              <h3 className={styles.name}>
                {movieOrTv === 'movie' ? search.title : search.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchName;
