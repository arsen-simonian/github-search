import React, { useEffect, useMemo, useState } from 'react';
import { range } from 'lodash';

import styles from './styles.module.sass';
import clsx from 'clsx';

const MAX_PAGES_COUNT = 100;

export type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  currentPage: number;
  gap?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  onPageChange,
  currentPage,
  gap = 3
}) => {
  const pagesCount = Math.min(MAX_PAGES_COUNT, Math.ceil(totalItems / itemsPerPage));

  const pages = useMemo(() => range(1, pagesCount + 1), [pagesCount]);

  const [{ startIndex, endIndex }, setDimensions] = useState(() => ({
    startIndex: Math.max(currentPage - gap, 0),
    endIndex: Math.min(MAX_PAGES_COUNT, currentPage + gap, pages[pages.length - 1]),
  }))

  const visibleItems = pages.slice(startIndex, endIndex)

  useEffect(() => {
    if (currentPage <= startIndex || currentPage >= endIndex) {
      setDimensions({
        startIndex: Math.max(Math.ceil(currentPage - gap), 0),
        endIndex: Math.min(MAX_PAGES_COUNT, Math.ceil(currentPage + gap), pages[pages.length - 1]),
      })
    }
  }, [currentPage, endIndex, gap, pages, startIndex])

  return (
    <div className={styles.pagination}>
      {
        !visibleItems.includes(1) && (
          <>
            <span
              key="1"
              onClick={() => onPageChange(1)}
              className={clsx(styles.pagination__item, {
                [styles.pagination__item__active]: currentPage === 1
              })}
            >
              1
            </span>
            {visibleItems[0] > 2 && (
              <span
                className={styles.pagination__dots}
              >
                ...
              </span>
            )}
          </>
        )
      }
      {
        visibleItems.map(pageNumber => (
          <span
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={clsx(styles.pagination__item, {
              [styles.pagination__item__active]: currentPage === pageNumber
            })}
          >
            {pageNumber}
          </span>
        ))
      }
      {
        !visibleItems.includes(pages[pages.length - 1]) && (
          <>
            <span
              className={styles.pagination__dots}
            >
              ...
            </span>
            <span
              onClick={() => onPageChange(pages[pages.length - 1])}
              className={clsx(styles.pagination__item, {
                [styles.pagination__item__active]: currentPage === pages[pages.length - 1]
              })}
            >
              {pages[pages.length - 1]}
            </span>
          </>
        )
      }
    </div>
  )
};

export default Pagination;