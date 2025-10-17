import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { reactIcons } from '@/utils/icons';
import { useLocation } from 'react-router-dom';

const InnerHeading = ({ activeTab = 1, setActiveTab, openBetCount }) => {
  const location = useLocation();
  const [eventId, setEventId] = useState(null);
  const [isLiveTv, setIsLiveTv] = useState(false);

  // ✅ Extract eventId from URL like /cricket/market/34841297
  useEffect(() => {
    const match = location.pathname.match(/\/market\/(\d+)/);
    if (match) {
      setEventId(match[1]);
    }

    // ✅ You can later replace this with real condition for live TV availability
    setIsLiveTv(true);
  }, [location.pathname]);

  return (
    <div className="bg-[#1E8067]">
      {/* Tabs */}
      <div className="grid grid-cols-3">
        {/* Market Tab */}
        <div
          onClick={() => setActiveTab(1)}
          className={`${
            activeTab === 1 ? 'border-b-[3px] border-[#f4d821]' : ''
          } text-10 md:text-12 font-bold text-white py-[5px] text-center cursor-pointer`}
        >
          Market
        </div>

        {/* Open Bets Tab */}
        <div
          onClick={() => setActiveTab(2)}
          className={`${
            activeTab === 2 ? 'border-b-[3px] border-[#f4d821]' : ''
          } text-10 md:text-12 font-bold text-white py-[5px] text-center cursor-pointer`}
        >
          Open Bets ({openBetCount})
        </div>

        {/* LIVE Tab */}
        <div
          onClick={() => setActiveTab(3)}
          className={`${
            activeTab === 3 ? 'border-b-[3px] border-[#f4d821]' : ''
          } text-10 md:text-12 font-bold flex items-center justify-center gap-1 md:gap-2 text-white py-[5px] cursor-pointer`}
        >
          LIVE {reactIcons.tv}
        </div>
      </div>

      {/* ✅ Show Live TV iframe only when LIVE tab is active */}
      {activeTab === 3 &&
        eventId &
        (
          <div className="col-span-3 bg-black">
            <iframe
              src={`https://e765432.diamondcricketid.com/dtv.php?id=${eventId}`}
              allow="autoplay; fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups"
              title="Live TV"
              className="w-full"
              style={{
                aspectRatio: '16/9',
                border: 'none',
              }}
            ></iframe>
          </div>
        )}
    </div>
  );
};

InnerHeading.propTypes = {
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  openBetCount: PropTypes.number,
};

export default InnerHeading;
