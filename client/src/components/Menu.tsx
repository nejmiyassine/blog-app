import React from 'react';
import { Post, useGetPostsByCategoryQuery } from '../redux/api/postsApi';

interface MenuProps {
  category: string;
}

const Menu: React.FC<MenuProps> = ({ category }) => {
  const { data: recommendedPosts } = useGetPostsByCategoryQuery(category);

  return (
    <>
      <h2>Posts you may like</h2>
      {recommendedPosts &&
        recommendedPosts.length > 3 &&
        recommendedPosts.slice(0, 3).map((post: Post) => (
          <div key={post.id}>
            <div className='post'>
              {post.img.includes('http') ? (
                <img src={`${post.img}`} alt={`${post.title}`} />
              ) : (
                <img src={`../upload/${post.img}`} alt={`${post.title}`} />
              )}
              {/* <img src={post.img} alt={`${post.title}-${post.category}`} /> */}
              <h3>{post.title}</h3>
            </div>
          </div>
        ))}
    </>
  );
};

export default Menu;
