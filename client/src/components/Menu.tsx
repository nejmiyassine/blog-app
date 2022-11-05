import React from 'react';
import { Post, useGetPostsByCategoryQuery } from '../redux/api/postsApi';

interface MenuProps {
  category: string;
}

const Menu: React.FC<MenuProps> = ({ category }) => {
  const { data: recommendedPosts } = useGetPostsByCategoryQuery(category);
  console.log(recommendedPosts);

  return (
    <>
      <h2>Posts you may like</h2>
      {recommendedPosts &&
        recommendedPosts.map((post: Post) => (
          <>
            <hr />
            <div className='post'>
              <img src={post.img} alt={`${post.title}-${post.category}`} />
              <h3>{post.title}</h3>
            </div>
          </>
        ))}
    </>
  );
};

export default Menu;
