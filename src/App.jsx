import 'react-toastify/dist/ReactToastify.css';
import './infrastructure/api/init.js';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { persistor, store } from './infrastructure/store/store.js';
import { getCurrentUser } from './features/auth/redux/authOperations.js';
import RegisterForm from './features/auth/components/RegisterForm.jsx';
import TestPage from './infrastructure/testing/components/TestPage.jsx';
// import RestrictedRoute from './components/routing/RestrictedRoute.js';
import MainLayout from './layouts/MainLayout.jsx';
import LoginForm from './features/auth/components/LoginForm.jsx';

const Home = lazy(() => import('./pages/home/Home.jsx'));
const Dictionary = lazy(() => import('./pages/dictionary/Dictionary.jsx'));
const Recommend = lazy(() => import('./pages/recommend/Recommend.jsx'));
const Training = lazy(() => import('./pages/training/Training.jsx'));
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [dispatch]);

  //   return (
  //     <Provider store={store}>
  //       <PersistGate loading={null} persistor={persistor}>
  //         <Suspense fallback={<div>Loading...</div>}>
  //           <div>
  //             <Routes>
  //               <Route path="/" element={<MainLayout />}>
  //                 <Route
  //                   index
  //                   element={
  //                     <RestrictedRoute redirectTo="/">
  //                       <Home />
  //                     </RestrictedRoute>
  //                   }
  //                 />

  //                 <Route
  //                   path="/dictionary"
  //                   element={
  //                     <RestrictedRoute redirectTo="/">
  //                       <Dictionary />
  //                     </RestrictedRoute>
  //                   }
  //                 />

  //                 <Route
  //                   path="/recommend"
  //                   element={
  //                     <RestrictedRoute redirectTo="/">
  //                       <Recommend />
  //                     </RestrictedRoute>
  //                   }
  //                 />

  //                 <Route
  //                   path="/training"
  //                   element={
  //                     <RestrictedRoute redirectTo="/">
  //                       <Training />
  //                     </RestrictedRoute>
  //                   }
  //                 />

  //                 <Route path="/testing" element={<TestPage />} />
  //               </Route>

  //               {/* Public authentication pages */}
  //               <Route
  //                 path="/register"
  //                 element={
  //                   <RestrictedRoute redirectTo="/">
  //                     <RegisterForm />
  //                   </RestrictedRoute>
  //                 }
  //               />

  //               <Route
  //                 path="/login"
  //                 element={
  //                   <RestrictedRoute redirectTo="/">
  //                     <LoginForm />
  //                   </RestrictedRoute>
  //                 }
  //               />
  //             </Routes>
  //             <ToastContainer
  //               position="top-center"
  //               autoClose={1000}
  //               hideProgressBar
  //               newestOnTop={false}
  //               closeOnClick
  //               rtl={false}
  //               pauseOnFocusLoss
  //               draggable
  //               pauseOnHover
  //               theme="light"
  //               transition="Flip"
  //             />
  //           </div>
  //         </Suspense>
  //       </PersistGate>
  //     </Provider>
  //   );
  // };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />

                <Route path="/dictionary" element={<Dictionary />} />

                <Route path="/recommend" element={<Recommend />} />

                <Route path="/training" element={<Training />} />

                <Route path="/testing" element={<TestPage />} />
              </Route>

              {/* Public authentication pages */}
              <Route path="/register" element={<RegisterForm />} />

              <Route path="/login" element={<LoginForm />} />
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
