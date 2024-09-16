import { createSlice } from '@reduxjs/toolkit';
import { addWord, deleteWord, fetchWords, updateWord } from './operations';

const initialState = {
  words: [],
  loading: false,
  error: null,
};
const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWords.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.loading = false;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addWord.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWord.fulfilled, (state, action) => {
        state.words.push(action.payload);
        state.loading = false;
      })
      .addCase(addWord.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateWord.fulfilled, (state, action) => {
        const index = state.words.findIndex(word => word.id === action.payload.id);
        if (index !== -1) {
          state.words[index] = action.payload;
        }
      })
      .addCase(updateWord.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.words = state.words.filter(word => word.id !== action.payload);
      })
      .addCase(deleteWord.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default wordsSlice.reducer;

export const selectWords = state => state.words.words;
export const selectLoading = state => state.words.loading;
export const selectError = state => state.words.error;
