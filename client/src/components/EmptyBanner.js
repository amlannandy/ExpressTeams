import React from 'react';

const EmptyBanner = ({ text }) => {
  return (
    <div className='p-2 mt-3 text-center text-secondary'>
      <i className='fa fa-question-circle fa-3x mb-1'></i>
      <p className='font-weight-bold'>{text}</p>
    </div>
  );
};

export default EmptyBanner;
