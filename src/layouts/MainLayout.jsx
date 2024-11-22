import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './header/Header';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MainLayout;
