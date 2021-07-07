import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';

import UserInfo from './UserInfo';
import { logout } from '../store/actions/auth';

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
          <MenuItem icon={<i className='fa fa-users'></i>}>View Teams</MenuItem>
          <MenuItem icon={<i className='fa fa-user'></i>}>
            Edit Profile
          </MenuItem>
          <MenuItem icon={<i className='fa fa-edit'></i>}>
            Update Password
          </MenuItem>
          <MenuItem icon={<i className='fa fa-trash'></i>}>
            Delete Account
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
