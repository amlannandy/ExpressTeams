import React from 'react';
import Moment from 'react-moment';

const TeamCard = ({ team }) => {
  return (
    <div className='card mb-3 p-3'>
      <div className='row'>
        <div className='col-6'>
          <p className='lead mb-0 font-weight-bold'>{team.name}</p>
          <small>{team.description}</small>
          <br />
          <span className='badge badge-info'>
            Created on <Moment format='HH:MM DD/MM/YY'>{team.createdAt}</Moment>
          </span>
        </div>
        <div className='col-6'>
          <div className='row'>
            <div className='col-5 text-center text-white'>
              <div className='bg-dark p-1 rounded-top'>
                <small>Participants</small>
              </div>
              <div className='bg-secondary p-1 rounded-bottom'>
                <h3>23</h3>
              </div>
            </div>
            <div className='col-7'>
              <button className='btn btn-success btn-block'>
                <i className='fas fa-envelope-open mr-2'></i>
                Chat
              </button>
              <button className='btn btn-primary btn-block'>
                <i className='fas fa-wrench mr-2'></i>
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
