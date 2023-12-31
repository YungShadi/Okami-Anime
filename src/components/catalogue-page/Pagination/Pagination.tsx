/* eslint-disable no-return-assign */
import React, { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePagination } from "../../../hooks/usePagination";
import { usePaginationRange } from "../../../hooks/usePaginationRange";
import { PaginationDto } from "../../../types/paginationDto";

import "./Pagination.css";

function PaginationComponent({
  totalCount,
  pageSize,
  siblingCount,
  currentPageCatalogue,
  pageParams,
  handlePageChangeCatalogue,
  search,
  isLoadMoreButton,
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
    handlePageChangeCatalogue,
    isLoadMoreButton,
    search,
  });

  const initialSearch = pageParams.get("search");
  const includedTags = pageParams.get("active_tags");
  const excludedTags = pageParams.get("excluded_tags");
  const includedTypes = pageParams.get("active_types");
  const excludedTypes = pageParams.get("excluded_types");
  const status = pageParams.get("status");
  const pageSearch = pageParams.get("page");
  const navigate = useNavigate();

  if (Number(pageSearch) > pages) {
    // eslint-disable-next-line no-restricted-globals
    navigate(`${location.pathname}?page=1`);
  }

  const createLink = (action: string, page?: number): string => {
    let link = "";
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
    if (includedTags) link += `&active_tags=${includedTags}`;
    if (excludedTags) link += `&excluded_tags=${excludedTags}`;
    if (includedTypes) link += `&active_types=${includedTypes}`;
    if (excludedTypes) link += `&excluded_types=${excludedTypes}`;
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
      {isLoadMoreButton && (
        <Link
          type="button"
          onClick={handleNextPageLoadMore}
          className="pagination-load-more"
          to={createLink("next-page")}
        >
          Загрузить еще...
        </Link>
      )}
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
              onClick={() => handlePageChange(Number(page))}
              to={createLink("some-page", Number(page))}
            >
              {Number(page)}
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
// eslint-disable-next-line import/prefer-default-export
export const Pagination = memo(PaginationComponent);
