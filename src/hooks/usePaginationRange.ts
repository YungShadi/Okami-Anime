/* eslint-disable import/prefer-default-export */

import { useMemo } from "react";

const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePaginationRange = ({
  pages,
  pageSize,
  siblingCount = 1,
  currentPage,
}: {
  pages: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}) => {
  // eslint-disable-next-line consistent-return
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(pages / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, "...", totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  }, [pages, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
