import React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
  return (
    <div className='auth'>
      <div className='flex flex-col h-full'>
        <form className='loginForm flex flex-col'>
          <h2 className='title'>Sign in</h2>
          <div>
            <input
              className='authInput'
              type='email'
              name='email'
              id='email'
              placeholder='Email Address'
              required
            />
          </div>
          <div>
            <input
              className='authInput'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              autoComplete='false'
              required
            />
          </div>
          <div className='authLinks flex flex-col'>
            <button className='authButton' type='submit'>
              Sign in
            </button>
            <Link className='authLink' to='/'>
              Forget your password?
            </Link>
          </div>
          <div className='authMessage'>
            <p>Dont't have a Medlog account?</p>
            <Link className='authLink' to='/register'>
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
