import React from "react";
import { usePagination } from "../../../hooks/usePagination";
import "./Pagination.css";
import { PaginationDto } from "../../../types/paginationDto";
import { usePaginationRange } from "../../../hooks/usePaginationRange";

export default function Pagination({
  totalCount,
  pageSize,
  siblingCount,
}: PaginationDto) {
  const {
    pages,
    handleNextPageLoadMore,
    handleNextPage,
    handlePreviousPage,
    currentPage,
    handlePageChange,
  } = usePagination({ totalCount, pageSize, siblingCount });
  const pageArray = [];
  for (let i = 0; i < pages; i++) {
    pageArray.push(i + 1);
  }
  const paginationRange = usePaginationRange({
    pages,
    pageSize,
    currentPage,
    siblingCount,
  });

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
        <button
          className="pagination-prev"
          type="button"
          onClick={handlePreviousPage}
        >
          {"<"}
        </button>
        {paginationRange!.map((page) => {
          if (currentPage === page) {
            return (
              <button type="button" className="pagination-button active">
                {page}
              </button>
            );
          }
          return (
            <button
              type="button"
              className="pagination-button"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          className="pagination-nxt"
          type="button"
          onClick={handleNextPage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
