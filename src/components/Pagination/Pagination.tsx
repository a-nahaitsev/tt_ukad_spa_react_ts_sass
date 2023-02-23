import classNames from 'classnames';
import React from 'react';
import styles from './Pagination.module.scss';

const LAST_PAGE_NUMBER = 18;

type Props = {
  currentPage: number;
  setCurrentPage: (prevValue: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
}) => {
  const getPages = (pagesNumber: number) => {
    const pages = [];

    for (let i = 0; i < pagesNumber; i++) {
      pages.push(i + 1);
    }

    return pages;
  };

  const handleLeftButtonClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleRightButtonClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <ul className={styles.pagination}>
      <li className={styles.pagination__item}>
        <button
          className={styles.pagination__button}
          onClick={handleLeftButtonClick}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
      </li>

      {getPages(LAST_PAGE_NUMBER).map((page, index) => (
        <li className={styles.pagination__item} key={index}>
          <button
            className={classNames(styles.pagination__button, {
              [styles['pagination__button--active']]: page === currentPage,
            })}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li className={styles.pagination__item}>
        <button
          className={styles.pagination__button}
          onClick={handleRightButtonClick}
          disabled={currentPage === LAST_PAGE_NUMBER}
        >
          {'>'}
        </button>
      </li>
    </ul>
  );
};
