import React from 'react';

const Menu: React.FC = () => {
  return (
    <>
      <h2>Posts you may like</h2>
      {/* Map */}
      <div className='post'>
        <img
          src='https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXglMjBkZXNpZ258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          alt='post-1'
        />
        <h3>Post title 1</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minus.
        </p>
        <button className='readmore'>Read More</button>
      </div>

      <div className='post'>
        <img
          src='https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXglMjBkZXNpZ258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          alt='post-1'
        />
        <h3>Post title 1</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minus.
        </p>
        <button className='readmore'>Read More</button>
      </div>
      {/* End Map */}
    </>
  );
};

export default Menu;
