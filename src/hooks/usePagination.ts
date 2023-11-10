import { useState } from "react";
import { PaginationDto } from "../types/paginationDto";

// eslint-disable-next-line import/prefer-default-export
export const usePagination = ({
  totalCount,
  pageSize,
} // siblingCount,
: PaginationDto) => {
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

// const range = (start: number, end: number): Array<number> => {
//   const length = end - start + 1;
//   /*
//     Create an array of certain length and set the elements within it from
//     start value to end value.
//   */
//   return Array.from({ length }, (_, idx) => idx + start);
// };

// if (totalPageNumbers >= pages) return range(1, pages);
// const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
// const rigthSiblingIndex = Math.min(currentPage + siblingCount, pages);
// const isShowingLeftDots = leftSiblingIndex > 2;
// const isShowingRigthDots = rigthSiblingIndex < pages - 2;

// const firstPageIndex = 1;
// const lastPageIndex = pages;

// if (!isShowingLeftDots && isShowingRigthDots) {
//   const leftItemCount = 3 + 2 * siblingCount;
//   const leftRange = range(1, leftItemCount);
//   return [...leftRange, "...", pages];
// }

// if (isShowingLeftDots && !isShowingRigthDots) {
//   const rightItemCount = 3 + 2 * siblingCount;
//   const rightRange = range(pages - rightItemCount + 1, pages);
//   return [firstPageIndex, "...", ...rightRange];
// }

// if (isShowingLeftDots && isShowingRigthDots) {
//   let middleRange = range(leftSiblingIndex, rigthSiblingIndex);
//   return [firstPageIndex, "...", ...middleRange, "..", lastPageIndex];
// }
// }, [totalCount, pageSize, siblingCount, currentPage]);

// return paginationRange
