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
export const usePagination = ({ totalCount, pageSize }: PaginationDto) => {
  const pages = Math.ceil(totalCount / pageSize);
  const dispatch = useDispatch();
  // const {
  //   handleSearchTitles,
  //   isSearchLoading,
  //   handleGetTitles,
  //   isTitlesLoadingLazy,
  // } = useTitles();
  const currentPage = useSelector(
    (state: { pagination: paginationState }) => state.pagination.currentPage,
  );

  const handleNextPage = () => {
    if (currentPage < pages) {
      dispatch(nextPageAction());
    }
  };
  const handleNextPageLoadMore = () => {
    if (currentPage < pages) {
      dispatch(nextPageLoadMoreAction());
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(previousPageAction());
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(changePageAction(page));
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
