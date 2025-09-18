import { reactIcons } from '@/utils/icons';
import React from 'react';

const SeeMoreMarkets = () => {
  return (
    <button className="font-semibold w-full text-12 text-black bg-[#a7d8fd] h-[40px] flex-center gap-2">
      See more markets{' '}
      <span className="rotate-90 text-2xl">{reactIcons.upArrow}</span>
    </button>
  );
};

export default SeeMoreMarkets;
