import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGetTitlesQuery,
  useGetTitileByIdMutation,
  useSearchTitleMutation,
} from "../redux/service/anime/titles.api";
import { setTitlesAction } from "../redux/titlesSlice";

// eslint-disable-next-line import/prefer-default-export
export const useTitles = () => {
  const dispatch = useDispatch();
  const { data: titlesArray, isLoading: isLoadingTitles } =
    useGetTitlesQuery(undefined);
  const [getTitle] = useGetTitileByIdMutation();
  const [searchTitle] = useSearchTitleMutation();

  useEffect(() => {
    if (!isLoadingTitles && titlesArray) {
      dispatch(setTitlesAction(titlesArray.results));
    }
  });
  const handleGetCurrentTitle = async (titleId: string) => {
    const result = await getTitle(titleId);
    return result;
  };

  const handleSearchTitle = async (searchValue: string) => {
    const result = await searchTitle(searchValue);
    return result;
  };

  return {
    isLoadingTitles,
    titlesArray,
    handleGetCurrentTitle,
    handleSearchTitle,
  };
};
