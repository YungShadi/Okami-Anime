import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetTitileByIdMutation,
  useLazyGetTitlesQuery,
} from "../redux/service/anime/titles.api";
import { setTitlesAction, expandTitlesAction } from "../redux/titlesSlice";

// eslint-disable-next-line import/prefer-default-export
export const useTitles = () => {
  const dispatch = useDispatch();
  const [getTitle, { status: currentTitleStatus }] = useGetTitileByIdMutation();

  const [
    getTiles,
    {
      isLoading: isTitlesLoadingLazy,
      status: titlesLoadStatus,
      isFetching: isTitlesFetching,
    },
  ] = useLazyGetTitlesQuery();

  const handleGetCurrentTitle = async (titleId: string) => {
    try {
      const result = await getTitle(titleId);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleGetTitles = async (
    page: number,
    searchValue?: string,
    isLoadMore?: boolean,
  ) => {
    try {
      const result = await getTiles({ searchValue, page });
      if (isLoadMore) {
        dispatch(expandTitlesAction(result.data.content));
        return result;
      }
      dispatch(setTitlesAction(result.data.content));
      return result;
    } catch (error) {
      toast.error("Не удалось получить данные");
      throw new Error(error);
    }
  };

  return {
    handleGetCurrentTitle,
    handleGetTitles,
    isTitlesLoadingLazy,
    titlesLoadStatus,
    currentTitleStatus,
    getTiles,
    isTitlesFetching,
  };
};
