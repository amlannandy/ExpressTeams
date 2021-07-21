import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddMemberModal from './AddMemberModal';
import EmptyBanner from '../components/EmptyBanner';
import DeleteConfirmModal from './DeleteConfirmModal';
import CreateUpdateTeam from '../pages/CreateUpdateTeam';
import { deleteTeam, removeTeamMember } from '../store/actions/teams';

const TeamInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { team } = useSelector(state => state.teams);
  const [isUpdateTeamModalOpen, setIsUpdateTeamModalOpen] = useState(false);
  const [isDeleteTeamModalOpen, setIsDeleteTeamModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const deleteTeamHandler = () => {
    dispatch(deleteTeam(team._id, () => setIsDeleteTeamModalOpen(false)));
  };

  const removeTeamMemberHandler = email => {
    dispatch(removeTeamMember(team._id, email));
  };

  return (
    <div>
      <div>
        <div className='jumbotron py-3'>
          <div className='d-flex justify-content-between'>
            <small className='font-weight-bold'>Description</small>
            {user._id === team.admin._id ? (
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
            ) : (
              <div></div>
            )}
          </div>
          <p>{team.description}</p>
        </div>
        <div className='card bg-dark text-light mb-2'>
          <div className='d-flex p-3'>
            <i className='fa fa-user fa-2x pt-2 mr-3'></i>
            <div>
              <p className='my-0 py-0'>{team.admin.name}</p>
              <small className='text-muted'>Admin</small>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-header'>
            <div className='d-flex justify-content-between'>
              <p className='lead py-0 my-0 font-weight-bold'>Team Members</p>
              {user._id === team.admin._id ? (
                <button
                  className='btn btn-dark'
                  onClick={() => setIsAddMemberModalOpen(true)}>
                  <i className='fa fa-plus text-light'></i>
                </button>
              ) : null}
            </div>
          </div>
          <div className='card-body'>
            {team.members.length === 0 ? (
              <EmptyBanner text='No members yet' />
            ) : (
              team.members.map(member => (
                <div key={member._id} className='alert alert-secondary my-1'>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <p className='font-weight-bold py-0 my-0'>
                        {member.name}
                      </p>
                      <small>{member.email}</small>
                    </div>
                    {user._id === team.admin._id ? (
                      <i
                        className='fa fa-trash'
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          removeTeamMemberHandler(member.email)
                        }></i>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
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
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onCancel={() => setIsAddMemberModalOpen(false)}
      />
    </div>
  );
};

export default TeamInfo;
