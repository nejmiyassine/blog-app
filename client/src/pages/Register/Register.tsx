import React, { useState } from 'react';
import * as Ai from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../store/api/types';
import axios from 'axios';
import '../Login/Login.scss';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<IUser>({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const [seePassword, setSeePassword] = useState<Boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`/auth/register`, inputs);
      navigate('/');
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  const handleChangePassword = (): void => {
    setSeePassword(!seePassword);
  };

  return (
    <div className='auth'>
      <div className='flex flex-col h-full'>
        <form onSubmit={handleSubmit} className='loginForm flex flex-col'>
          <h2 className='title'>Sign up</h2>
          {error && <p>{error}</p>}

          <input
            className='authInput'
            type='text'
            name='username'
            placeholder='Username'
            onChange={handleChange}
            required
          />

          <input
            className='authInput'
            type='email'
            name='email'
            placeholder='Email Address'
            onChange={handleChange}
            required
          />

          <div className='authInputForm'>
            <input
              className='authInput'
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
              autoComplete='false'
              required
            />
            <div onClick={handleChangePassword}>
              {seePassword ? <Ai.AiFillEyeInvisible /> : <Ai.AiFillEye />}
            </div>
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
