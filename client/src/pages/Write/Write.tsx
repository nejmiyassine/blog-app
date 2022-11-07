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
import './write.scss';

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
  const [value, setValue] = useState<string>(state?.value || '');
  const [title, setTitle] = useState<string>(state?.title || '');
  const [file, setFile] = useState<any>(null);
  const [categoryState, setCategoryState] = useState(
    state?.categoryState || 'art'
  );

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
    } catch (error) {}

    console.log('updateData', updateData);
    console.log('postData', postData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='writeContent'>
        <div className='content'>
          <input
            type='text'
            name='title'
            placeholder='Blog Title'
            onChange={handleTitleChange}
            required
          />
          <div className='editorContainer'>
            <ReactQuill
              className='editor'
              theme='snow'
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className='menu'>
          <div className='item'>
            <h2>Publish</h2>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              type='file'
              name='file'
              id='file'
              onChange={handleFile}
              accept='image/png, image/jpeg, image/jpg'
              // required
            />
            <div className='upload'>
              <span>
                <Bs.BsImage />
              </span>
              <label htmlFor='file'>Upload Image</label>
            </div>
            <div className='buttons'>
              <button className='save'>Save as draft</button>
              <button className='update'>Update</button>
            </div>
          </div>
          <div className='item'>
            <h2>Category</h2>

            {categories.map(({ id, category }) => (
              <div className='category' key={id}>
                <input
                  type='radio'
                  checked={categoryState === category}
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
        </div>
      </div>
    </form>
  );
};

export default Write;
