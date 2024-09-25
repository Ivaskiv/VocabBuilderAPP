import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoriesOperations';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    selectedCategory: '',
    keyword: '',
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { setCategories, setSelectedCategory, setKeyword } = filtersSlice.actions;
export default filtersSlice.reducer;
