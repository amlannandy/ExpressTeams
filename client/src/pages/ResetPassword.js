import React, { useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import formReducer from '../utils/formReducer';
import { resetPassword, setAuthError } from '../store/actions/auth';

const initialFormData = {
  password: '',
  confirmPassword: '',
};

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useReducer(formReducer, initialFormData);
  const { isLoading, error, message } = useSelector(state => state.auth);

  const resetPasswordHandler = e => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      dispatch(setAuthError("Passwords don't match"));
      return;
    }
    dispatch(resetPassword(token, password));
  };

  return (
    <div className='d-flex justify-content-center my-5'>
      <div className='card'>
        <div className='card-header'>
          <p className='lead font-weight-bold text-center my-0'>
            <i className='fa fa-user'> </i> Reset Password
          </p>
        </div>
        <form className='card-body' onSubmit={resetPasswordHandler}>
          <p className='text-secondary text-center'>
            Please enter your new password to gain access of your account. This
            link will expire in 24 hours
          </p>
          {error ? (
            <div className='alert alert-danger'>
              <small>{error}</small>
            </div>
          ) : message ? (
            <div className='alert alert-success'>
              <small>{message}</small>
            </div>
          ) : null}
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
            <button
              type='submit'
              className='btn btn-success btn-block mt-4'
              disabled={isLoading}>
              <i className='fas fa-check mr-2'></i>
              Confirm
            </button>
            <Link to='/login' className='btn btn-primary btn-block'>
              <i className='fas fa-home mr-2'></i>
              Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
