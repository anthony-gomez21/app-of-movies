import styles from './modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ element, onClose }) => {
  const backdropStyle = {
    backgroundImage: `url('https://image.tmdb.org/t/p/w500/${element.backdrop_path}')`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalContant} style={backdropStyle}>
        <div className={styles.dataContainer}>
          <img
            className={styles.poster_path}
            src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
            alt=""
          />

          <div className={styles.textContainer}>
            <button className={styles.onClose} onClick={onClose}>
              <FontAwesomeIcon className={styles.icon} icon={faXmark} />
            </button>

            <div className={styles.textContent}>
              <h2 className={styles.title}>
                {element.original_title || element.name}
              </h2>
              <h3 className={styles.date}>
                {element.release_date || element.first_air_date}
              </h3>
              <p className={styles.overview}>{element.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
