import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import { useLoginUserMutation } from '../../redux/api/authApi';
import 'react-toastify/dist/ReactToastify.css';

const loginSchema = object({
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const Login: React.FC = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // ? API Login Mutation
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();
  const [err, setErr] = useState('');

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success('you logged in successfully');
      navigate('/profile');
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) => {
          setErr(el.message);
          return toast.error(el.message);
        });
      } else {
        setErr((error as any).data.error);
        toast.error((error as any).data.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    // ? Executing the loginUser Mutation
    loginUser(data);
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <ToastContainer />
      {err && <div className='text-sm text-red-500'>{err}</div>}

      <div className='flex flex-row-reverse h-[400px] md:w-[750px] lg:w-[1000px]'>
        <div className='hidden h-[100%] md:block md:w-1/2'>
          <img
            className='h-[100%] object-cover'
            src='https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
            alt='login'
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col justify-between gap-4 w-[350px] md:w-1/2 h-[100%] bg-gray-100 dark:bg-zinc-700 dark:text-white drop-shadow-md p-6 md:p-10 lg:p-14'
        >
          <h2 className='font-dancing font-bold text-2xl text-center mb-4'>
            Welcome back!
          </h2>

          <div>
            <label htmlFor='email' className='font-semibold'>
              Email
            </label>
            <br />
            <input
              className='mt-2 w-[100%] text-sm border border-gray-300 placeholder:text-gray-400 p-2 bg-transparent placeholder:text-sm'
              type='email'
              id='email'
              {...register('email')}
              placeholder='Enter your Email'
            />
            {errors['email'] ? (
              <p className='font-sm text-red-500'>{errors['email'].message}</p>
            ) : (
              ''
            )}
          </div>

          <div>
            <label htmlFor='password' className='font-semibold'>
              Password
            </label>
            <br />
            <input
              className='mt-2 w-[100%] text-sm border border-gray-300 placeholder:text-gray-400 p-2 bg-transparent placeholder:text-sm'
              type='password'
              {...register('password')}
              id='password'
              placeholder='********'
              autoComplete='false'
            />
            {errors['password'] ? (
              <p className='font-sm text-red-500'>
                {errors['password'].message}
              </p>
            ) : (
              ''
            )}
          </div>

          <button
            className='bg-black text-white border py-1.5 mt-2 font-medium italic duration-200 hover:bg-transparent hover:text-black hover:border-black dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-transparent dark:hover:border-white'
            type='submit'
          >
            Sign in
          </button>

          <div className='flex items-center justify-center'>
            <p className='text-zinc-500 text-sm italic'>
              Dont't have a Medlog account?
            </p>
            <Link className='pl-2 font-semibold hover:underline' to='/register'>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
