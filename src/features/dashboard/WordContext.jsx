import { createContext, useContext, useState, useEffect } from 'react';
import defaultData, { addWord as addWordToData } from '../../infrastructure/utils/data';

export const WordContext = createContext();

export const useWords = () => {
  const context = useContext(WordContext);
  if (!context) {
    throw new Error('useWords must be used within a WordProvider');
  }
  return context;
};

export const WordProvider = ({ children }) => {
  const [words, setWords] = useState(defaultData);

  useEffect(() => {
    setWords(defaultData);
  }, []);

  const addWord = newWord => {
    setWords(prevWords => [...prevWords, newWord]);
    addWordToData(newWord);
  };

  const editWord = updatedWord => {
    setWords(prevWords => prevWords.map(word => (word.id === updatedWord.id ? updatedWord : word)));
  };

  const removeWord = wordId => {
    setWords(prevWords => prevWords.filter(word => word.id !== wordId));
  };

  return (
    <WordContext.Provider value={{ words, addWord, editWord, removeWord }}>
      {children}
    </WordContext.Provider>
  );
};
