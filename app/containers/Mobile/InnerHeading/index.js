import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { reactIcons } from '@/utils/icons';
import { useLocation } from 'react-router-dom';
import { isLoggedIn } from '@/utils/apiHandlers';
import { openModal } from '@/redux/Slices/modalSlice';
import { useDispatch } from 'react-redux';

const InnerHeading = ({ activeTab = 1, setActiveTab, openBetCount }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [eventId, setEventId] = useState(null);
  const isLogin = isLoggedIn();
  // eslint-disable-next-line no-unused-vars
  const [isLiveTv, setIsLiveTv] = useState(false);
  const [liveActiveTab, setLiveActiveTab] = useState(1);
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
          onClick={() => {
            if (!isLogin) {
              dispatch(openModal('login'));
            } else {
              setActiveTab(3);
            }
          }}
          className={`${
            activeTab === 3 ? 'border-b-[3px] border-[#f4d821]' : ''
          } text-10 md:text-12 font-bold flex items-center justify-center gap-1 md:gap-2 text-white py-[5px] cursor-pointer`}
        >
          LIVE {reactIcons.tv}
        </div>
      </div>

      {/* ✅ Show Live TV iframe only when LIVE tab is active */}
      {activeTab === 3 && isLogin && eventId && (
        <div>
          <div className="grid grid-cols-2">
            {/* Market Tab */}
            <div
              onClick={() => setLiveActiveTab(1)}
              className={`${
                liveActiveTab === 1 ? 'border-b-[3px] border-[#f4d821]' : ''
              } text-10 md:text-12 font-bold text-white py-[5px] text-center cursor-pointer`}
            >
              MATCH STATS
            </div>

            {/* Open Bets Tab */}
            <div
              onClick={() => setLiveActiveTab(2)}
              className={`${
                liveActiveTab === 2 ? 'border-b-[3px] border-[#f4d821]' : ''
              } text-10 md:text-12 font-bold text-white py-[5px] text-center  flex items-center justify-center gap-2 cursor-pointer`}
            >
              WATCH LIVE {reactIcons.tv}
            </div>

            {/* LIVE Tab */}
          </div>
          {liveActiveTab === 1 ? (
            <div className="col-span-3 bg-black">
              <iframe
                src={`https://tv.tresting.com/lnt.php?eventid=${eventId}`}
                allow="autoplay; fullscreen"
                sandbox="allow-scripts allow-same-origin allow-popups"
                title="Live Score"
                className="w-full"
                style={{
                  aspectRatio: '16/9',
                  border: 'none',
                }}
              ></iframe>
            </div>
          ) : (
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
