import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleIsLoggedIn = (): void => {
    setIsLoggedIn(!isLoggedIn);
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
          <Link className='link' to='/register'>
            <h6>Register</h6>
          </Link>
          {isLoggedIn && <span>Yassine</span>}
          <span onClick={handleIsLoggedIn}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </span>
          <span className='write'>
            <Link to='/write'>Write</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
