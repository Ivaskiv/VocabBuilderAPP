import styles from './styles.module.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdArrowRightAlt } from 'react-icons/md';
import { useState } from 'react';
// import Filters from '../common/filter/Filters';
import Statistics from '../statistics/Statistics';
import WerbTypeSwitch from '../../../category/components/WerbTypeSwitch';
import CategoriesPopup from '../../../category/components/CategoriesPopup';
import AddWordBtn from '../addWordButton/AddWordBtn';

export default function Dashboard() {
  const [isCategoriesPopupOpen, setIsCategoriesPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const [verbType, setVerbType] = useState('');

  const toggleCategoriesPopup = () => {
    setIsCategoriesPopupOpen(prev => !prev);
  };

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    if (category !== 'Verb') {
      setVerbType('');
    }
    setIsCategoriesPopupOpen(false);
  };
  const handleRadioChange = e => {
    setVerbType(e.target.value);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_left}>
        {/* <Filters /> */}
        <button onClick={toggleCategoriesPopup} className={styles.selector_button}>
          Categories
          {isCategoriesPopupOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {isCategoriesPopupOpen && (
          <CategoriesPopup
            isOpen={isCategoriesPopupOpen}
            onClose={() => setIsCategoriesPopupOpen(false)}
            onSelectCategory={handleCategorySelect}
          />
        )}
        {selectedCategory === 'Verb' && (
          <WerbTypeSwitch selectedVerbType={verbType} onChange={handleRadioChange} />
        )}
      </div>
      <div>
        <div className={styles.dashboard_right}>
          <Statistics />
          <AddWordBtn onAddWord={word => console.log(`Added word: ${word}`)} />
          <a href="/training">
            Train oneself <MdArrowRightAlt />
          </a>
        </div>
      </div>
    </div>
  );
}
