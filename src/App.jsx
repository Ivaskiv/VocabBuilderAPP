//App.jsx
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { store, persistor } from './redux/store.js';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Header = lazy(() => import('./components/Header/Header.jsx'));
const Dictionary = lazy(() => import('./pages/Dictionary/Dictionary.jsx'));
const Recommend = lazy(() => import('./pages/Recommend/Recommend.jsx'));
const Training = lazy(() => import('./pages/Training/Training.jsx'));
const MainLayout = lazy(() => import('./layouts/MainLayout/MainLayout.jsx'));
const Register = lazy(() => import('./components/AuthForm/RegisterForm.jsx'));
const Login = lazy(() => import('./components/AuthForm/LoginForm.jsx'));

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Routes>
            <Route path="/" element={isAuthenticated ? <MainLayout /> : <Home />}>
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/recommend" element={<Recommend />} />
              <Route path="/training" element={<Training />} />

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
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
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
