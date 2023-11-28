import { useDispatch } from "react-redux";
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
    { isLoading: isTitlesLoadingLazy, status: titlesLoadStatus },
  ] = useLazyGetTitlesQuery();

  const handleGetCurrentTitle = async (titleId: string) => {
    const result = await getTitle(titleId);
    return result;
  };

  const handleGetTitles = async (
    page: number,
    searchValue?: string,
    isLoadMore?: boolean,
  ) => {
    const result = await getTiles({ searchValue, page });
    if (isLoadMore) {
      dispatch(expandTitlesAction(result.data.content));
      return result;
    }
    dispatch(setTitlesAction(result.data.content));
    return result;
  };

  return {
    handleGetCurrentTitle,
    handleGetTitles,
    isTitlesLoadingLazy,
    titlesLoadStatus,
    currentTitleStatus,
    getTiles,
  };
};
