import { reactIcons } from '@/utils/icons';
import React from 'react';

const MostPopular = () => {
  return (
    <div className="bg-[#FF4500] py-2 px-[10px] flex items-center rounded-[3px] my-[15px] text-white gap-1 text-18 font-bold">
      <span className=""> {reactIcons.play}</span> Most Popular
    </div>
  );
};

export default MostPopular;
