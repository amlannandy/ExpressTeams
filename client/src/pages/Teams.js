import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TeamCard from '../components/TeamCard';
import EmptyBanner from '../components/EmptyBanner';
import LoadingIndicator from '../components/LoadingIndicator';
import CreateUpdateTeam from './CreateUpdateTeam';
import {
  fetchTeams,
  fetchAdminTeams,
  fetchMemberTeams,
} from '../store/actions/teams';

const activeClass = 'btn btn-secondary active';
const inactiveClass = 'btn btn-secondary';

const Teams = () => {
  const dispatch = useDispatch();
  const [teamsType, setTeamsType] = useState('all');
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const { isLoading, teams, error } = useSelector(state => state.teams);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const switchTeams = type => {
    if (type === teamsType) return;
    setTeamsType(type);
    switch (type) {
      case 'all':
        dispatch(fetchTeams());
        break;
      case 'admin':
        dispatch(fetchAdminTeams());
        break;
      case 'member':
        dispatch(fetchMemberTeams());
        break;
      default:
        dispatch(fetchTeams());
    }
  };

  return (
    <div>
      <div>
        <div className='d-flex justify-content-between'>
          <p className='lead font-weight-bold'>
            <i className='fa fa-users'> </i> Your Teams
          </p>
          <div className='d-flex-col'>
            <button
              className='btn btn-success btn-sm'
              onClick={() => setIsCreateTeamModalOpen(true)}>
              <i className='fa fa-plus text-light'></i>
            </button>
          </div>
        </div>
        <div className='btn-group'>
          <button
            type='button'
            className={teamsType === 'all' ? activeClass : inactiveClass}
            onClick={() => switchTeams('all')}>
            All
          </button>
          <button
            type='button'
            className={teamsType === 'admin' ? activeClass : inactiveClass}
            onClick={() => switchTeams('admin')}>
            Admin
          </button>
          <button
            type='button'
            className={teamsType === 'member' ? activeClass : inactiveClass}
            onClick={() => switchTeams('member')}>
            Member
          </button>
        </div>
        <hr />
        {isLoading ? (
          <LoadingIndicator />
        ) : error ? (
          <EmptyBanner text={error} />
        ) : teams.length === 0 ? (
          <EmptyBanner text='No teams found' />
        ) : (
          teams.map(team => <TeamCard key={team._id} team={team} />)
        )}
      </div>
      <CreateUpdateTeam
        isOpen={isCreateTeamModalOpen}
        onCancel={() => setIsCreateTeamModalOpen(false)}
      />
    </div>
  );
};

export default Teams;
