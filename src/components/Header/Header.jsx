import css from './style.module.css';
import Logo from '../Logo/Logo.jsx';

const Header = ({ isAuthenticated }) => {
  return (
    <header className={css.header}>
      {!isAuthenticated ? (
        <Logo />
      ) : (
        <div className={css.authenticated}>
          <div className={css.menu}></div>
          <button className={css.menuButton}>Dictionary</button>
          <button className={css.menuButton}>Recommend</button>
          <button className={css.menuButton}>Training</button>
          <div className={css.userInfo}>
            <button className={css.btn_user_info}></button>
            <button className={css.btn_logout}></button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
