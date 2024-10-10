// data.js
let defaultData = [
  {
    id: 1,
    en: 'A little bit',
    ua: 'Трохи, трішки',
    category: 'Phrasal verb',
    progress: 50,
    editDelete: 'Edit/Delete',
  },
  {
    id: 2,
    en: 'Able',
    ua: 'Здібний',
    category: 'Adjective',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 3,
    en: 'Absolutely',
    ua: 'Абсолютно',
    category: 'Adverb',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 4,
    en: 'Swim, swam, swum',
    ua: 'Плавати',
    category: 'Participle',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 5,
    en: 'Think, thought, thought',
    ua: 'Думати',
    category: 'Participle',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 6,
    en: 'Come apart',
    ua: 'Роз’єднувати',
    category: 'Phrasal verb',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 7,
    en: 'Go back',
    ua: 'Повертатися',
    category: 'Phrasal verb',
    progress: 0,
    editDelete: 'Edit/Delete',
  },
  {
    id: 8,
    en: 'Develop',
    ua: 'Розвиватися',
    category: 'Verb',
    progress: 0,
    isRegular: true,
    isIrregular: false,
    editDelete: 'Edit/Delete',
  },
  {
    id: 9,
    en: 'Break in',
    ua: 'Вмішуватися, встрявати',
    category: 'Phrasal verb',
    progress: 100,
    editDelete: 'Edit/Delete',
  },
  {
    id: 10,
    en: 'Care',
    ua: 'Турбота, догляд',
    category: 'Verb',
    progress: 100,
    isRegular: true,
    isIrregular: false,
    editDelete: 'Edit/Delete',
  },
  {
    id: 11,
    en: 'During',
    ua: 'Протягом, під час',
    category: 'Preposition',
    progress: 50,
    editDelete: 'Edit/Delete',
  },
  {
    id: 12,
    en: 'Until',
    ua: 'Поки, недо',
    category: 'Preposition',
    progress: 100,
    editDelete: 'Edit/Delete',
  },
  {
    id: 13,
    en: 'Phone',
    ua: 'Телефон',
    category: 'Noun',
    progress: 50,
    editDelete: 'Edit/Delete',
  },
  {
    id: 14,
    en: 'Shoes',
    ua: 'Взуття',
    category: 'Noun',
    progress: 50,
    editDelete: 'Edit/Delete',
  },
  {
    id: 15,
    en: 'Bring',
    ua: 'Приносити',
    category: 'Verb',
    progress: 0,
    isRegular: false,
    isIrregular: true,
    editDelete: 'Edit/Delete',
  },
  {
    id: 16,
    en: 'Know-knew-known',
    ua: 'Знати',
    category: 'Verb',
    progress: 0,
    isRegular: false,
    isIrregular: true,
    editDelete: 'Edit/Delete',
  },
];

export const getCategories = () => {
  const categories = new Set(defaultData.map(item => item.category));
  return Array.from(categories).map((category, index) => ({
    id: index,
    name: category,
  }));
};

export const addWord = newWord => {
  const newId = defaultData.reduce((maxId, word) => Math.max(maxId, word.id), 0) + 1;
  defaultData.push({
    id: newId,
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

export const fetchCategories = () => {
  return new Promise(resolve => {
    const categories = getCategories();
    resolve(categories);
  });
};

export default defaultData;
