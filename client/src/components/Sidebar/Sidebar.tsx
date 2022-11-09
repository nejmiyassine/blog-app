import React, { ReactNode, useEffect, useState } from 'react';
import * as Ai from 'react-icons/ai';
import * as Hi from 'react-icons/hi';
import * as Md from 'react-icons/md';
import * as Fi from 'react-icons/fi';
import * as Go from 'react-icons/go';
import * as Fa from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../redux/store';
import { useLogoutUserMutation } from '../../redux/api/authApi';
import { logout } from '../../redux/features/auth/userSlice';
// Components
import DarkThemeButton from '../DarkThemeButton/DarkThemeButton';

interface Menus {
  id: number;
  name: string;
  link: string;
  icon: ReactNode;
}

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleSidebar = () => setOpen(!open);

  const menus: Menus[] = [
    {
      id: 0,
      name: 'Home',
      link: '/',
      icon: <Ai.AiOutlineHome size={20} className='cursor-pointer' />,
    },
    {
      id: 1,
      name: 'Art',
      link: '/?category=art',
      icon: <Fi.FiPenTool size={20} className='cursor-pointer' />,
    },
    {
      id: 2,
      name: 'Technology',
      link: '/?category=technology',
      icon: <Go.GoCircuitBoard size={20} className='cursor-pointer' />,
    },
    {
      id: 3,
      name: 'Science',
      link: '/?category=science',
      icon: <Md.MdScience size={20} className='cursor-pointer' />,
    },
    {
      id: 4,
      name: 'Cinema',
      link: '/?category=cinema',
      icon: <Fa.FaPhotoVideo size={20} className='cursor-pointer' />,
    },
    {
      id: 5,
      name: 'Design',
      link: '/?category=design',
      icon: <Md.MdOutlineDesignServices size={20} className='cursor-pointer' />,
    },
    {
      id: 6,
      name: 'Food',
      link: '/?category=food',
      icon: <Md.MdFastfood size={20} className='cursor-pointer' />,
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      // window.location.href = '/login';
      toast.success('you logged out successfully');
      navigate('/login');
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) => toast.error(el.message));
      } else {
        toast.error((error as any).data.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onLogoutHandler = async () => {
    logoutUser();
    dispatch(logout());
  };

  return (
    <div className='flex gap-6 fixed drop-shadow-2xl z-[100]'>
      <div
        className={`min-h-screen ${
          open ? 'w-72' : 'w-16'
        } bg-black text-gray-100 dark:bg-gray-100 dark:text-black px-4`}
      >
        {/* Sidebar Header */}
        <div
          className={`relative flex h-20 ${
            open ? 'justify-between' : 'justify-center'
          } items-center`}
        >
          <div className={`flex ${!open && 'hidden'}`}>
            <Link to={'/'}>
              <h2 className='font-semibold text-lg italic'>Medlog</h2>
            </Link>
          </div>
          <div onClick={handleSidebar}>
            <Hi.HiMenuAlt3 size={25} className='cursor-pointer' />
          </div>
        </div>

        {/* Sidebar Categories */}
        <div className='py-3'>
          <h2
            className={`text-2xl text-center font-semibold pb-1 ${
              !open && 'hidden'
            }`}
          >
            Categories
          </h2>
          {menus &&
            menus.map(({ id, name, link, icon }: Menus) => (
              <Link
                className='flex group items-center text-sm gap-3.5 font-medium p-2 mt-2 rounded-md duration-200 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white'
                to={link}
                key={id}
              >
                {icon}
                <h3 className={`${!open && 'hidden'}`}>{name}</h3>
                <h3
                  className={`${
                    open && 'hidden'
                  } absolute left-48 font-medium whitespace-pre text-white w-0 overflow-hidden bg-black dark:bg-gray-100 dark:text-black rounded-md drop-shadow-lg px-0 py-0 group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {name}
                </h3>
              </Link>
            ))}

          {!user && (
            <div>
              <h2
                className={`text-2xl text-center font-semibold pb-1 ${
                  !open && 'hidden'
                }`}
              >
                Account
              </h2>

              <Link
                className='flex items-center text-sm gap-3.5 font-medium p-2 mt-2 rounded-md duration-200 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white'
                to='/register'
              >
                <h3 className={`${!open && 'hidden'}`}>Register</h3>
                <Ai.AiOutlineLogin size={20} className='cursor-pointer' />
              </Link>
              <Link
                className='flex items-center text-sm gap-3.5 font-medium p-2 mt-2 rounded-md duration-200 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white'
                to='/login'
              >
                <h3 className={`${!open && 'hidden'}`}>Login</h3>
                <Ai.AiOutlineLogin size={20} className='cursor-pointer' />
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar User */}
        <div className=''>
          {user && (
            <div>
              <h2
                className={`text-2xl text-center pb-4 font-semibold ${
                  !open && 'hidden'
                }`}
              >
                User
              </h2>
              <div className={`${!open && 'mt-4'} p-2`}>
                <Link className='flex item-center' to='/profile'>
                  <Ai.AiOutlineUser size={20} className='cursor-pointer' />
                  <span className={`pl-3 font-medium ${!open && 'hidden'}`}>
                    {user?.username}
                  </span>
                </Link>
              </div>
              <div className='cursor-pointer p-2'>
                <button className='flex items-center' onClick={onLogoutHandler}>
                  <Ai.AiOutlineLogout size={18} />
                  <span className={`pl-3 font-medium ${!open && 'hidden'}`}>
                    Logout
                  </span>
                </button>
              </div>
              <div className='cursor-pointer p-2'>
                <Link to='/write' className='flex items-center'>
                  <Md.MdOutlineAddToPhotos size={20} />
                  <h3 className={`pl-3 font-medium ${!open && 'hidden'}`}>
                    Write
                  </h3>
                </Link>
              </div>
            </div>
          )}

          <DarkThemeButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
