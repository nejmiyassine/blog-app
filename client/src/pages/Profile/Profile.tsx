import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table/Table';
import { shortText } from '../../helpers/helpers';
import { useGetAllPostsQuery } from '../../redux/api/postsApi';
import { useAppSelector } from '../../redux/store';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const { data: posts } = useGetAllPostsQuery('');
  const userPosts = posts?.filter(
    ({ uid }: { uid: number }) => user?.id === uid
  );
  // date / Description / img

  return (
    <div className='pl-16'>
      <div className='p-4 flex flex-col gap-4 justify-center md:w-[1000px] md:m-auto'>
        <h2 className='text-center font-bold text-lg'>Profile Page</h2>
        <div className='flex flex-col gap-2 items-center justify-center'>
          <img
            className='rounded-full w-20 h-20'
            src='https://cdn-icons-png.flaticon.com/512/4140/4140048.png'
            alt={`avatar-${user?.username}`}
          />

          <div>
            <span className='font-bold mr-2'>username:</span>
            {user?.username}
          </div>
          <div>
            <span className='font-bold mr-2'>email:</span>
            {user?.email}
          </div>
        </div>

        <div>
          <h2 className='text-center pb-4'>
            Your Have {posts ? userPosts?.length : 0} Posts
          </h2>

          {posts && <Table posts={posts} />}

          <div className='grid grid-cols-1 gap-6 md:hidden'>
            {posts &&
              posts.map(({ id, img, title, description, category }) => (
                <div
                  className='bg-gray-100 dark:bg-zinc-800 rounded-lg p-4 shadow'
                  key={id}
                >
                  <div className='flex items-center my-2 text-sm'>
                    <div className='flex flex-col mb-2'>
                      <div className='flex justify-between mb-2'>
                        <span className='font-bold'>{id}</span>
                        <span className='text-red-500 dark:text-yellow-200 font-semibold'>
                          {category}
                        </span>
                      </div>

                      <Link to={`/post/${id}`} className='flex justify-between'>
                        <img
                          className='h-10 w-10 object-cover'
                          src={`../upload/${img}`}
                          alt={`${title}-${id}`}
                        />
                        <h2 className='font-bold text-md ml-2'>
                          {shortText(title, 25)}
                        </h2>
                      </Link>
                    </div>
                  </div>
                  <div className='text-sm'>{shortText(description, 100)}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
