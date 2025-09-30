import { useFetchMyBetsData } from '@/hooks/useFetchMyBetsData';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const MobOpenBets = ({ eventId, setOpenBetCount }) => {
  const [activeTab, setActiveTab] = useState(1);
  const { betsData, loading } = useFetchMyBetsData({
    take: 100,
    // startDate,
    // endDate,
    eventId,
  });
  const matchOddsData =
    betsData?.bets?.filter(
      (item) => item?.market !== 'bookmaker' || item?.market !== 'session',
    ) || [];
  const bookmakerData =
    betsData?.bets?.filter((item) => item?.market === 'bookmaker') || [];
  const fancyData =
    betsData?.bets?.filter((item) => item?.market === 'session') || [];

  const filteredBets =
    activeTab === 1
      ? matchOddsData
      : activeTab === 2
      ? bookmakerData
      : fancyData;

  useEffect(() => {
    setOpenBetCount(filteredBets?.length || 0);
  }, [betsData, activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="w-full my-4 text-center text-sm text-gray-500 font-poppins">
        Loading bets...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-[5px]">
        <input type="checkbox" />
        <label htmlFor="" className="text-14">
          Average Odds
        </label>
      </div>
      <div className="grid grid-cols-3">
        <div
          onClick={() => setActiveTab(1)}
          className={`text-14 flex-center py-2 ${
            activeTab === 1
              ? 'bg-[#f4d821] shadow-[inset_-2px_-4px_7px_rgba(0,0,0,0.25)]'
              : 'bg-[#1E8067] text-white'
          } `}
        >
          Matched
        </div>
        <div
          onClick={() => setActiveTab(2)}
          className={`text-14 flex-center py-2 ${
            activeTab === 2
              ? 'bg-[#f4d821] shadow-[inset_-2px_-4px_7px_rgba(0,0,0,0.25)]'
              : 'bg-[#1E8067] text-white'
          } `}
        >
          Bookmaker
        </div>
        <div
          onClick={() => setActiveTab(3)}
          className={`text-14 flex-center py-2 ${
            activeTab === 3
              ? 'bg-[#f4d821] shadow-[inset_-2px_-4px_7px_rgba(0,0,0,0.25)]'
              : 'bg-[#1E8067] text-white'
          } `}
        >
          Fancy
        </div>
      </div>
      <div className="px-2">
        <div className="w-full my-2  pb-4 ">
          {/* Header */}
          <div className="grid grid-cols-4 gap-2  font-poppins leading-3 text-14 font-bold text-black py-2  ">
            <span>Date/Time</span>
            <span>Selection</span>
            <span>Odds</span>
            <span>Stake</span>
          </div>

          {/* Bets */}
          {filteredBets?.length > 0 ? (
            filteredBets?.map((item, index) => (
              <div
                key={index}
                className={`${
                  item?.bet_on?.toLowerCase() === 'back'
                    ? 'bg-[#A7D8FD]'
                    : 'bg-[#F9C9D4]'
                } grid grid-cols-4  font-poppins font-medium leading-3 text-12 text-black py-2  border-t  border-white`}
              >
                <span>{dayjs(item?.created_at).format('DD/MM/YY hh:mm')}</span>
                <span>{item?.selection}</span>
                <span>{item?.price}</span>
                <span>{item?.stake}</span>
              </div>
            ))
          ) : (
            <div className="w-full my-4 py-2 text-center text-sm bg-[#DEE2E6] rounded-sm text-[#01af70] font-poppins">
              No bets available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
MobOpenBets.propTypes = {
  eventId: PropTypes.string,
  setOpenBetCount: PropTypes.func,
  openBetCount: PropTypes.any,
};
export default MobOpenBets;
