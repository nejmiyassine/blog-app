import React, { useEffect } from 'react';
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

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success('you logged in successfully');
      navigate('/profile');
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
    <div className='auth'>
      <ToastContainer />
      <div>
        <div className='flex flex-col h-full'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='loginForm flex flex-col'
          >
            <h2 className='title'>Sign in</h2>
            <div>
              <input
                className='authInput'
                type='email'
                {...register('email')}
                id='email'
                placeholder='Email Address'
                required
              />
            </div>
            <div>
              <input
                className='authInput'
                type='password'
                {...register('password')}
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
    </div>
  );
};

export default Login;
