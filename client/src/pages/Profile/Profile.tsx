import React from 'react';
import { useAppSelector } from '../../store/store';

const Profile = () => {
  const user = useAppSelector((state) => state.user);

  console.log(user);

  return (
    <div>
      <h2>Profile Page</h2>
      <div></div>
    </div>
  );
};

export default Profile;
