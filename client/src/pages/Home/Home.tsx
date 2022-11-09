import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { getText } from '../../helpers/helpers';
import { Post, useGetAllPostsQuery } from '../../redux/api/postsApi';

const Home: React.FC = () => {
  const category = useLocation().search;
  const isCategory: string = category === '' ? '/' : category;
  const { data, isLoading } = useGetAllPostsQuery(isCategory);

  return (
    <div className='pl-16 min-h-screen'>
      {isLoading && <Loading />}

      <div className='posts grid md:w-[700px] lg:md:w-[1024px] m-auto grid-cols-1'>
        {data?.length ? (
          data.map((post: Post) => (
            <div key={post.id} className='m-4 sm:m-7'>
              <div className='rounded-md drop-shadow-md bg-white dark:bg-zinc-800'>
                <div className='content flex flex-col-reverse md:flex-row items-center gap-4 '>
                  <div className='m-4 mt-0 md:w-[60%]'>
                    <Link
                      to={`/post/${post.id}`}
                      className='pl-3 font-bold text-md sm:text-xl'
                    >
                      <h2>
                        {post.title.length > 50
                          ? post.title.substring(0, 50) + '...'
                          : post.title}
                      </h2>
                    </Link>

                    <p className='text-justify py-4 text-sm'>
                      {post.description.length > 200
                        ? getText(post.description)?.substring(0, 200) + '...'
                        : getText(post.description)}
                    </p>

                    <div className='cursor-pointer text-red-700 text-sm font-medium w-fit p-2 rounded-md drop-shadow-lg bg-white dark:bg-zinc-700 dark:text-gray-100'>
                      <span className='italic'>#{post.category}</span>
                    </div>
                  </div>

                  <div className='w-[100%] md:w-[40%]'>
                    <img
                      className='w-[100%] h-[200px] object-cover'
                      src={`./upload/${post.img}`}
                      alt={`${post.title}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center'>
            <h2 className='text-xl font-semibold'>No Posts Found!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
