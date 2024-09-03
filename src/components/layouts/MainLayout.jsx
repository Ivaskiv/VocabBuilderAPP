import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
