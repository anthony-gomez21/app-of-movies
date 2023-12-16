import { useEffect, useState } from 'react';
import styles from './billboards.module.css';
import FetchPopulares from '../../hooks/UseFetchPopulares';
import Modal from '../../components/modal/Modal';
import UseFetchSearchName from '../../hooks/UseFetchSearchName';
import { useAppContext } from '../../AppContext';
import SearchName from './billboards_sections/searchName/SearchName';
import Populares from './billboards_sections/populares/Populares';
import Discover from './billboards_sections/discover/Discover';

const Billboards = ({ dataDiscover, movieOrTv, totalPagesDiscover }) => {
  const {
    showPopulares,
    setShowPopulares,
    page,
    submitSearch,
    setSearchName,
    searchName,
    setSubmitSearch,
  } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPopular, setSelectedPopular] = useState(null);
  const { populares, totalPages } = FetchPopulares({
    movieOrTv,
    page,
    setLoading,
  });
  const { fetchSearchName } = UseFetchSearchName({ submitSearch, movieOrTv });

  // ====== SHOW POPULAR AND SCROLL ========

  const changePopular = () => {
    scrollToTop();
    setShowPopulares(!showPopulares);
  };

  // ========== OPEN AND CLOSE MODAL =========

  const openModal = (element) => {
    setSelectedPopular(element);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPopular(null);
    setShowModal(false);
  };

  //  ====== RESTORE BACK-POPULAR  ========
  const backPopular = () => {
    setSearchName('');
    setSubmitSearch('');
  };

  //  ====== SCROLL-TOP ========

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToTop();

    const filteredResults = fetchSearchName.filter((result) => {
      if (result) {
        if (movieOrTv === 'movie' && result.original_title) {
          return result.original_title
            .toLowerCase()
            .includes(submitSearch.toLowerCase());
        } else if (movieOrTv === 'tv' && result.original_name) {
          return result.original_name
            .toLowerCase()
            .includes(submitSearch.toLowerCase());
        }
      }
      return false;
    });

    setSearchName(filteredResults);
  }, [page, submitSearch, fetchSearchName]);

  return (
    <div className={styles.container}>
      {loading ? (
        <h3 className={styles.loading}>Loading...</h3>
      ) : // ================ SEARCH BY NAME ================================
      searchName.length > 0 ? (
        <SearchName
          movieOrTv={movieOrTv}
          backPopular={backPopular}
          openModal={openModal}
        />
      ) : // ================ POPULAR MOVIES OR TV ================================
      showPopulares ? (
        <Populares
          movieOrTv={movieOrTv}
          populares={populares}
          totalPagesDiscover={totalPagesDiscover}
          totalPages={totalPages}
          openModal={openModal}
        />
      ) : //  ======== SEARCH BY GENRE ==========================================

      dataDiscover ? (
        <Discover
          changePopular={changePopular}
          movieOrTv={movieOrTv}
          dataDiscover={dataDiscover}
          openModal={openModal}
          totalPagesDiscover={totalPagesDiscover}
          totalPages={totalPages}
        />
      ) : null}

      {/*== SHOW MODAL =========== */}

      {showModal && selectedPopular && (
        <Modal element={selectedPopular} onClose={closeModal} />
      )}
    </div>
  );
};

export default Billboards;
