import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import formReducer from '../utils/formReducer';
import { updatePassword, setAuthError } from '../store/actions/auth';

const initialFormData = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useReducer(formReducer, initialFormData);
  const { isLoading, error, message } = useSelector(state => state.auth);

  const updatePasswordHandler = e => {
    e.preventDefault();
    const { newPassword, confirmNewPassword } = formData;
    if (newPassword !== confirmNewPassword) {
      dispatch(setAuthError("Passwords don't match"));
      return;
    }
    dispatch(updatePassword(formData));
  };

  return (
    <div>
      <p className='lead font-weight-bold'>
        <i className='fa fa-edit'> </i> Update Password
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
      <form onSubmit={updatePasswordHandler}>
        <div className='form-group'>
          <label>Current Password</label>
          <input
            required
            name='currentPassword'
            value={formData.currentPassword}
            type='password'
            className='form-control'
            onChange={setFormData}
            disabled={isLoading}
          />
        </div>
        <div className='form-group'>
          <label>New Password</label>
          <input
            required
            name='newPassword'
            value={formData.newPassword}
            type='password'
            className='form-control'
            onChange={setFormData}
            disabled={isLoading}
          />
        </div>
        <div className='form-group'>
          <label>Confirm New Password</label>
          <input
            required
            name='confirmNewPassword'
            value={formData.confirmNewPassword}
            type='password'
            className='form-control'
            onChange={setFormData}
            disabled={isLoading}
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
