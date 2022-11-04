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
    getAllPosts: builder.query<PostsData, string>({
      query: (category) => `${category}`,
    }),
    getPostById: builder.query<
      Post & { username: string; userImg: string },
      string
    >({
      query: (postId) => `/${postId}`,
    }),
    deletePostById: builder.mutation<{ id: number }, string>({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const { useGetAllPostsQuery, useGetPostByIdQuery } = postsApi;
