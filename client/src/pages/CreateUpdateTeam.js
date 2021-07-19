import React, { useReducer } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import formReducer from '../utils/formReducer';
import { createTeam } from '../store/actions/teams';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: { zIndex: 100000 },
};

const initialFormData = {
  name: '',
  description: '',
};

const CreateUpdateTeam = ({ isEdit = false, isOpen, onCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useReducer(formReducer, initialFormData);
  const { isLoading, error } = useSelector(state => state.teams);

  const createUpdateTeamHandler = e => {
    e.preventDefault();
    dispatch(createTeam(formData, onCancel));
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
      <form className='card' onSubmit={createUpdateTeamHandler}>
        <div className='card-header'>
          <p className='lead font-weight-bold'>Create Team</p>
        </div>
        <div className='card-body'>
          {error ? (
            <div className='alert alert-danger'>
              <small>{error}</small>
            </div>
          ) : null}
          <div className='form-group'>
            <label>Name</label>
            <input
              required
              name='name'
              value={formData.name}
              type='text'
              className='form-control'
              onChange={setFormData}
              disabled={isLoading}
            />
          </div>
          <div className='form-group'>
            <label>Description</label>
            <textarea
              name='description'
              cols='40'
              rows='5'
              required
              value={formData.description}
              type='text'
              className='form-control'
              onChange={setFormData}
              disabled={isLoading}></textarea>
          </div>
        </div>
        <div className='card-footer'>
          <div className='d-flex justify-content-between'>
            <button className='btn btn-danger' onClick={onCancel}>
              Cancel
            </button>
            <button type='submit' className='btn btn-success'>
              Confirm
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUpdateTeam;
