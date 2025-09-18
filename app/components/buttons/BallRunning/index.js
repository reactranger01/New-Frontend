import React from 'react';
import { PropTypes } from 'prop-types';

const BallRunning = ({ status }) => {
  return (
    <button className="ball-running-overlay">
      {status ? status : 'BALL RUNNING'}
    </button>
  );
};
BallRunning.propTypes = {
  status: PropTypes.string,
};

export default BallRunning;
