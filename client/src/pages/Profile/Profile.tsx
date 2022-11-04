import React from 'react';
import { useAppSelector } from '../../redux/store';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div>
      <h2>Profile Page</h2>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
    </div>
  );
};

export default Profile;
