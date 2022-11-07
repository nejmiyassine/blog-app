import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as Md from 'react-icons/md';
import * as Bs from 'react-icons/bs';
import moment from 'moment';
import {
  useDeletePostMutation,
  useGetPostByIdQuery,
} from '../../redux/api/postsApi';
import { useAppSelector } from '../../redux/store';
import Menu from '../../components/Menu';
import './single.scss';
import { getText } from '../../helpers/helpers';

const Single: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split('/')[2];

  const {
    data,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
  } = useGetPostByIdQuery(postId);
  const [deletePost] = useDeletePostMutation();

  const deletePostById = () => {
    deletePost(postId);
    navigate('/');
  };

  return (
    <div className='single'>
      {isGetLoading && (
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}

      {isGetError && (
        <div className='alert alert-danger' role='alert'>
          error
        </div>
      )}

      {isGetSuccess && (
        <>
          <div className='content' key={postId}>
            {data.img.includes('http') ? (
              <img
                className='blogimg'
                src={`${data.img}`}
                alt={`${data.title}`}
              />
            ) : (
              <img
                className='blogimg'
                src={`../upload/${data.img}`}
                alt={`${data.title}`}
              />
            )}
            <div className='user'>
              {!data?.userImg ? (
                <img
                  src='https://cricdaddy.com/wp-content/uploads/2020/08/blank-profile-picture-png.png'
                  alt={data?.username}
                />
              ) : (
                <img src={data?.userImg} alt={data?.username} />
              )}
              <div className='info'>
                <span>{data?.username}</span>
                <p>Poster {moment(data?.date).fromNow()}</p>
              </div>
              {user && user?.username === data?.username && (
                <div className='icons'>
                  <Link
                    className='icon edit'
                    to={`/write?edit=${postId}`}
                    state={data}
                  >
                    <Md.MdEdit />
                  </Link>
                  <button className='icon delete' onClick={deletePostById}>
                    <Bs.BsFillTrashFill />
                  </button>
                </div>
              )}
            </div>
            <h2>{data?.title}</h2>
            {data.description && getText(data.description)}
          </div>

          <div className='menu'>
            <Menu category={data.category} />
          </div>
        </>
      )}
    </div>
  );
};

export default Single;
