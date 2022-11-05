import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/Login/Login';
import { RegisterInput } from '../../pages/Register/Register';
import { setUser } from '../features/auth/userSlice';
import { IGenericResponse } from './types';
import { BASE_URL } from '../CONSTANTS';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, RegisterInput>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation<
      { id: number; username: string; email: string; password: string },
      LoginInput
    >({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      transformResponse: (result: {
        id: number;
        username: string;
        email: string;
        password: string;
      }) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi;
