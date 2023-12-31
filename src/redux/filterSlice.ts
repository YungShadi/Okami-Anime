/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { FilterDto, FilterArrayElement } from "../types/filterDto";

const initialState: FilterDto = {
  tagArray: [
    {
      title: "Сёнэн",
      value: "senen",
      status: "inactive",
    },
    {
      title: "Сёдзё",
      value: "sedze",
      status: "inactive",
    },
    {
      title: "Сэйнэн",
      value: "seynen",
      status: "inactive",
    },
    {
      title: "Боевик",
      value: "action",
      status: "inactive",
    },
    {
      title: "Детектив",
      value: "detactive",
      status: "inactive",
    },
    {
      title: "Драма",
      value: "drama",
      status: "inactive",
    },
    {
      title: "Киберпанк",
      value: "cyberpunk",
      status: "inactive",
    },
    {
      title: "Комедия",
      value: "comedy",
      status: "inactive",
    },
    {
      title: "Ме́ха",
      value: "mecha",
      status: "inactive",
    },
    {
      title: "Повседневность",
      value: "dayly",
      status: "inactive",
    },
    {
      title: "Психологический триллер",
      value: "psy-triller",
      status: "inactive",
    },
    {
      title: "Исэкай",
      value: "isecay",
      status: "inactive",
    },
    {
      title: "Романтика",
      value: "romantic",
      status: "inactive",
    },
    {
      title: "Фэнтези",
      value: "fantasy",
      status: "inactive",
    },
    {
      title: "Боевые искусства",
      value: "fight-art",
      status: "inactive",
    },
    {
      title: "Военное",
      value: "war",
      status: "inactive",
    },
    {
      title: "Гарем",
      value: "garem",
      status: "inactive",
    },
    {
      title: "Игры",
      value: "games",
      status: "inactive",
    },
    {
      title: "Исторический",
      value: "historical",
      status: "inactive",
    },
    {
      title: "Магия",
      value: "magic",
      status: "inactive",
    },
    {
      title: "Спорт",
      value: "sport",
      status: "inactive",
    },
    {
      title: "Триллер",
      value: "triller",
      status: "inactive",
    },
    {
      title: "Ужасы",
      value: "horror",
      status: "inactive",
    },
    {
      title: "Школа",
      value: "school",
      status: "inactive",
    },
  ],
  typeArray: [
    {
      title: "Сериал",
      value: "serial",
      status: "inactive",
    },
    {
      title: "Полнометражный фильм",
      value: "long-film",
      status: "inactive",
    },
    {
      title: "Короткометражка",
      value: "short-film",
      status: "inactive",
    },
    {
      title: "ONA",
      value: "ona",
      status: "inactive",
    },
    {
      title: "OVA",
      value: "ova",
      status: "inactive",
    },
    {
      title: "Спэшл",
      value: "special",
      status: "inactive",
    },
  ],
  statusArray: [
    {
      title: "Вышел",
      value: "out",
      status: "inactive",
    },
    {
      title: "Онгоинг",
      value: "ongoing",
      status: "inactive",
    },
    {
      title: "Анонс",
      value: "announcement",
      status: "inactive",
    },
  ],
  activeTags: [],
  activeTypes: [],
  activeStatus: [],
  excludedTags: [],
  excludedTypes: [],
};

const handleFilters = (
  action: { payload: any; type?: string },
  itemsArray: FilterArrayElement[] | [],
  activeArray: FilterArrayElement[] | [],
  excludedArray?: FilterArrayElement[] | [] | undefined,
) => {
  const actionValue = action.payload.value;

  if (action.payload.status === "inactive") {
    const newArray = [...itemsArray];
    const index = newArray.findIndex((tag) => tag.value === actionValue);
    newArray[index] = {
      ...newArray[index],
      status: "active",
    };
    activeArray = [...activeArray, actionValue];
    itemsArray = newArray;
    return {
      itemsArray: newArray,
      activeArray,
      excludedArray,
    };
  }
  if (action.payload.status === "active") {
    const newArray = [...itemsArray];
    const index = newArray.findIndex((tag) => tag.value === actionValue);
    newArray[index] = {
      ...newArray[index],
      status: excludedArray ? "excluded" : "inactive",
    };
    activeArray = activeArray.filter((tag) => tag !== actionValue);
    if (excludedArray) excludedArray = [...excludedArray, actionValue];
    itemsArray = newArray;
    return {
      itemsArray: newArray,
      activeArray,
      excludedArray,
    };
  }
  if (excludedArray) {
    if (action.payload.status === "excluded") {
      const newArray = [...itemsArray];
      const index = newArray.findIndex((tag) => tag.value === actionValue);
      newArray[index] = {
        ...newArray[index],
        status: "inactive",
      };
      excludedArray = excludedArray.filter((tag) => tag !== actionValue);
      itemsArray = newArray;
      return {
        itemsArray: newArray,
        activeArray,
        excludedArray,
      };
    }
  }
  return {
    itemsArray,
    activeArray,
    excludedArray,
  };
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    handleTags: (state, action) => {
      const { itemsArray, activeArray, excludedArray } = handleFilters(
        action,
        state.tagArray,
        state.activeTags,
        state.excludedTags,
      );
      state.tagArray = itemsArray;
      state.activeTags = activeArray;
      state.excludedTags = excludedArray;
    },
    handleTypes: (state, action) => {
      const { itemsArray, activeArray, excludedArray } = handleFilters(
        action,
        state.typeArray,
        state.activeTypes,
        state.excludedTypes,
      );
      state.typeArray = itemsArray;
      state.activeTypes = activeArray;
      state.excludedTypes = excludedArray;
    },
    handleStatus: (state, action) => {
      const { itemsArray, activeArray } = handleFilters(
        action,
        state.statusArray,
        state.activeStatus,
      );
      state.statusArray = itemsArray;
      state.activeStatus = activeArray;
    },
    handleLinkActiveTags: (state, action) => {
      state.activeTags = action.payload;
      const newArray = [...state.tagArray];
      action.payload.forEach((tag) => {
        const index = newArray.findIndex((arrTag) => arrTag.value === tag);
        newArray[index] = { ...newArray[index], status: "active" };
      });
      state.tagArray = newArray;
    },
    handleLinkExcludedTags: (state, action) => {
      state.excludedTags = action.payload;
      const newArray = [...state.tagArray];
      action.payload.forEach((tag) => {
        const index = newArray.findIndex((arrTag) => arrTag.value === tag);
        newArray[index] = { ...newArray[index], status: "excluded" };
      });
      state.tagArray = newArray;
    },
    handleLinkActiveTypes: (state, action) => {
      state.activeTypes = action.payload;
      const newArray = [...state.typeArray];
      action.payload.forEach((tag) => {
        const index = newArray.findIndex((arrTag) => arrTag.value === tag);
        newArray[index] = { ...newArray[index], status: "active" };
      });
      state.typeArray = newArray;
    },
    handleLinkExcludedTypes: (state, action) => {
      state.excludedTypes = action.payload;
      const newArray = [...state.typeArray];
      action.payload.forEach((tag) => {
        const index = newArray.findIndex((arrTag) => arrTag.value === tag);
        newArray[index] = { ...newArray[index], status: "excluded" };
      });
      state.typeArray = newArray;
    },
    handleLinkStatus: (state, action) => {
      state.activeStatus = action.payload;
      const newArray = [...state.statusArray];
      action.payload.forEach((tag) => {
        const index = newArray.findIndex((arrTag) => arrTag.value === tag);
        newArray[index] = { ...newArray[index], status: "active" };
      });
      state.statusArray = newArray;
    },
  },
});

export const {
  handleTags,
  handleTypes,
  handleStatus,
  handleLinkActiveTags,
  handleLinkExcludedTags,
  handleLinkActiveTypes,
  handleLinkExcludedTypes,
  handleLinkStatus
} = filterSlice.actions;

export default filterSlice.reducer;
