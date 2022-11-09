import React from 'react';
import { useGetAllPostsQuery } from '../../redux/api/postsApi';
import { useAppSelector } from '../../redux/store';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const { data: posts } = useGetAllPostsQuery('');

  return (
    <div className='pl-16'>
      <div className='p-4 flex flex-col gap-4 justify-center'>
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
            Your Have{' '}
            {posts
              ? posts?.filter(({ uid }: { uid: number }) => user?.id === uid)
                  ?.length
              : 0}{' '}
            Posts
          </h2>

          <table className='w-full'>
            <thead className='rounded-md bg-gray-100 border-b-2 border-gray-200 dark:bg-cyan-500 dark:border-zinc-800'>
              <tr>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                  Id
                </th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                  Title
                </th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                  category
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Malcolm Lockyer</td>
                <td>Art</td>
              </tr>
              <tr>
                <td>2</td>
                <td>The Eagles</td>
                <td>technology</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
