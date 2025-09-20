import React from 'react';
import PropTypes from 'prop-types';

const DesktopGameHeader = ({ GameName, image }) => {
  return (
    <div className="flex items-center justify-center sm:justify-between bg-white py-[8.5px] pl-[8.5px]">
      <div className="flex items-center gap-2 pl-2">
        <img src={image} className="w-6 h-6" alt="" />
        <p className="text-16 font-bold text-center sm:text-left">
          {GameName}{' '}
        </p>
      </div>
      <div className="sm:grid grid-cols-6 hidden sm:min-w-[360px] min-w-[300px]">
        <div className="col-span-2 flex-center text-14 font-bold">1</div>
        <div className="col-span-2 flex-center text-14 font-bold">X</div>
        <div className="col-span-2 flex-center text-14 font-bold">2</div>
      </div>
    </div>
  );
};
DesktopGameHeader.propTypes = {
  GameName: PropTypes.string,
  image: PropTypes.string,
};

export default DesktopGameHeader;
