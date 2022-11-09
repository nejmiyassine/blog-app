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
      <h2 className='text-lg font-bold text-center mb-2'>POSTS YOU MAY LIKE</h2>
      {recommendedPosts?.length &&
        recommendedPosts?.slice(0, 3).map((post: Post) => (
          <div className='py-4 lg:py-2' key={post.id}>
            <div className='font-bold text-lg'>
              <img
                className='h-[200px] w-[100%] object-fit'
                src={`../upload/${post.img}`}
                alt={`${post.title}`}
              />

              <h3 className=''>{post.title}</h3>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Menu;
