import { useState } from "react";
import { PaginationDto } from "../types/paginationDto";

// eslint-disable-next-line import/prefer-default-export
export const usePagination = ({
  totalCount,
  pageSize, // siblingCount,
}: PaginationDto) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(totalCount / pageSize);
  // const totalPageNumbers = siblingCount + 5;

  const handleNextPage = () => {
    if (currentPage < pages) setCurrentPage(currentPage + 1);
  };
  const handleNextPageLoadMore = () => {
    if (currentPage < pages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    pages,
    handleNextPage,
    handleNextPageLoadMore,
    handlePreviousPage,
    handlePageChange,
    currentPage,
  };
};
