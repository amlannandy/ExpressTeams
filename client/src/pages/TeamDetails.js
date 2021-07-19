import React from 'react';
import history from '../utils/history';

const TeamDetails = () => {
  return (
    <div>
      <h1>Team Details</h1>
      <button onClick={() => history.goBack()}>back</button>
    </div>
  );
};

export default TeamDetails;
