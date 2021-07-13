import React, { useReducer } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

import formReducer from '../utils/formReducer';

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

const initialFormData = {
  name: '',
  description: '',
};

const CreateUpdateTeam = ({ isEdit = false, isOpen, onCancel }) => {
  const [formData, setFormData] = useReducer(formReducer, initialFormData);
  const { isLoading, error } = useSelector(state => state.teams);

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className='card'>
        <div className='card-header'>
          <p className='lead font-weight-bold'>Create Team</p>
        </div>
        <form className='card-body'>
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
            <input
              required
              name='description'
              value={formData.description}
              type='text'
              className='form-control'
              onChange={setFormData}
              disabled={isLoading}
            />
          </div>
        </form>
        <div className='card-footer'>
          <div className='d-flex justify-content-between'>
            <button className='btn btn-danger' onClick={onCancel}>
              Cancel
            </button>
            <button className='btn btn-success'>Confirm</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateUpdateTeam;
