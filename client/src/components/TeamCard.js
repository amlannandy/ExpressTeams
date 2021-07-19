import React from 'react';
import Moment from 'react-moment';

import history from '../utils/history';

const TeamCard = ({ team }) => {
  return (
    <div
      className='alert alert-dark'
      style={{ cursor: 'pointer' }}
      onClick={() => history.push(`/${team._id}`)}>
      <div className='d-flex justify-content-between'>
        <small className='font-weight-bold py-0 my-1'>{team.name}</small>
        <small>
          <Moment format='hh:mm'>{team.updatedAt}</Moment>
        </small>
      </div>
      <small>
        <i className='fa fa-comments'> </i>{' '}
        {team.lastMessage ? team.lastMessage : 'No messages yet...'}
      </small>
    </div>
  );
};

export default TeamCard;
