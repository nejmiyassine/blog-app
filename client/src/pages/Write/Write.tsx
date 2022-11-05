import React, { useState } from 'react';
import * as Bs from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAddNewPostMutation } from '../../redux/api/postsApi';
import './write.scss';

const Write: React.FC = () => {
  const [addNewPost] = useAddNewPostMutation();

  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      title,
      description: value,
      img: file,
      category,
      date: new Date(),
    };

    addNewPost(data);
  };

  return (
    <div className='writeContent'>
      <div className='content'>
        <input
          type='text'
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setFile(e.target.files[0])}
            required
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
          <div className='category'>
            <input type='radio' name='category' value='art' id='art' />
            <label htmlFor='art'>Art</label>
          </div>
          <div className='category'>
            <input
              type='radio'
              name='category'
              value='technology'
              id='technology'
            />
            <label htmlFor='technology'>Technology</label>
          </div>
          <div className='category'>
            <input type='radio' name='category' value='science' id='science' />
            <label htmlFor='science'>Science</label>
          </div>
          <div className='category'>
            <input type='radio' name='category' value='food' id='food' />
            <label htmlFor='food'>Food</label>
          </div>
          <div className='category'>
            <input type='radio' name='category' value='cinema' id='cinema' />
            <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className='category'>
            <input type='radio' name='category' value='design' id='design' />
            <label htmlFor='design'>Design</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
