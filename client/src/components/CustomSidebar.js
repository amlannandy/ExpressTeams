import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';

import UserInfo from './UserInfo';
import { logout } from '../store/actions/auth';
import { Link } from 'react-router-dom';

const CustomSidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className='flex-column'>
      <ProSidebar className='custom-sidebar'>
        <UserInfo user={user} />
        <Menu iconShape='square'>
          <MenuItem icon={<i className='fa fa-users'></i>}>
            <Link to='/'>View Teams</Link>
          </MenuItem>
          <MenuItem icon={<i className='fa fa-user'></i>}>
            <Link to='/edit-profile'>Edit Profile</Link>
          </MenuItem>
          <MenuItem icon={<i className='fa fa-edit'></i>}>
            <Link to='/update-password'>Update Password</Link>
          </MenuItem>
          <MenuItem icon={<i className='fa fa-trash'></i>}>
            <Link to='/delete-account'>Delete Account</Link>
          </MenuItem>
          <MenuItem
            icon={<i className='fa fa-power-off'></i>}
            onClick={logoutHandler}>
            Logout
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default CustomSidebar;
