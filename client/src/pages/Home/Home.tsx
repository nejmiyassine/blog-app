import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import { getText } from '../../helpers/helpers';
import { Post, useGetAllPostsQuery } from '../../redux/api/postsApi';

const Home: React.FC = () => {
  const category = useLocation().search;
  const isCategory: string = category === '' ? '/' : category;
  const { data, isLoading } = useGetAllPostsQuery(isCategory);

  return (
    <div className='home'>
      <div className='homeHeader'>
        <HomeHeader />
      </div>
      {isLoading && (
        <div>
          <h2>Loading posts at the Moment.</h2>
        </div>
      )}
      <div className='posts'>
        {data ? (
          data.map((post: Post) => (
            <div key={post.id}>
              <hr />
              <div className='post'>
                <div className='content'>
                  <Link to={`/post/${post.id}`}>
                    <h2>
                      {post.title.length > 50
                        ? post.title.substring(0, 50) + '...'
                        : post.title}
                    </h2>
                  </Link>
                  <p>
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

                <div className='img'>
                  {post.img.includes('http') ? (
                    <img src={`${post.img}`} alt={`${post.title}`} />
                  ) : (
                    <img src={`./upload/${post.img}`} alt={`${post.title}`} />
                  )}
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
