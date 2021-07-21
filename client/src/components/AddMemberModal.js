import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addTeamMember } from '../store/actions/teams';
import { getUsersList } from '../store/actions/auth';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AddMemberModal = ({ isOpen, onCancel }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { users } = useSelector(state => state.auth);
  const { team, isLoading, error } = useSelector(state => state.teams);

  useEffect(() => {
    dispatch(getUsersList());
  }, []);

  const addTeamMemberHandler = () => {
    dispatch(addTeamMember(team._id, email, onCancel));
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
      <div className='card'>
        <div className='card-header'>
          <p className='lead font-weight-bold'>Add Team Member</p>
        </div>
        <div className='card-body'>
          <p>Select the email of the user you want to add to the team</p>
          {error ? (
            <div className='alert alert-danger'>
              <small>{error}</small>
            </div>
          ) : null}
          <select name='email' onChange={e => setEmail(e.target.value)}>
            {users.map(user => (
              <option value={user.email}>{user.email}</option>
            ))}
          </select>
        </div>
        <div className='card-footer'>
          <div className='d-flex justify-content-between'>
            <button className='btn btn-danger' onClick={onCancel}>
              Cancel
            </button>
            <button className='btn btn-success' onClick={addTeamMemberHandler}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddMemberModal;
