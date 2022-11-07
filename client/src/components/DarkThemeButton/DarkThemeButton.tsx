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
    <div className='buttonWrapper'>
      <button onClick={changeTheme} className='button flex'>
        {!isDark ? (
          <div className='darkIcon'>
            <Bs.BsFillMoonStarsFill />
          </div>
        ) : (
          <div className='lightIcon'>
            <Bs.BsSunFill />
          </div>
        )}
      </button>
    </div>
  );
};

export default DarkThemeButton;
