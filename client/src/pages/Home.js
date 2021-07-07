import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

import CustomSidebar from '../components/CustomSidebar';
import LoadingIndicator from '../components/LoadingIndicator';
import DeleteAccount from './DeleteAccount';
import EditProfile from './EditProfile';
import Teams from './Teams';
import UpdatePassword from './UpdatePassword';

const Home = () => {
  const { isLoading, isAuthenticated } = useSelector(state => state.auth);

  if (!isLoading && !isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='d-flex'>
      <CustomSidebar />
      <div className='home-box'>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <Switch>
            <Route path='/edit-profile' component={EditProfile} />
            <Route path='/update-password' component={UpdatePassword} />
            <Route path='/delete-account' component={DeleteAccount} />
            <Route path='/' component={Teams} />
          </Switch>
        )}
      </div>
    </div>
  );
};

export default Home;
