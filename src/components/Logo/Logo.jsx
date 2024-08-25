import css from './style.module.css';
import sprite from './../../assets/sprite.svg';

const Logo = () => {
  return (
    <div className={css.logoContainer}>
      <svg className={css.logo}>
        <use href={`${sprite}#logo_craftwork`}></use>
      </svg>
      <p>VocabBuilder</p>
    </div>
  );
};

export default Logo;
