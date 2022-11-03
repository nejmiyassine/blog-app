import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`/auth/login`, inputs);
      navigate('/');
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <div className='auth'>
      <div className='flex flex-col h-full'>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} className='loginForm flex flex-col'>
          <h2 className='title'>Sign in</h2>
          <div>
            <input
              className='authInput'
              type='email'
              name='email'
              onChange={handleChange}
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
              onChange={handleChange}
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
