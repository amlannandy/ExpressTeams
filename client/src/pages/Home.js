import React, { Fragment } from 'react';

import Logo from '../images/logo.png';
import UserInfo from '../components/UserInfo';
import TeamCard from '../components/TeamCard';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import DeleteAccountModal from '../components/DeleteAccountModal';

const Home = () => {
  const dummy = [1, 2, 3, 4, 5];

  const { isLoading, isAuthenticated, error } = useSelector(
    state => state.auth
  );

  if (!isLoading && !isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <div>
      <div className='container'>
        <div className='row m-5'>
          <div className='col-3'>
            <img src={Logo} alt='' />
            <UserInfo />
          </div>
          <div className='col-9'>
            {dummy.map(dum => (
              <TeamCard />
            ))}
          </div>
        </div>
      </div>
      <DeleteAccountModal />
    </div>
  );
};

export default Home;
