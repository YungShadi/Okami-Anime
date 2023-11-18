/* eslint-disable no-return-assign */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePagination } from "../../../hooks/usePagination";
import { PaginationDto } from "../../../types/paginationDto";
import { usePaginationRange } from "../../../hooks/usePaginationRange";

import "./Pagination.css";

export default function Pagination({
  totalCount,
  pageSize,
  siblingCount,
  currentPageCatalogue,
}: PaginationDto) {
  const {
    pages,
    handleNextPageLoadMore,
    handleNextPage,
    handlePreviousPage,
    currentPage,
    handlePageChange,
  } = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPageCatalogue,
  });

  const pageArray = [];

  for (let i = 0; i < pages; i++) {
    pageArray.push(i + 1);
  }

  const paginationRange = usePaginationRange({
    totalCount,
    pageSize,
    currentPage,
    siblingCount,
  });

  useEffect(() => {
    handlePageChange(currentPageCatalogue);
  }, []);

  return (
    <div className="pagination-wrapper">
      <button
        type="button"
        onClick={handleNextPageLoadMore}
        className="pagination-load-more"
      >
        Загрузить еще...
      </button>
      <div className="catalogue-pagination">
        <Link
          className="pagination-button"
          type="button"
          onClick={handlePreviousPage}
          to={`?page=${currentPage - 1}`}
        >
          {"<"}
        </Link>
        {paginationRange?.map((page: number | string | Element) => {
          if (currentPage === page) {
            return (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <Link type="button" className="pagination-button active" to="#">
                {page}
              </Link>
            );
          }
          if (page === "..." && paginationRange?.[1] === page) {
            return (paginationRange[1] = (
              <button type="button" className="pagination-button" disabled>
                {page}
              </button>
            ));
          }
          if (
            page === "..." &&
            // eslint-disable-next-line no-unsafe-optional-chaining
            paginationRange?.[paginationRange?.length - 2] === page
          ) {
            return (paginationRange[paginationRange.length - 2] = (
              <button type="button" className="pagination-button" disabled>
                {page}
              </button>
            ));
          }
          return (
            <Link
              type="button"
              className="pagination-button"
              onClick={() => handlePageChange(page)}
              to={`?page=${page}`}
            >
              {page}
            </Link>
          );
        })}
        <Link
          className="pagination-button"
          type="button"
          onClick={handleNextPage}
          to={`?page=${currentPage + 1}`}
        >
          {">"}
        </Link>
      </div>
    </div>
  );
}
