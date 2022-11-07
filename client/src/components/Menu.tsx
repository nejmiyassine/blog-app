import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Post, useGetPostsByCategoryQuery } from '../redux/api/postsApi';

interface MenuProps {
  category: string;
}

const Menu: React.FC<MenuProps> = ({ category }) => {
  const {
    data: recommendedPosts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByCategoryQuery(category);

  useEffect(() => {
    if (isSuccess) {
      // window.location.href = '/login';
      toast.success('Fetch Posts Successfully');
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) => toast.error(el.message));
      } else {
        toast.error((error as any).data.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div>
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
    </div>
  );
};

export default Menu;
