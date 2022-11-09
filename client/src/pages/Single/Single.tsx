import React, { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

const Single: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const [err, setErr] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split('/')[2];

  const {
    data,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error,
  } = useGetPostByIdQuery(postId);
  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    if (isGetSuccess) {
      toast.success('Fetch Post Successfully');
      console.log('Fetch Post Successfully');
    }

    if (isGetError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) => {
          setErr(el.message);
          return toast.error(el.message);
        });
      } else {
        setErr((error as any).data.error);
        toast.error((error as any).data.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGetLoading]);

  const deletePostById = () => {
    deletePost(postId);
    navigate('/');
  };

  return (
    <div className='single pl-16'>
      {isGetLoading && <Loading />}

      {err && <div className='text-sm text-red-500'>{err}</div>}

      {isGetSuccess && (
        <div className='flex flex-col p-4 sm:w-[500px] lg:w-[980px] lg:flex-row lg:gap-6 xl:w-[1200px] m-auto'>
          <div className='lg:w-2/3 xl:w-3/4' key={postId}>
            <div className='flex items-center justify-between py-4 gap-4'>
              {!data?.userImg ? (
                <img
                  className='rounded-full w-10 h-10'
                  src='https://cdn-icons-png.flaticon.com/512/4140/4140048.png'
                  alt={data?.username}
                />
              ) : (
                <img
                  className='rounded-full w-10 h-10'
                  src={data?.userImg}
                  alt={data?.username}
                />
              )}
              <div className='flex flex-col'>
                <span className='font-bold text-md'>{data?.username}</span>
                <span className='text-sm italic text-gray-400'>
                  Poster {moment(data?.date).fromNow()}
                </span>
              </div>

              {user && user?.username === data?.username && (
                <div className='flex items-center gap-2'>
                  <Link
                    className='drop-shadow-md duration-200 hover:scale-125'
                    to={`/write?edit=${postId}`}
                    state={data}
                  >
                    <Md.MdEdit
                      size={25}
                      className='cursor-pointer text-green-500'
                    />
                  </Link>
                  <button
                    className='drop-shadow-md duration-200 hover:scale-125'
                    onClick={deletePostById}
                  >
                    <Bs.BsFillTrashFill
                      size={25}
                      className='cursor-pointer text-red-500'
                    />
                  </button>
                </div>
              )}
            </div>

            <img
              className='h-[200px] w-[100%] sm:h-[300px] object-cover py-4'
              src={`../upload/${data.img}`}
              alt={`${data.title}`}
            />

            <div className='py-4'>
              <h2 className='text-lg font-bold pb-4'>{data?.title}</h2>
              <div
                className='text-md text-justify'
                dangerouslySetInnerHTML={{ __html: data?.description }}
              />
            </div>
          </div>

          <div className='mt-6 lg:w-1/3'>
            <Menu category={data.category} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Single;
