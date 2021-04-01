import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../store/actions/auth';

const DeleteAccountModal = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const { isLoading, error } = useSelector(state => state.auth);

  const deleteAccountHandler = e => {
    e.preventDefault();
    dispatch(deleteAccount(password));
  };

  return (
    <div className='modal' id='deleteAccountModal'>
      <div className='modal-dialog' role='document'>
        <form onSubmit={deleteAccountHandler}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Confirmation</h5>
              <button type='button' className='close' data-dismiss='modal'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>Submit your password to start account deletion</p>
              {error ? (
                <div className='alert alert-danger'>
                  <small>{error}</small>
                </div>
              ) : null}
              <div className='form-group'>
                <label>Password</label>
                <input
                  required
                  name='password'
                  type='password'
                  className='form-control'
                  onChange={e => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button type='submit' className='btn btn-danger'>
                Confirm
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
