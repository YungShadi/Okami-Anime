/* eslint-disable no-param-reassign */
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
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

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    handleTags: (state, action) => {
      if (action.payload.status === "inactive") {
        const newTagArray = [...state.tagArray];
        const index = newTagArray.findIndex(
          (tag) => tag.value === action.payload.value,
        );
        newTagArray[index] = {
          ...newTagArray[index],
          status: "active",
        };
        state.activeTags = [...state.activeTags, action.payload];
        state.tagArray = newTagArray;
      } else if (action.payload.status === "active") {
        const newTagArray = [...state.tagArray];
        const index = newTagArray.findIndex(
          (tag) => tag.value === action.payload.value,
        );
        newTagArray[index] = {
          ...newTagArray[index],
          status: "excluded",
        };
        state.activeTags = state.activeTags.filter(
          (tag) => tag.value !== action.payload.value,
        );
        state.excludedTags = [...state.excludedTags, action.payload];
        state.tagArray = newTagArray;
      } else {
        const newTagArray = [...state.tagArray];
        const index = newTagArray.findIndex(
          (tag) => tag.value === action.payload.value,
        );
        newTagArray[index] = {
          ...newTagArray[index],
          status: "inactive",
        };
        state.excludedTags = state.excludedTags.filter(
          (tag) => tag.value !== action.payload.value,
        );
        state.tagArray = newTagArray;
      }
    },
  },
});

export const { handleTags, handleTypes, handleStatus } = filterSlice.actions;

export default filterSlice.reducer;
