import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import useAuth from '../../../infrastructure/hooks/useAuth.js';
import Logo from '../Logo.jsx';
import UserBar from '../userBar/UserBar.jsx';
import UserNav from '../UserNav';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLogin, isRefreshing } = useAuth();

  useEffect(() => {
    // console.log('User data:', user);
    // console.log('Is user logged in:', isLogin);
    // console.log('Is Refreshing:', isRefreshing);
  }, [user, isLogin, isRefreshing]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <Logo />
      {/* {isLogin && !isRefreshing && user ? ( */}
      <div className={styles.authenticated}>
        <button className={styles.burgerMenu} onClick={toggleMenu}>
          ☰
        </button>
        <div className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
          <div className={styles.nav_menu}>
            <UserNav toggleMenu={toggleMenu} />
          </div>
        </div>
        <UserBar user={user} className={styles.user_info} />
      </div>
      {/* ) : null} */}
    </header>
  );
};

export default Header;
