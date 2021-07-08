import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordResetMail, setAuthError } from '../store/actions/auth';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { isLoading, error, message } = useSelector(state => state.auth);

  const forgotPasswordHandler = () => {
    if (!email) {
      dispatch(setAuthError('Please provide an email'));
      return;
    }
    dispatch(sendPasswordResetMail(email));
  };

  return (
    <div className='d-flex justify-content-center my-5'>
      <div className='card'>
        <div className='card-header'>
          <p className='lead font-weight-bold text-center my-0'>
            <i className='fa fa-lock'> </i> Forgot Password
          </p>
        </div>
        <div className='card-body'>
          <p className='text-secondary text-center'>
            Please enter your associated email address where you'll get a link
            to reset your password
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
            <label>Email Address</label>
            <input
              value={email}
              type='email'
              className='form-control'
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            className='btn btn-success btn-block'
            onClick={forgotPasswordHandler}
            disabled={isLoading}>
            <i className='fas fa-check mr-2'></i>
            Confirm
          </button>
          <Link to='/login' className='btn btn-primary btn-block'>
            <i className='fas fa-home mr-2'></i>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
