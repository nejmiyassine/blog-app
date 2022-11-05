import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import { Post, useGetAllPostsQuery } from '../../redux/api/postsApi';
import './Home.scss';

const Home: React.FC = () => {
  const category = useLocation().search;
  const isCategory: string = category === '' ? '/' : category;
  const { data } = useGetAllPostsQuery(isCategory);

  return (
    <div className='home'>
      <div className='homeHeader'>
        <HomeHeader />
      </div>
      <div className='posts'>
        {data ? (
          data.map((post: Post) => (
            <div key={post.id}>
              <hr />
              <div className='post'>
                <div className='content'>
                  <Link to={`/post/${post.id}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <p>{post.description}</p>
                  <Link to={`/post/${post.id}`}>
                    <button className='readmore'>Read More</button>
                  </Link>
                  <div className='category'>
                    <span>{post.category}</span>
                  </div>
                </div>

                <div className='img'>
                  <img src={`${post.img}`} alt={`${post.title}`} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h2>Data Not Found! Please Try Again After While.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
