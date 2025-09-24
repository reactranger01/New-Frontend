import { reactIcons } from '@/utils/icons';
import React, { useState } from 'react';

const InnerHeading = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="grid grid-cols-3 bg-[#1E8067]">
      <div
        onClick={() => setActiveTab(1)}
        className={`${
          activeTab === 1 && 'border-b-[3px] border-[#f4d821]'
        } text-10 md:text-12 font-bold text-white py-[5px] text-center`}
      >
        Market
      </div>
      <div
        onClick={() => setActiveTab(2)}
        className={`${
          activeTab === 2 && 'border-b-[3px] border-[#f4d821]'
        } text-10 md:text-12 font-bold text-white py-[5px] text-center`}
      >
        Open Bets (0)
      </div>
      <div
        onClick={() => setActiveTab(3)}
        className={`${
          activeTab === 3 && 'border-b-[3px] border-[#f4d821]'
        } text-10 md:text-12 font-bold flex-center gap-1 md:gap-2 text-white py-[5px] text-center`}
      >
        LIVE <span className=" text-10 md:text-14">{reactIcons.tv}</span>
      </div>
    </div>
  );
};

export default InnerHeading;
