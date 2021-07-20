import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteConfirmModal from './DeleteConfirmModal';
import CreateUpdateTeam from '../pages/CreateUpdateTeam';
import { deleteTeam } from '../store/actions/teams';

const TeamInfo = () => {
  const dispatch = useDispatch();
  const { team } = useSelector(state => state.teams);
  const [isUpdateTeamModalOpen, setIsUpdateTeamModalOpen] = useState(false);
  const [isDeleteTeamModalOpen, setIsDeleteTeamModalOpen] = useState(false);

  const deleteTeamHandler = () => {
    dispatch(deleteTeam(team._id, () => setIsDeleteTeamModalOpen(false)));
  };

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
              <button
                className='btn btn-light'
                onClick={() => setIsDeleteTeamModalOpen(true)}>
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
      <DeleteConfirmModal
        isOpen={isDeleteTeamModalOpen}
        description={`Are you sure you want to delete the team ${team.name}?`}
        onConfirm={deleteTeamHandler}
        onCancel={() => setIsDeleteTeamModalOpen(false)}
      />
    </div>
  );
};

export default TeamInfo;
