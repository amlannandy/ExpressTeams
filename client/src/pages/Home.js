import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Logo from '../images/logo.png';
import UserInfo from '../components/UserInfo';
import TeamCard from '../components/TeamCard';
import DeleteAccountModal from '../components/DeleteAccountModal';
import { fetchTeams } from '../store/actions/teams';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, teams, error } = useSelector(state => state.teams);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loading</h1>;
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
            {teams.map(team => (
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
