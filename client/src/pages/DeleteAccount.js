import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import formReducer from '../utils/formReducer';
import { deleteAccount, setAuthError } from '../store/actions/auth';

const initialFormData = {
  password: '',
  confirmPassword: '',
};

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useReducer(formReducer, initialFormData);
  const { isLoading, error } = useSelector(state => state.auth);

  const deleteAccountHandler = e => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      dispatch(setAuthError("Passwords don't match"));
      return;
    }
    dispatch(deleteAccount(password));
  };

  return (
    <div>
      <p className='lead font-weight-bold'>
        <i className='fa fa-user-times'> </i> Delete Account
      </p>
      <hr />
      {error ? (
        <div className='alert alert-danger'>
          <small>{error}</small>
        </div>
      ) : null}
      <form onSubmit={deleteAccountHandler}>
        <div className='form-group'>
          <label>Password</label>
          <input
            required
            name='password'
            value={formData.password}
            type='password'
            className='form-control'
            onChange={setFormData}
            disabled={isLoading}
          />
        </div>
        <div className='form-group'>
          <label>Confirm Password</label>
          <input
            required
            name='confirmPassword'
            value={formData.confirmPassword}
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
