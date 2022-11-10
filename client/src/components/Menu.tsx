import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <h2 className='text-lg font-bold text-center mb-2'>POSTS YOU MAY LIKE</h2>
      {recommendedPosts?.length &&
        recommendedPosts?.slice(0, 3).map((post: Post) => (
          <div className='py-4 lg:py-2' key={post.id}>
            <div className='my-2'>
              <img
                className='rounded-lg h-[200px] w-[100%] object-fit'
                src={`../upload/${post.img}`}
                alt={`${post.title}`}
              />

              <Link to={`/post/${post.id}`}>
                <h3 className='font-bold text-lg mt-1'>{post.title}</h3>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Menu;
