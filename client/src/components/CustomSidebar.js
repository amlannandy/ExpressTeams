import React from 'react';
import { useSelector } from 'react-redux';
import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';

import UserInfo from './UserInfo';

const CustomSidebar = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className='col p-0'>
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
          <MenuItem icon={<i className='fa fa-power-off'></i>}>Logout</MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default CustomSidebar;
