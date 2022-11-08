import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Loading from '../../components/Loading/Loading';
import { getText } from '../../helpers/helpers';
import { Post, useGetAllPostsQuery } from '../../redux/api/postsApi';

const Home: React.FC = () => {
  const category = useLocation().search;
  const isCategory: string = category === '' ? '/' : category;
  const { data, isLoading } = useGetAllPostsQuery(isCategory);

  return (
    <div className='pl-16'>
      <HomeHeader />

      {isLoading && <Loading />}

      <div className='posts grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {data ? (
          data.map((post: Post) => (
            <div key={post.id} className='p-3'>
              <div className=' p-3 rounded-md drop-shadow-md dark:shadow-white md:shadow-lg bg-white dark:bg-slate-900'>
                <div className='content'>
                  <div className='flex items-center'>
                    {post.img.includes('http') ? (
                      <img
                        className='w-[150px] h-[100px] object-cover'
                        src={`${post.img}`}
                        alt={`${post.title}`}
                      />
                    ) : (
                      <img
                        className='w-[150px] h-[100px] object-cover'
                        src={`./upload/${post.img}`}
                        alt={`${post.title}`}
                      />
                    )}

                    <Link to={`/post/${post.id}`} className='pl-3 font-bold'>
                      <h2>
                        {post.title.length > 50
                          ? post.title.substring(0, 50) + '...'
                          : post.title}
                      </h2>
                    </Link>
                  </div>

                  <p className='text-center py-4'>
                    {post.description.length > 350
                      ? getText(post.description)?.substring(0, 350) + '...'
                      : getText(post.description)}
                  </p>

                  <Link to={`/post/${post.id}`}>
                    <button className='readmore'>Read More</button>
                  </Link>

                  <div className='category'>
                    <span>{post.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h2>No posts at the Moment.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
