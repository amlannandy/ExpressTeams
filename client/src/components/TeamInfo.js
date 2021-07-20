import React from 'react';
import { useSelector } from 'react-redux';

const TeamInfo = () => {
  const { team } = useSelector(state => state.teams);

  return (
    <div>
      <div className='jumbotron py-3'>
        <div className='d-flex justify-content-between'>
          <small className='font-weight-bold'>Description</small>
          <div className='d-flex'>
            <button className='btn btn-light mr-2'>
              <i className='fa fa-pencil-alt'></i>
            </button>
            <button className='btn btn-light'>
              <i className='fa fa-trash'></i>
            </button>
          </div>
        </div>
        <p>{team.description}</p>
      </div>
    </div>
  );
};

export default TeamInfo;
