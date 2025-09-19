import PropTypes from 'prop-types';
import React from 'react';

const BlankBtn = ({ css }) => {
  return <button className={`bet-btn ${css}`}>-</button>;
};
BlankBtn.propTypes = {
  css: PropTypes.string,
};
export default BlankBtn;
