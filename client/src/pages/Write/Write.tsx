import React, { useState } from 'react';
import * as Bs from 'react-icons/bs';
import ReactQuill from 'react-quill';
import { useAddNewPostMutation } from '../../redux/api/postsApi';
import 'react-quill/dist/quill.snow.css';
import './write.scss';

const Write: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [files, setFiles] = useState(null);
  const [category, setCategory] = useState('art');

  const [addNewPost] = useAddNewPostMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = {
      title,
      img: files,
      description: value,
      category,
    };

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='writeContent'>
        <div className='content'>
          <input
            type='text'
            placeholder='Blog Title'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
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
              onChange={(e: any) => setFiles(e.target.files[0])}
              id='file'
              accept='image/png, image/jpeg'
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
              <input
                type='radio'
                name='category'
                value='art'
                id='art'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              />
              <label htmlFor='art'>Art</label>
            </div>
            <div className='category'>
              <input
                type='radio'
                name='category'
                value='technology'
                id='technology'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              />
              <label htmlFor='technology'>Technology</label>
            </div>
            <div className='category'>
              <input
                type='radio'
                name='category'
                value='science'
                id='science'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              />
              <label htmlFor='science'>Science</label>
            </div>
            <div className='category'>
              <input
                type='radio'
                name='category'
                value='food'
                id='food'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              />
              <label htmlFor='food'>Food</label>
            </div>
            <div className='category'>
              <input
                type='radio'
                name='category'
                value='cinema'
                id='cinema'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              />
              <label htmlFor='cinema'>Cinema</label>
            </div>
            <div className='category'>
              <input
                type='radio'
                name='category'
                value='design'
                id='design'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              />
              <label htmlFor='design'>Design</label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Write;
