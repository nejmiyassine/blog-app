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

export interface IPostResponse {
  category: string;
  description: string;
  title: string;
  img: any;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builder) => ({
    // Fisrt Type: Posts type of Data we wanna get back
    // Second Type: Type of args
    getAllPosts: builder.query<PostsData, string | undefined>({
      query: (category) => `/posts${category}`,
    }),
    getPostsByCategory: builder.query<PostsData, string>({
      query: (category) => `/posts/?${category}`,
    }),
    getPostById: builder.query<
      Post & { username: string; userImg: string },
      string
    >({
      query: (postId) => `/posts/${postId}`,
    }),
    deletePostById: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    uploadFile: builder.mutation({
      query: (payload) => ({
        url: '/upload',
        method: 'POST',
        body: payload,
      }),
    }),
    addNewPost: builder.mutation<
      IPostResponse,
      IPostResponse & { date: string }
    >({
      query: (payload) => ({
        url: '/posts',
        method: 'POST',
        credentials: 'include',
        body: payload,
      }),
    }),
    updatePost: builder.mutation<
      IPostResponse,
      { id: string; post: IPostResponse }
    >({
      query: ({ id, post }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        credentials: 'include',
        body: post,
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
  useUploadFileMutation,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
