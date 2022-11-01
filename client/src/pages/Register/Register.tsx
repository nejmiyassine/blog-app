import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Ai from 'react-icons/ai';
import '../Login/Login.scss';

const Register: React.FC = () => {
  const [seePassword, setSeePassword] = useState<Boolean>(false);

  const handleChangePassword = (): void => {
    setSeePassword(!seePassword);
  };

  return (
    <div className='auth'>
      <div className='flex flex-col h-full'>
        <form className='loginForm flex flex-col'>
          <h2 className='title'>Sign up</h2>
          <div>
            <input
              className='authInput'
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              required
            />
          </div>
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
          <div className='authInputForm'>
            <input
              className='authInput'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              autoComplete='false'
              required
            />
            <div onClick={handleChangePassword}>
              {seePassword ? <Ai.AiFillEyeInvisible /> : <Ai.AiFillEye />}
            </div>
          </div>
          <div>
            <input
              className='authInput'
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              placeholder='Confirm Password'
              autoComplete='false'
              required
            />
          </div>
          <div>
            <input
              className='authInput'
              type='date'
              name='date'
              id='date'
              placeholder='Birth Date'
              autoComplete='false'
              required
            />
          </div>
          <div className='authLinks flex flex-col'>
            <button className='authButton' type='submit'>
              Sign up
            </button>
          </div>
          <div className='authMessage'>
            <p>Already have a Medlog account?</p>
            <Link className='authLink' to='/login'>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
