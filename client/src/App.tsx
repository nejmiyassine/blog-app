import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { RouterProvider } from 'react-router-dom';
// Routes
import { router } from './routes/routes';
// Components
import DarkThemeButton from './components/DarkThemeButton';
// Style
import './App.scss';

const App: React.FC = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <div className='background text'>
        <div className='container'>
          <RouterProvider router={router} />
        </div>
        <DarkThemeButton />
      </div>
    </div>
  );
};

export default App;
