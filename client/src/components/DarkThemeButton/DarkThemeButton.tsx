import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { changeThemeMode } from '../../redux/features/theme/themeSlice';
import * as Bs from 'react-icons/bs';

const DarkThemeButton = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch();

  const changeTheme = () => dispatch(changeThemeMode());

  return (
    <div className='fixed bottom-5 right-5 rounded-full bg-black text-white dark:bg-white dark:text-black'>
      <button onClick={changeTheme} className='p-5'>
        {!isDark ? (
          <Bs.BsFillMoonStarsFill size={20} />
        ) : (
          <Bs.BsSunFill size={20} />
        )}
      </button>
    </div>
  );
};

export default DarkThemeButton;
