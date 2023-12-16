import React, { useState } from 'react';
import styles from './btnPages.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const BtnPages = ({
  page,
  changePage,
  totalPagesDiscover,
  totalPages,
  showPopulares,
}) => {
  const shouldShowBtnContainer = () => {
    if (showPopulares) {
      return page < Math.max(totalPages);
    } else if (!showPopulares) {
      return page < Math.max(totalPagesDiscover);
    }
  };

  return (
    <div>
      {shouldShowBtnContainer() && (
        <div className={styles.btnContainer}>
          <button
            onClick={() => changePage(page > 1 ? page - 1 : page)}
            className="btn"
          >
            <FontAwesomeIcon icon={faAnglesLeft} fade /> Previus
          </button>
          <span className={styles.textPage}> {page}</span>
          <button className="btn" onClick={() => changePage(page + 1)}>
            Next <FontAwesomeIcon icon={faAnglesRight} fade />
          </button>
        </div>
      )}
    </div>
  );
};

export default BtnPages;
