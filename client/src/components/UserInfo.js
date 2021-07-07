import React from 'react';

import User from '../images/user.png';

const UserInfo = ({ user }) => {
  return (
    <div className='text-center py-4'>
      <img src={User} alt='' height='120px' width='120px' />
      <p className='lead mt-3 mb-0'>{user ? user.name : ''}</p>
      <small>{user ? user.email : ''}</small>
    </div>
  );
};

export default UserInfo;
