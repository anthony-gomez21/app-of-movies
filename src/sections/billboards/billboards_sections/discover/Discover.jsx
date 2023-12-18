import { useAppContext } from '../../../../AppContext';
import BtnPages from '../../../../components/btnPages/BtnPages';
import styles from './discover.module.css';

function Discover({
  changePopular,
  movieOrTv,
  dataDiscover,
  openModal,
  totalPagesDiscover,
  totalPages,
}) {
  const { showPopulares, page, changePage } = useAppContext();

  return (
    <div className={styles.containerContent}>
      <div className={styles.btnContainer}>
        <button onClick={changePopular} className="btn">
          back to popular
        </button>
      </div>

      <h2 className={styles.title}>
        {movieOrTv === 'movie' ? 'Movies' : 'Tv'}
      </h2>

      <div className={styles.imgContainer}>
        {dataDiscover.length > 0 ? (
          dataDiscover.map((discover) => (
            <div
              className={styles.imgPosterPathContainer}
              key={discover.id}
              onClick={() => openModal(discover)}
            >
              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${discover.poster_path})`,
                }}
                className={styles.imgPosterPath}
              ></div>
              <div>
                <h3>
                  {movieOrTv === 'movie'
                    ? discover.original_title
                    : discover.original_name}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <h1>No hay resultados </h1>
        )}
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

export default Discover;
