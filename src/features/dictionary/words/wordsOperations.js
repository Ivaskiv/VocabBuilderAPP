import { createAsyncThunk } from '@reduxjs/toolkit';
import dictionaryAPI from '../categories/categoriesOperations.js';

export const fetchWords = createAsyncThunk('words/fetchWords', async (_, { rejectWithValue }) => {
  try {
    const words = await dictionaryAPI.getWords();
    return words;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addWord = createAsyncThunk('words/addWord', async (wordData, { rejectWithValue }) => {
  try {
    const newWord = await dictionaryAPI.addWord(wordData);
    return newWord;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateWord = createAsyncThunk(
  'words/updateWord',
  async (wordData, { rejectWithValue }) => {
    try {
      const updatedWord = await dictionaryAPI.updateWord(wordData);
      return updatedWord;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async (wordId, { rejectWithValue }) => {
    try {
      await dictionaryAPI.deleteWord(wordId);
      return wordId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
