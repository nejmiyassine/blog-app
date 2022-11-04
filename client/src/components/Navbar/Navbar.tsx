import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { useLogoutUserMutation } from '../../redux/api/authApi';
import { toast } from 'react-toastify';
import './navbar.scss';
import { logout } from '../../redux/features/auth/userSlice';

const Navbar = () => {
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
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link className='link' to='/'>
            <h2 className='title'>Medlog</h2>
          </Link>
        </div>
        <div className='links flex'>
          <Link className='link' to='/?category=art'>
            <h6>Art</h6>
          </Link>
          <Link className='link' to='/?category=technology'>
            <h6>Technology</h6>
          </Link>
          <Link className='link' to='/?category=science'>
            <h6>Science</h6>
          </Link>
          <Link className='link' to='/?category=cinema'>
            <h6>Cinema</h6>
          </Link>
          <Link className='link' to='/?category=design'>
            <h6>Design</h6>
          </Link>
          <Link className='link' to='/?category=food'>
            <h6>Food</h6>
          </Link>
          {!user && (
            <>
              <Link className='link' to='/register'>
                <h6>Register</h6>
              </Link>
              <Link className='link' to='/login'>
                <h6>Login</h6>
              </Link>
            </>
          )}
          {user && (
            <>
              <span>{user?.username}</span>
              <button onClick={onLogoutHandler}>Logout</button>
            </>
          )}
          <span className='write'>
            <Link to='/write'>Write</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
