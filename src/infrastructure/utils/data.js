// data.js
const defaultData = [
  {
    id: 1,
    en: 'Word 1',
    ua: 'Слово 1',
    category: 'Category 1',
    progress: 75,
    editDelete: 'Edit/Delete',
  },
  {
    id: 2,
    en: 'Word 2',
    ua: 'Слово 2',
    category: 'Category 2',
    progress: 35,
    editDelete: 'Edit/Delete',
  },
  {
    id: 3,
    en: 'Word 3',
    ua: 'Слово 3',
    category: 'Category 1',
    progress: 25,
    editDelete: 'Edit/Delete',
  },
  {
    id: 4,
    en: 'Word 4',
    ua: 'Слово 4',
    category: 'Category 2',
    progress: 15,
    editDelete: 'Edit/Delete',
  },
  {
    id: 5,
    en: 'Word 5',
    ua: 'Слово 5',
    category: 'Category 5',
    progress: 55,
    editDelete: 'Edit/Delete',
  },
  {
    id: 6,
    en: 'Word 6',
    ua: 'Слово 6',
    category: 'Category 1',
    progress: 16,
    editDelete: 'Edit/Delete',
  },
  {
    id: 7,
    en: 'Word 7',
    ua: 'Слово 7',
    category: 'Category 1',
    progress: 27,
    editDelete: 'Edit/Delete',
  },
  {
    id: 8,
    en: 'Word 8',
    ua: 'Слово 8',
    category: 'Category 3',
    progress: 100,
    editDelete: 'Edit/Delete',
  },
];

export const getCategories = () => {
  const categories = new Set(defaultData.map(item => item.category));
  return Array.from(categories);
};

export const addWord = newWord => {
  defaultData.push({
    ...newWord,
    progress: 0,
    editDelete: 'Edit/Delete',
  });
};

export const editWord = updatedWord => {
  const index = defaultData.findIndex(word => word.id === updatedWord.id);
  if (index !== -1) {
    defaultData[index] = {
      ...defaultData[index],
      ...updatedWord,
    };
  }
};

export const removeWord = wordId => {
  const index = defaultData.findIndex(word => word.id === wordId);
  if (index !== -1) {
    defaultData.splice(index, 1);
  }
};

export default defaultData;
