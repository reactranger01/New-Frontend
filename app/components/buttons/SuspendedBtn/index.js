import React from 'react';
import { PropTypes } from 'prop-types';

const SuspendedBtn = ({ status }) => {
  return (
    <button className="uppercase font-semibold w-full text-12 text-[#1e3f5a] bg-[#1e3f5a1a] h-[40px]">
      {status}
    </button>
  );
};
SuspendedBtn.propTypes = {
  status: PropTypes.string,
};

export default SuspendedBtn;
