import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';

import history from '../utils/history';
import TeamInfo from '../components/TeamInfo';
import { getTeam } from '../store/actions/teams';
import EmptyBanner from '../components/EmptyBanner';
import TeamMessages from '../components/TeamMessages';
import LoadingIndicator from '../components/LoadingIndicator';

const TeamDetails = () => {
  const dispatch = useDispatch();
  const { teamId } = useParams();
  const { team, isLoading, error } = useSelector(state => state.teams);

  useEffect(() => {
    dispatch(getTeam(teamId));
  }, [dispatch, teamId]);

  if (isLoading || !team) {
    return <LoadingIndicator />;
  }

  if (!isLoading && error) {
    return <EmptyBanner text={error} />;
  }

  return (
    <div>
      <nav className='navbar navbar-dark bg-dark'>
        <div className='container'>
          <div className='navbar-brand'>
            <p className='lead font-weight-bold py-0 my-0'>
              <i
                className='fa fa-arrow-left text-secondary mr-3'
                style={{ cursor: 'pointer' }}
                onClick={() => history.goBack()}>
                {' '}
              </i>
              {'  ' + team.name}
            </p>
          </div>
          <i
            className='fa fa-cog text-secondary mr-3'
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(`/team-details/${team._id}/info`)}>
            {' '}
          </i>
        </div>
      </nav>
      <div className='container'>
        <Switch>
          <Route path='/team-details/:teamId/info' component={TeamInfo} />
          <Route component={TeamMessages} />
        </Switch>
      </div>
    </div>
  );
};

export default TeamDetails;
