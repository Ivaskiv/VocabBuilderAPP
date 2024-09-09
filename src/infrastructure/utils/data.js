// data.js
const defaultData = [
  {
    en: 'Word 1',
    ua: 'Слово 1',
    category: 'Category 1',
    progress: 75,
    editDelete: 'Edit/Delete',
  },
  {
    en: 'Word 2',
    ua: 'Слово 2',
    category: 'Category 2',
    progress: 35,
    editDelete: 'Edit/Delete',
  },
  {
    en: 'Word 3',
    ua: 'Слово 3',
    category: 'Category 1',
    progress: 25,
    editDelete: 'Edit/Delete',
  },
  {
    en: 'Word 4',
    ua: 'Слово 4',
    category: 'Category 2',
    progress: 15,
    editDelete: 'Edit/Delete',
  },
  {
    en: 'Word 5',
    ua: 'Слово 5',
    category: 'Category 5',
    progress: 55,
    editDelete: 'Edit/Delete',
  },
  {
    en: 'Word 6',
    ua: 'Слово 6',
    category: 'Category 1',
    progress: 16,
    editDelete: 'Edit/Delete',
  },
  {
    en: 'Word 7',
    ua: 'Слово 7',
    category: 'Category 1',
    progress: 27,
    editDelete: 'Edit/Delete',
  },
  {
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
    en: newWord.en,
    ua: newWord.ua,
    category: newWord.category,
    progress: 0,
    editDelete: 'Edit/Delete',
  });
};
export default defaultData;
