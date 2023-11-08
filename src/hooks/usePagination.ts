import { useState } from "react";

// eslint-disable-next-line import/prefer-default-export
export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = 32;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleNextPageLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
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
