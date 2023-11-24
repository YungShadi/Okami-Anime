import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGetTitlesQuery,
  useGetTitileByIdMutation,
  useSearchTitleMutation,
  useLazyGetTitlesQuery,
} from "../redux/service/anime/titles.api";
import { setTitlesAction } from "../redux/titlesSlice";

// eslint-disable-next-line import/prefer-default-export
export const useTitles = () => {
  const dispatch = useDispatch();
  const { data: titlesArray, isLoading: isLoadingTitles } =
    useGetTitlesQuery(0);
  const [getTitle] = useGetTitileByIdMutation();
  const [searchTitle, { isLoading: isSearchLoading }] =
    useSearchTitleMutation();
  const [getTiles, { isLoading: isTitlesLoadingLazy }] =
    useLazyGetTitlesQuery();

  useEffect(() => {
    if (titlesArray) {
      dispatch(setTitlesAction(titlesArray.content));
    }
  }, [titlesArray]);

  const handleGetCurrentTitle = async (titleId: string) => {
    const result = await getTitle(titleId);
    return result;
  };

  const handleSearchTitles = async (searchValue: string, page: number) => {
    const result = await searchTitle({ searchValue, page });
    return result;
  };

  const handleGetTitles = async (page: number) => {
    const result = await getTiles(page);
    return result;
  };

  return {
    isLoadingTitles,
    titlesArray,
    handleGetCurrentTitle,
    handleSearchTitles,
    isSearchLoading,
    handleGetTitles,
    isTitlesLoadingLazy,
  };
};
