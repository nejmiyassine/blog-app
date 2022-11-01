import React from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <div className='home'>
      <div className='homeHeader'>
        <HomeHeader />
      </div>
      <div className='posts'>
        {/* map */}
        <hr />
        <div className='post'>
          <div className='content'>
            <Link to='/post/id1'>
              <h2>Post Title 1</h2>
            </Link>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              necessitatibus consectetur dignissimos. Impedit quidem laudantium
              quisquam nostrum expedita consequatur odit beatae ullam deleniti
              porro officiis, est perferendis, dolorum, in quia.
            </p>
            <Link to='/post/id1'>
              <button>Read More</button>
            </Link>
            <div className='topics'>
              <span>UX Design</span>
              <span>4 min read</span>
            </div>
          </div>

          <div className='img'>
            <img
              src='https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXglMjBkZXNpZ258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
              alt='ux-design-1'
            />
          </div>
        </div>
        <hr />
        {/* end map */}

        <div className='post'>
          <div className='content'>
            <Link to='/post/id1'>
              <h2>Post Title 2</h2>
            </Link>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              necessitatibus consectetur dignissimos. Impedit quidem laudantium
              quisquam nostrum expedita consequatur odit beatae ullam deleniti
              porro officiis, est perferendis, dolorum, in quia.
            </p>
            <Link to='/post/id1'>
              <button>Read More</button>
            </Link>
            <div className='topics'>
              <span>UX Design</span>
              <span>4 min read</span>
            </div>
          </div>

          <div className='img'>
            <img
              src='https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXglMjBkZXNpZ258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
              alt='ux-design-1'
            />
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Home;
