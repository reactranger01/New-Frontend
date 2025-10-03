import { useFetchMyBetsData } from '@/hooks/useFetchMyBetsData';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const AllGroupedBets = ({
  eventId,
  setOpenBetCount,
  fromDate,
  toDate,
  type,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const { betsData, loading } = useFetchMyBetsData({
    take: 100,
    // startDate,
    // endDate,
    eventId,
    fromDate,
    toDate,
    type: type,
  });
  const matchOddsData =
    betsData?.bets?.filter(
      (item) => item?.market !== 'bookmaker' && item?.market !== 'session',
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
    setOpenBetCount && setOpenBetCount(betsData?.bets?.length || 0);
  }, [betsData]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="w-full my-2 pb-4 overflow-x-auto">
          <table className="w-full min-w-[700px] table-auto font-poppins text-14">
            {/* Header */}
            <thead>
              <tr className="text-left font-bold text-black leading-3">
                <th className="py-2">Date/Time</th>
                <th className="py-2">Selection</th>
                <th className="py-2">Odds</th>
                <th className="py-2">Stake</th>
                <th className="py-2">Rate</th>
                <th className="py-2">Profit</th>
                <th className="py-2">Liability</th>
              </tr>
            </thead>

            {/* Bets */}
            <tbody>
              {filteredBets?.length > 0 ? (
                filteredBets.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      item?.bet_on?.toLowerCase() === 'back'
                        ? 'bg-[#A7D8FD]'
                        : 'bg-[#F9C9D4]'
                    } text-12 text-black font-medium leading-3 border-t border-white`}
                  >
                    <td className="py-2 whitespace-nowrap">
                      {dayjs(item?.created_at).format('DD/MM/YY hh:mm')}
                    </td>
                    <td className="py-2 whitespace-nowrap">
                      {item?.selection}
                    </td>
                    <td className="py-2 whitespace-nowrap">{item?.price}</td>
                    <td className="py-2 whitespace-nowrap">{item?.stake}</td>
                    <td className="py-2 whitespace-nowrap">-</td>
                    <td className="py-2 whitespace-nowrap">-</td>
                    <td className="py-2 whitespace-nowrap">-</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-sm py-2 my-4 bg-[#DEE2E6] rounded-sm text-[#01af70] font-poppins"
                  >
                    No bets available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
AllGroupedBets.propTypes = {
  eventId: PropTypes.string,
  setOpenBetCount: PropTypes.func,
  openBetCount: PropTypes.any,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  type: PropTypes.string,
};
export default AllGroupedBets;
