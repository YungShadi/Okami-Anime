import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGetTitlesQuery,
  useGetTitileByIdMutation,
} from "../redux/service/anime/titles.api";
import { setTitlesAction } from "../redux/titlesSlice";

// eslint-disable-next-line import/prefer-default-export
export const useTitles = () => {
  const dispatch = useDispatch();
  const { data: titlesArray, isLoading: isLoadingTitles } =
    useGetTitlesQuery(undefined);
  const [getTitle] = useGetTitileByIdMutation();

  useEffect(() => {
    if (!isLoadingTitles && titlesArray) {
      dispatch(setTitlesAction(titlesArray.results));
    }
  });
  const handleGetCurrentTitle = async (titleId: string) => {
    const result = await getTitle(titleId);
    return result;
  };

  return {
    isLoadingTitles,
    titlesArray,
    handleGetCurrentTitle,
  };
};
