import { useState } from "react";
import { PaginationDto } from "../types/paginationDto";

// eslint-disable-next-line import/prefer-default-export
export const usePagination = ({ totalCount, pageSize }: PaginationDto) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(totalCount / pageSize);

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
