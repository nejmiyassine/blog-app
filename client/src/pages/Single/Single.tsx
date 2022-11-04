import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Md from 'react-icons/md';
import * as Bs from 'react-icons/bs';
import moment from 'moment';
import { useGetPostByIdQuery } from '../../redux/api/postsApi';
import { useAppSelector } from '../../redux/store';
import Menu from '../../components/Menu';
import './single.scss';

const Single: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split('/')[2];

  const { data, isLoading } = useGetPostByIdQuery(postId);

  return (
    <div className='single'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='content' key={postId}>
          <img className='blogimg' src={data?.img} alt={data?.title} />
          <div className='user'>
            {!data?.userImg ? (
              <img
                src='https://cricdaddy.com/wp-content/uploads/2020/08/blank-profile-picture-png.png'
                alt={data?.username}
              />
            ) : (
              <img src={data?.userImg} alt={data?.username} />
            )}
            <div className='info'>
              <span>{data?.username}</span>
              <p>Poster {moment(data?.date).fromNow()}</p>
            </div>
            {user && user?.username === data?.username && (
              <div className='icons'>
                <Link className='icon edit' to={`/write?edit=id1`}>
                  <Md.MdEdit />
                </Link>
                <div className='icon delete'>
                  <Bs.BsFillTrashFill />
                </div>
              </div>
            )}
          </div>
          <h2>{data?.title}</h2>
          {data?.description}
        </div>
      )}

      <div className='menu'>
        <Menu />
      </div>
    </div>
  );
};

export default Single;
