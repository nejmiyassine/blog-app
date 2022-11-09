import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';
import { useRegisterUserMutation } from '../../redux/api/authApi';

const registerSchema = object({
  username: string().min(1, 'username is required').max(100),
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const Register: React.FC = () => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser, { isLoading, isSuccess, error, isError }] =
    useRegisterUserMutation();
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success('you registered successfully');
      navigate('/login');
    }

    if (isError) {
      console.log(error);
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

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    // Executing the RegisterUser Mutation
    registerUser(data);
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <ToastContainer />
      {err && <div className='text-sm text-red-500'>{err}</div>}

      <div className='flex flex-row-reverse h-[600px] md:w-[750px] lg:w-[1000px]'>
        <div className='hidden h-[100%] md:block md:w-1/2'>
          <img
            className='h-[100%] object-cover'
            src='https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
            alt='login'
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col justify-between gap-4 w-[350px] md:w-1/2  h-[100%] bg-gray-100 dark:bg-zinc-700 dark:text-white drop-shadow-md p-6 md:p-10 lg:p-14'
        >
          <h2 className='font-dancing font-bold text-2xl text-center mb-4'>
            Welcome you with us!
          </h2>

          <div>
            <label htmlFor='username' className='font-semibold'>
              Username
            </label>

            <input
              className='mt-2 text-sm w-[100%] border text-sm border-gray-300 placeholder:text-gray-400 p-2 bg-transparent placeholder:text-sm'
              type='text'
              id='username'
              {...register('username')}
              placeholder='Username'
            />

            {errors['username'] ? (
              <p className='font-sm text-red-500'>
                {errors['username'].message}
              </p>
            ) : (
              ''
            )}
          </div>

          <div>
            <label htmlFor='email' className='font-semibold'>
              Email
            </label>

            <input
              className='mt-2 text-sm w-[100%] border border-gray-300 placeholder:text-gray-400 p-2 bg-transparent placeholder:text-sm'
              type='email'
              id='email'
              {...register('email')}
              placeholder='Email Address'
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

            <input
              className='mt-2 text-sm w-[100%] border border-gray-300 placeholder:text-gray-400 p-2 bg-transparent placeholder:text-sm'
              type='password'
              id='password'
              {...register('password')}
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

          <div>
            <label htmlFor='passwordConfirm' className='font-semibold'>
              Confirm Password
            </label>

            <input
              className='mt-2 text-sm w-[100%] border border-gray-300 placeholder:text-gray-400 p-2 bg-transparent placeholder:text-sm'
              type='password'
              id='passwordConfirm'
              {...register('passwordConfirm')}
              placeholder='********'
              autoComplete='false'
            />
            {errors['passwordConfirm'] ? (
              <p className='font-sm text-red-500'>
                {errors['passwordConfirm'].message}
              </p>
            ) : (
              ''
            )}
          </div>

          <div className='authLinks flex flex-col'>
            <button
              className='bg-black text-white border py-1.5 mt-2 font-medium italic duration-200 hover:bg-transparent hover:text-black hover:border-black dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-transparent dark:hover:border-white'
              type='submit'
            >
              Sign up
            </button>
          </div>

          <div className='flex items-center justify-center'>
            <p className='text-zinc-500 text-sm italic'>
              Already have a Medlog account?
            </p>
            <Link className='pl-2 font-semibold hover:underline' to='/login'>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
