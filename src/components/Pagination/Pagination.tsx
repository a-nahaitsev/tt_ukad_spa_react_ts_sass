import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPages } from '../../utils/getPages';
import { scrollUp } from '../../utils/scrollUp';
import Icon from '../Icon/Icon';
import styles from './Pagination.module.scss';

type Props = {
  properties: {
    totalPagesNumber: number;
    currentPage: number;
    setCurrentPage: (prevValue: number) => void;
  };
};

export const Pagination: React.FC<Props> = ({ properties }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalPagesNumber, currentPage, setCurrentPage } = properties;

  const onPaginationClick = (page: number) => {
    scrollUp();
    setCurrentPage(page);
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  return (
    <ul className={styles.pagination}>
      <li className={styles.pagination__item}>
        <button
          className={styles.pagination__button}
          onClick={() => onPaginationClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon icon="chevron-thin-left" className={styles.pagination__icon} />
        </button>
      </li>

      {getPages(totalPagesNumber).map((page, index) => (
        <li className={styles.pagination__item} key={index}>
          <button
            className={classNames(styles.pagination__button, {
              [styles['pagination__button--active']]: page === currentPage,
            })}
            onClick={() => onPaginationClick(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li className={styles.pagination__item}>
        <button
          className={styles.pagination__button}
          onClick={() => onPaginationClick(currentPage + 1)}
          disabled={currentPage === totalPagesNumber}
        >
          <Icon icon="chevron-thin-right" className={styles.pagination__icon} />
        </button>
      </li>
    </ul>
  );
};
