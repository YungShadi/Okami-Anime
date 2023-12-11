import { useDispatch, useSelector } from "react-redux";
import { PaginationDto } from "../types/paginationDto";
import {
  nextPageAction,
  changePageAction,
  previousPageAction,
  nextPageLoadMoreAction,
  paginationState,
} from "../redux/paginationSlice";

// eslint-disable-next-line import/prefer-default-export
export const usePagination = ({
  totalCount,
  pageSize,
  handlePageChangeCatalogue,
  search,
}: PaginationDto) => {
  const pages = Math.ceil(totalCount / pageSize);
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: { pagination: paginationState }) => state.pagination.currentPage,
  );

  const handleNextPage = () => {
    if (currentPage < pages) {
      dispatch(nextPageAction());
      handlePageChangeCatalogue(currentPage, search);
    }
  };
  const handleNextPageLoadMore = () => {
    if (currentPage < pages) {
      dispatch(nextPageLoadMoreAction());
      handlePageChangeCatalogue(currentPage, search, true);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(previousPageAction());
      handlePageChangeCatalogue(currentPage - 2, search);
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(changePageAction(page));
    handlePageChangeCatalogue(page - 1, search);
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
