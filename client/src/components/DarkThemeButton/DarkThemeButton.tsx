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
    <div className='fixed bottom-5 right-[50%] translate-x-[50%] rounded-full bg-white dark:bg-black'>
      <button onClick={changeTheme} className='p-3'>
        {!isDark ? (
          <Bs.BsFillMoonStarsFill size={20} className='text-purple-900' />
        ) : (
          <Bs.BsSunFill size={20} className='text-yellow-100' />
        )}
      </button>
    </div>
  );
};

export default DarkThemeButton;
