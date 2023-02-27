import classNames from 'classnames';
import React from 'react';
import { getPages } from '../../utils/getPages';
import Icon from '../Icon/Icon';
import styles from './Pagination.module.scss';

const TOTAL_PAGES_NUMBER = 18;

type Props = {
  currentPage: number;
  setCurrentPage: (prevValue: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
}) => {
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
          <Icon icon="chevron-thin-left" className={styles.pagination__icon} />
        </button>
      </li>

      {getPages(TOTAL_PAGES_NUMBER).map((page, index) => (
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
          disabled={currentPage === TOTAL_PAGES_NUMBER}
        >
          <Icon icon="chevron-thin-right" className={styles.pagination__icon} />
        </button>
      </li>
    </ul>
  );
};
