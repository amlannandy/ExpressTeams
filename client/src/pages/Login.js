import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../images/logo.png';

const Login = () => {
  return (
    <div className='d-flex justify-content-center my-5'>
      <div className='card'>
        <div className='card-header text-center px-5'>
          <img src={Logo} alt='' />
        </div>
        <div className='card-body'>
          <div className='alert alert-danger'>
            <small>This is a test error message</small>
          </div>
          <form>
            <div className='form-group'>
              <label>Email Address</label>
              <input type='email' className='form-control' />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input type='password' className='form-control' />
            </div>
            <button className='btn btn-success btn-block'>
              <i className='fas fa-user mr-2'></i>
              Log in
            </button>
            <Link to='/register' className='btn btn-primary btn-block'>
              <i class='fas fa-user-plus mr-2'></i>
              Register instead
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
