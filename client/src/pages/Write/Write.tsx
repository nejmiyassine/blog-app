import React, { useState } from 'react';
import * as Bs from 'react-icons/bs';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  useAddNewPostMutation,
  useUpdatePostMutation,
  useUploadFileMutation,
} from '../../redux/api/postsApi';
import 'react-quill/dist/quill.snow.css';

const Write: React.FC = () => {
  const categories: { id: number; category: string }[] = [
    { id: 1, category: 'art' },
    { id: 2, category: 'technology' },
    { id: 3, category: 'science' },
    { id: 4, category: 'cinema' },
    { id: 5, category: 'design' },
    { id: 6, category: 'food' },
  ];

  const navigate = useNavigate();
  const state = useLocation().state;

  const [value, setValue] = useState<string>(state?.description || '');
  const [title, setTitle] = useState<string>(state?.title || '');
  const [file, setFile] = useState<any>(null);
  const [categoryState, setCategoryState] = useState(state?.category || 'art');

  const [addNewPost] = useAddNewPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [uploadFile] = useUploadFileMutation();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCategoryState(e.target.value);

  const handleFile = (e: any) => setFile(e.target.files[0]);

  const upload = () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      return uploadFile(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imgUrl = await upload();
    let { data }: any = imgUrl;

    let updateData = {
      title,
      img: file ? data : '',
      description: value,
      category: categoryState,
    };

    let postData = {
      ...updateData,
      date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    };

    try {
      state
        ? updatePost({ id: state?.id, post: updateData })
        : addNewPost(postData);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='pl-16 w-full  overflow-hidden'>
      <div className='p-5 flex flex-col items-center justify-center m-auto w-[300px] sm:w-[500px] sm:items-start'>
        <h2 className='text-center pb-4 font-bold text-lg'>
          {state ? 'Update a Post' : 'Add a Post'}
        </h2>
        <div className='flex flex-col text-gray-700 w-[100%]'>
          <label htmlFor='title' className='mb-2 dark:text-white'>
            <span className='text-sm font-semibold'>Blog Title</span>
          </label>
          <input
            type='text'
            name='title'
            value={title}
            className='border w-[100%] text-sm rounded-md p-3 bg-transparent dark:text-white'
            placeholder='Blog Title'
            onChange={handleTitleChange}
            required
          />
        </div>

        <div className='my-5 h-[250px] w-[100%]'>
          <label htmlFor='title'>
            <span className='text-sm font-semibold'>Blog Description</span>
          </label>
          <ReactQuill
            className='my-2 h-[170px]'
            theme='snow'
            value={value}
            onChange={setValue}
          />
        </div>

        <div className='mt-5'>
          <label
            htmlFor='file'
            className='flex items-center cursor-pointer w-fit'
          >
            <Bs.BsImage size={25} className='pr-2' /> Upload Post Image
            (Required!)
          </label>
          <input
            type='file'
            name='file'
            id='file'
            className='block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-violet-50 file:text-violet-700
                          hover:file:bg-violet-100
                        '
            onChange={handleFile}
            accept='image/png, image/jpeg, image/jpg'
          />
        </div>

        <div className='py-4'>
          <h2 className='pb-2 font-semibold text-sm'>
            Choose Your Post Category:
          </h2>
          {categories.map(({ id, category }) => (
            <div className='category' key={id}>
              <input
                type='radio'
                checked={categoryState === category}
                className='mt-2'
                name='category'
                value={category}
                id={category}
                onChange={handleCategoryChange}
                required
              />
              <label htmlFor={category}>{category.toUpperCase()}</label>
            </div>
          ))}
        </div>

        <div></div>
      </div>
    </form>
  );
};

export default Write;
