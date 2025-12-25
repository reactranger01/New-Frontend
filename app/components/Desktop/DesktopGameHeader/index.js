import React from 'react';
import PropTypes from 'prop-types';
import { getImage } from '@/utils/imagekit';

const DesktopGameHeader = ({ GameName, image, isSmall = false }) => {
  return (
    <div className="flex items-center justify-between bg-white py-[8.5px] pl-[8.5px]">
      <div className="flex items-center gap-2 sm:pl-2">
        {isSmall ? (
          <img
            src={getImage('/images/sidebarIcons/cricketDesk.png')}
            className="w-6 h-6"
            alt=""
          />
        ) : (
          <img src={getImage(image)} className="sm:w-6 sm:h-6 w-5 h-5" alt="" />
        )}

        <p className="text-16 font-bold text-center sm:text-left">
          {GameName}{' '}
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6  sm:min-w-[360px] min-w-[180px]">
        <div className="sm:col-span-2 flex-center text-10 sm:text-14 font-bold">
          1
        </div>
        <div className="sm:col-span-2 flex-center text-10 sm:text-14 font-bold">
          X
        </div>
        <div className="sm:col-span-2 flex-center text-10 sm:text-14 font-bold">
          2
        </div>
      </div>
    </div>
  );
};
DesktopGameHeader.propTypes = {
  GameName: PropTypes.string,
  image: PropTypes.string,
  isSmall: PropTypes.bool,
};

export default DesktopGameHeader;
