import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import formReducer from '../utils/formReducer';
import { updateInfo } from '../store/actions/auth';

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error, message } = useSelector(state => state.auth);

  const initialFormData = {
    name: user.name,
    email: user.email,
  };
  const [formData, setFormData] = useReducer(formReducer, initialFormData);

  const updateInfoHandler = e => {
    e.preventDefault();
    const { name } = formData;
    dispatch(updateInfo(name));
  };

  return (
    <div>
      <p className='lead font-weight-bold'>
        <i className='fa fa-edit'> </i> Update Info
      </p>
      <hr />
      {error ? (
        <div className='alert alert-danger'>
          <small>{error}</small>
        </div>
      ) : message ? (
        <div className='alert alert-success'>
          <small>{message}</small>
        </div>
      ) : null}
      <form onSubmit={updateInfoHandler}>
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
          <label>Email</label>
          <input
            required
            name='email'
            value={formData.email}
            type='email'
            className='form-control'
            onChange={setFormData}
            disabled={true}
          />
        </div>
        <div className='d-flex justify-content-between py-3'>
          <Link
            to='/'
            type='submit'
            className='btn btn-danger'
            disabled={isLoading}>
            <i className='fas fa-times-circle mr-2'></i>
            Cancel
          </Link>
          <button
            type='submit'
            className='btn btn-success'
            disabled={isLoading}>
            <i className='fas fa-check mr-2'></i>
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccount;
