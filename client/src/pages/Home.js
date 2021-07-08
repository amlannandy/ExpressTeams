import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

import Teams from './Teams';
import EditProfile from './EditProfile';
import VerifyAccount from './VerifyAccount';
import DeleteAccount from './DeleteAccount';
import UpdatePassword from './UpdatePassword';
import CustomSidebar from '../components/CustomSidebar';
import LoadingIndicator from '../components/LoadingIndicator';

const Home = () => {
  const { isLoading, isAuthenticated, user } = useSelector(state => state.auth);

  if (!isLoading && !isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='d-flex'>
      <CustomSidebar />
      <div className='home-box'>
        {isLoading ? (
          <LoadingIndicator />
        ) : user && user.isVerified ? (
          <div className='m-4'>
            <Switch>
              <Route path='/edit-profile' component={EditProfile} />
              <Route path='/update-password' component={UpdatePassword} />
              <Route path='/delete-account' component={DeleteAccount} />
              <Route path='/' component={Teams} />
            </Switch>
          </div>
        ) : (
          <VerifyAccount />
        )}
      </div>
    </div>
  );
};

export default Home;
