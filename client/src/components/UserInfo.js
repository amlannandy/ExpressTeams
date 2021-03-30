import React from 'react';

import User from '../images/user.png';

const UserInfo = () => {
  return (
    <div className='card'>
      <div className='col text-center py-4'>
        <img src={User} alt='' height='150px' width='150px' />
        <p className='lead mt-3 mb-0'>Amlan Kumar Nandy</p>
        <small>amlannandy5@gmail.com</small>
        <hr />
        <button className='btn btn-secondary btn-block'>
          <i className='fas fa-power-off mr-2'></i>
          Log out
        </button>
        <button className='btn btn-danger btn-block'>
          <i className='fas fa-trash mr-2'></i>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
