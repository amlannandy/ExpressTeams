import React from 'react';

import VerifyImage from '../images/verify.png';

const VerifyAccount = () => {
  return (
    <div className='d-flex justify-content-center mt-4 text-center'>
      <div className='p-4'>
        <img src={VerifyImage} alt='verify account' height='200px' />
        <p className='lead font-weight-bold text-primary'>Account Unverified</p>
        <p className='my-0'>Please verify your account first</p>
        <p>An email for the same has been sent to you</p>
      </div>
    </div>
  );
};

export default VerifyAccount;
