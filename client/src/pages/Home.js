import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CustomSidebar from '../components/CustomSidebar';
import LoadingIndicator from '../components/LoadingIndicator';

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
          <div>
            <h1>Hello</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
