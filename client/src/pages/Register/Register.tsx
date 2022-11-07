import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
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

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success('you registered successfully');
      navigate('/login');
    }

    if (isError) {
      console.log(error);
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
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
    <div className='auth'>
      <div className='flex flex-col h-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='loginForm flex flex-col'
        >
          <h2 className='title'>Sign up</h2>

          <input
            className='authInput'
            type='text'
            {...register('username')}
            placeholder='Username'
            required
          />

          <input
            className='authInput'
            type='email'
            {...register('email')}
            name='email'
            placeholder='Email Address'
            required
          />

          <input
            className='authInput'
            type='password'
            {...register('password')}
            placeholder='Password'
            autoComplete='false'
            required
          />

          <input
            className='authInput'
            type='password'
            {...register('passwordConfirm')}
            placeholder='Confirm Password'
            autoComplete='false'
            required
          />

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
