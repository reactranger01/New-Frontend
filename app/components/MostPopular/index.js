import { reactIcons } from '@/utils/icons';
import PropTypes from 'prop-types';
import React from 'react';

const MostPopular = ({ text }) => {
  return (
    <div className="bg-[#FF4500] py-2 px-[10px] flex items-center rounded-[3px] my-[15px] text-white gap-1 text-18 font-bold">
      <span className=""> {reactIcons.play}</span> {text}
    </div>
  );
};
MostPopular.propTypes = {
  text: PropTypes.string,
};
export default MostPopular;
