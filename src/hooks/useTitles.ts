import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetTitlesQuery } from "../redux/service/anime/titles.api";
import { setTitlesAction } from "../redux/titlesSlice";

// eslint-disable-next-line import/prefer-default-export
export const useTitles = () => {
  const dispatch = useDispatch();
  const { data: titlesArray, isLoading: isLoadingTitles } =
    useGetTitlesQuery(undefined);

  useEffect(() => {
    if (!isLoadingTitles && titlesArray) {
      dispatch(setTitlesAction(titlesArray.results));
    }
  });

  return {
    isLoadingTitles,
    titlesArray,
  };
};
