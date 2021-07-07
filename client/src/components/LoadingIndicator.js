import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className='d-flex justify-content-center mt-5'>
      <div className='lds-facebook'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
