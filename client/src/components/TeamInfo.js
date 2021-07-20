import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CreateUpdateTeam from '../pages/CreateUpdateTeam';

const TeamInfo = () => {
  const { team } = useSelector(state => state.teams);
  const [isUpdateTeamModalOpen, setIsUpdateTeamModalOpen] = useState(false);

  return (
    <div>
      <div>
        <div className='jumbotron py-3'>
          <div className='d-flex justify-content-between'>
            <small className='font-weight-bold'>Description</small>
            <div className='d-flex'>
              <button
                className='btn btn-light mr-2'
                onClick={() => setIsUpdateTeamModalOpen(true)}>
                <i className='fa fa-pencil-alt'></i>
              </button>
              <button className='btn btn-light'>
                <i className='fa fa-trash'></i>
              </button>
            </div>
          </div>
          <p>{team.description}</p>
        </div>
      </div>
      <CreateUpdateTeam
        isEdit={true}
        team={team}
        isOpen={isUpdateTeamModalOpen}
        onCancel={() => setIsUpdateTeamModalOpen(false)}
      />
    </div>
  );
};

export default TeamInfo;
