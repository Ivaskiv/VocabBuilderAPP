import 'react-toastify/dist/ReactToastify.css';
import './infrastructure/api/init.js';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { persistor, store } from './infrastructure/store/store.js';
import RestrictedRoute from './infrastructure/atoms/RestrictedRoute.jsx';
import { getCurrentUser } from './features/auth/redux/authOperations.js';
// import RegisterForm from './features/auth/components/RegisterForm.jsx';
import RegisterForm from './features/auth/components/RegisterForm.jsx';
import styles from './assets/styles/App.module.css';
import TestPage from './infrastructure/testing/components/TestPage.jsx';
import MainLayout from './components/layouts/MainLayout.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Dictionary = lazy(() => import('./pages/dictionary/Dictionary.jsx'));
const Recommend = lazy(() => import('./pages/Recommend.jsx'));
const Training = lazy(() => import('./pages/training/Training.jsx'));
const Login = lazy(() => import('./pages/LoginPage.jsx'));
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.app_container}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<RestrictedRoute component={<Home />} redirectTo="/" />} />
                {/* <Route
                  path="/dictionary"
                  element={<PrivateRoute component={<Dictionary />} redirectTo="/dictionary" />}
                /> */}
                {/*
                <Route
                  path="/recommend"
                  element={<PrivateRoute component={<Recommend />} redirectTo="/recommend" />}
                />
                <Route
                  path="/training"
                  element={<PrivateRoute component={<Training />} redirectTo="/training" />}
                />
              </Route> */}
                <Route
                  path="/dictionary"
                  element={<RestrictedRoute component={<Dictionary />} redirectTo="/" />}
                />

                <Route
                  path="/recommend"
                  element={<RestrictedRoute component={<Recommend />} redirectTo="/" />}
                />
                <Route path="/testing" element={<TestPage />} />
                <Route
                  path="/training"
                  element={<RestrictedRoute component={<Training />} redirectTo="/" />}
                />
              </Route>

              {/* Public authentication pages */}
              <Route
                path="/register"
                element={<RestrictedRoute component={<RegisterForm />} redirectTo="/" />}
              />
              <Route
                path="/login"
                element={<RestrictedRoute component={<Login />} redirectTo="/" />}
              />
              {/* <Route path="/test" element={<Test />} /> */}
            </Routes>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition="Flip"
            />
          </div>
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;
