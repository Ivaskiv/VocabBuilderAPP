import css from './style.module.css';
import { useState, useEffect } from 'react';
import imgTitleRegisterWebP from '../../assets/img/illustration1x.webp';
import imgTitleRegister2xWebP from '../../assets/img/illustration2x.webp';
import imgTitleRegister from '../../assets/img/illustration2x.png';
import AuthForm from '../../components/AuthForm/AuthForm.jsx';
import { useDispatch } from 'react-redux';
import { login, register } from '../../redux/auth/authOperation.js';

const Home = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const [activeForm, setActiveForm] = useState('register');
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem('hasVisited');
    if (visited) {
      setActiveForm('login');
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
    setHasVisited(true);
  }, []);

  useEffect(() => {
    if (hasVisited && isAuthenticated) {
      setActiveForm('login');
    }
  }, [isAuthenticated, hasVisited]);

  const handleRegister = data => {
    dispatch(register(data));
  };

  const handleLogin = data => {
    dispatch(login(data));
  };

  return (
    <div className={css.home_container}>
      <div className={css.gradient_background}></div>
      <div className={css.form_container}>
        <AuthForm
          title={activeForm === 'register' ? 'Register' : 'Login'}
          supportingText={
            activeForm === 'register'
              ? 'To start using our services, please fill out the registration form below. All fields are mandatory:'
              : 'Please enter your login details to continue using our service:'
          }
          fields={activeForm === 'register' ? ['name', 'email', 'password'] : ['email', 'password']}
          onSubmit={activeForm === 'register' ? handleRegister : handleLogin}
          linkPath={activeForm === 'register' ? '/login' : '/register'}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
        />
      </div>

      <div className={css.img_container}>
        <picture>
          <source
            srcSet={`${imgTitleRegisterWebP} 1x, ${imgTitleRegister2xWebP} 2x`}
            type="image/webp"
          />
          <source srcSet={`${imgTitleRegister} 1x`} type="image/png" />
          <img src={imgTitleRegister} alt="user register" className={css.responsive_image} />
        </picture>
        <div>
          <p>Word · Translation · Grammar · Progress</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
