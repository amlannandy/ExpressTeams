import React from 'react';

import Logo from '../images/logo.png';
import UserInfo from '../components/UserInfo';
import TeamCard from '../components/TeamCard';

const Home = () => {
  const dummy = [1, 2, 3, 4, 5];

  return (
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
  );
};

export default Home;
