import PropTypes from 'prop-types';
import React from 'react';

const GradientHeading = ({ heading }) => {
  return (
    <h1 className="rounded-[4px] text-white  text-[15px] py-[6px] px-[10px] font-bold mt-4 md:mt-0 bg-[linear-gradient(180deg,#1e8067,#1e8067_48.4%,#2f3332)]">
      {heading}
    </h1>
  );
};
GradientHeading.propTypes = {
  heading: PropTypes.string,
};
export default GradientHeading;
