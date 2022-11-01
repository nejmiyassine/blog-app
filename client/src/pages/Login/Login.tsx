import React from 'react';
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
              required
            />
          </div>
          <div className='authLinks flex flex-col'>
            <button className='authButton' type='submit'>
              Sign in
            </button>
            <a className='authLink' href='/'>
              Forget your password?
            </a>
          </div>
          <div className='authMessage'>
            <p>Dont't have a Blog account?</p>
            <a href='/register'>Create new account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
