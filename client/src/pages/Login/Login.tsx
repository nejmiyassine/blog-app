import React from 'react';
import './Login.scss';

const Login: React.FC = () => {
  return (
    <div className='auth'>
      <div className='flex flex-col h-full'>
        <h2>Login Page</h2>
        <form className='loginForm flex flex-col'>
          <div>
            <label htmlFor='email'>
              Email:
              <br />
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter Your Email'
              required
            />
          </div>
          <div>
            <label htmlFor='password'>
              Password:
              <br />
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Enter Your Password'
                required
              />
            </label>
          </div>
          <button type='submit'>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
