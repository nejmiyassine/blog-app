import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../CONSTANTS';

export interface Post {
  id: number;
  title: string;
  description: string;
  img: string;
  category: string;
  date: string;
  uid: number;
}

export type PostsData = Post[];

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builder) => ({
    // Fisrt Type: Posts type of Data we wanna get back
    // Second Type: Type of args
    getAllPosts: builder.query<PostsData, undefined>({
      query: () => '/posts',
    }),
  }),
});

export const { useGetAllPostsQuery } = postsApi;
