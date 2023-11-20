/* eslint-disable no-return-assign */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePagination } from "../../../hooks/usePagination";
import { usePaginationRange } from "../../../hooks/usePaginationRange";
import { PaginationDto } from "../../../types/paginationDto";

import "./Pagination.css";

export default function Pagination({
  totalCount,
  pageSize,
  siblingCount,
  currentPageCatalogue,
  pageParams,
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
    pageParams,
  });

  const initialSearch = pageParams.get("search");
  const includedTags = pageParams.get("included-tags");
  const excludedTags = pageParams.get("excluded-tags");
  const includedTypes = pageParams.get("included-types");
  const excludedTypes = pageParams.get("excluded-types");
  const status = pageParams.get("status");

  const createLink = (action: string, page: number) => {
    let link;
    if (action === "next-page") {
      if (currentPage !== pages) link = `?page=${currentPage + 1}`;
      else link = `?page=${currentPage}`;
    } else if (action === "previous-page") {
      if (currentPage !== 1) link = `?page=${currentPage - 1}`;
      else link = `?page=${currentPage}`;
    } else if (page) {
      link = `?page=${page}`;
    }
    if (initialSearch) link += `&search=${initialSearch}`;
    if (includedTags) link += `&included-tags=${includedTags}`;
    if (excludedTags) link += `&excluded-tags=${excludedTags}`;
    if (includedTypes) link += `&included-types=${includedTypes}`;
    if (excludedTypes) link += `&excluded-types=${excludedTypes}`;
    if (status) link += `&status=${status}`;
    return link;
  };

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
          to={createLink("previous-page")}
        >
          {"<"}
        </Link>
        {paginationRange?.map((page: number | string | Element) => {
          if (currentPage === page) {
            return (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <button
                type="button"
                className="pagination-button active"
                disabled
              >
                {page}
              </button>
            );
          }
          if (page === "..." && paginationRange?.[1] === page) {
            return (
              <button type="button" className="pagination-button" disabled>
                {page}
              </button>
            );
          }
          if (
            page === "..." &&
            // eslint-disable-next-line no-unsafe-optional-chaining
            paginationRange?.[paginationRange?.length - 2] === page
          ) {
            return (
              <button type="button" className="pagination-button" disabled>
                {page}
              </button>
            );
          }
          return (
            <Link
              type="button"
              className="pagination-button"
              onClick={() => handlePageChange(page)}
              to={createLink("some-page", page)}
            >
              {page}
            </Link>
          );
        })}
        <Link
          className="pagination-button"
          type="button"
          onClick={handleNextPage}
          to={createLink("next-page")}
        >
          {">"}
        </Link>
      </div>
    </div>
  );
}
