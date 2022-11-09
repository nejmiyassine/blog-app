import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import { RouterProvider } from 'react-router-dom';
// Routes
import { router } from './routes/routes';

const App: React.FC = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <div className={`app ${isDark && 'dark'}`}>
      <div className='container min-h-screen min-w-full bg-white text-black dark:bg-black dark:text-white'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
