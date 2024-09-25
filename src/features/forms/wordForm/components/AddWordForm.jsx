import { useState } from 'react';

const AddWordForm = ({ onAddWord }) => {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [category, setCategory] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    const newWord = { en: word, ua: translation, category, progress };
    onAddWord(newWord);
    setWord('');
    setTranslation('');
    setCategory('');
    setProgress(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Word (English)"
        value={word}
        onChange={e => setWord(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Translation (Ukrainian)"
        value={translation}
        onChange={e => setTranslation(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Progress"
        value={progress}
        onChange={e => setProgress(e.target.value)}
        required
      />
    </form>
  );
};

export default AddWordForm;
