import 'react-toastify/dist/ReactToastify.css';
import styles from './assets/styles/App.module.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { store, persistor } from './infrastructure/store/store.js';
import RestrictedRoute from './features/routes/RestrictedRoute.jsx';
import PrivateRoute from './features/routes/PrivateRoute.jsx';
import { getCurrentUser } from './features/auth/authOperations.js';

const Home = lazy(() => import('./pages/Home.jsx'));
const MainLayout = lazy(() => import('./components/layouts/MainLayout.jsx'));
const Dictionary = lazy(() => import('./pages/Dictionary.jsx'));
const Recommend = lazy(() => import('./pages/Recommend.jsx'));
const Training = lazy(() => import('./pages/Training.jsx'));
const Register = lazy(() => import('./components/forms/RegisterForm.jsx'));
const Login = lazy(() => import('./components/forms/LoginForm.jsx'));

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
                <Route
                  path="/dictionary"
                  element={<PrivateRoute component={<Dictionary />} redirectTo="/dictionary" />}
                />
                <Route
                  path="/recommend"
                  element={<PrivateRoute component={<Recommend />} redirectTo="/recommend" />}
                />
                <Route
                  path="/training"
                  element={<PrivateRoute component={<Training />} redirectTo="/training" />}
                />
              </Route>

              {/* Public authentication pages */}
              <Route
                path="/register"
                element={<RestrictedRoute component={<Register />} redirectTo="/" />}
              />
              <Route
                path="/login"
                element={<RestrictedRoute component={<Login />} redirectTo="/" />}
              />
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
