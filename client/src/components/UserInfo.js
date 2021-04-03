import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import User from '../images/user.png';
import { logout } from '../store/actions/auth';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector(state => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (!isAuthenticated) {
    return <h1>Unauthorized</h1>;
  }

  return (
    <div className='card'>
      <div className='col text-center py-4'>
        <img src={User} alt='' height='150px' width='150px' />
        <p className='lead mt-3 mb-0'>{user.name}</p>
        <small>{user.email}</small>
        <hr />
        <button onClick={logoutHandler} className='btn btn-secondary btn-block'>
          <i className='fas fa-power-off mr-2'></i>
          Log out
        </button>
        <button
          className='btn btn-danger btn-block'
          data-toggle='modal'
          data-target='#deleteAccountModal'>
          <i className='fas fa-trash mr-2'></i>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
