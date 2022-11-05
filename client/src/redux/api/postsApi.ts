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
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/posts` }),
  endpoints: (builder) => ({
    // Fisrt Type: Posts type of Data we wanna get back
    // Second Type: Type of args
    getAllPosts: builder.query<PostsData, string | undefined>({
      query: (category) => `${category}`,
    }),
    getPostsByCategory: builder.query<PostsData, string>({
      query: (category) => `/?${category}`,
    }),
    getPostById: builder.query<
      Post & { username: string; userImg: string },
      string
    >({
      query: (postId) => `/${postId}`,
    }),
    deletePostById: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    addNewPost: builder.mutation({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    deletePost: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetPostsByCategoryQuery,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
} = postsApi;
