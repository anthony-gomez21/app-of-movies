import { useAppContext } from '../../../../AppContext';
import BtnPages from '../../../../components/btnPages/BtnPages';

import styles from './populares.module.css';

function Populares({
  movieOrTv,
  populares,
  totalPagesDiscover,
  totalPages,
  openModal,
}) {
  const { showPopulares, changePage, page } = useAppContext();

  return (
    <div className={styles.containerContent}>
      <h2 className={styles.title}>
        {movieOrTv === 'movie' ? 'Popular Movies' : 'Popular Tv'}
      </h2>

      <div className={styles.imgContainer}>
        {populares.map((popular) => (
          <div key={popular.id}>
            <div
              onClick={() => openModal(popular)}
              className={styles.imgPosterPath}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${popular.poster_path})`,
              }}
            ></div>
            <h3 className={styles.name}>
              {movieOrTv === 'movie' ? popular.title : popular.name}
            </h3>
          </div>
        ))}
      </div>

      {/*== BTN NEXT AND PREVIUS =========== */}

      <BtnPages
        page={page}
        changePage={changePage}
        totalPagesDiscover={totalPagesDiscover}
        totalPages={totalPages}
        showPopulares={showPopulares}
      />
    </div>
  );
}

export default Populares;
