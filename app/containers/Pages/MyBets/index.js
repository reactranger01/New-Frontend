import Pagination from '@/containers/Pagination';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import { numberWithDigit } from '@/utils/numberWithDigit';
import { Empty } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyBets() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [betType, setBetType] = useState('current');
  const [betsData, setBetsData] = useState({});
  const [page, setPage] = useState(1);
  const take = 15;
  const [pagination, setPagination] = useState({
    totalCount: 0,
  });
  useEffect(() => {
    getAllBets(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betType, page, take, startDate, endDate]);
  const getAllBets = async (page) => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData(
          `/bet/get-past-currentbets?status=${betType}&limit=${take}&offset=${
            (page - 1) * take
          }&startdate=${moment(startDate).format(
            'YYYY-MM-DD',
          )}&enddate=${moment(endDate).add(1, 'day').format('YYYY-MM-DD')}`,
        );
        if (response?.status === 200) {
          setBetsData(response.data);
          setPagination({
            totalCount: response.data.total_bets,
          });
        }
        return null;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };

  return (
    <div className="min-h-screen mx-1 md:mx-0">
      <div className="md:border-b border-black py-2 mt-3">
        <h1 className="text-18 md:text-24 mt-4 md:mt-0">Open Bets</h1>
      </div>

      <div className="flex justify-between md:gap-8 gap-2 my-4 md:mb-10 mb-3">
        <div className="">
          <button
            onClick={() => setBetType('current')}
            className={`${
              betType == 'current'
                ? 'bg-[#4283ca] text-white'
                : 'bg-white border border-gray-300 text-gray-700'
            } rounded-md  text-12 px-5 w-[100px] mr-1 mb-2 md:mb-0`}
          >
            Current
          </button>
          <button
            onClick={() => setBetType('past')}
            className={`${
              betType == 'past'
                ? 'bg-[#4283ca] text-white'
                : 'bg-white border border-gray-300 text-gray-700'
            } rounded-md text-12 px-5 w-[100px] mr-1`}
          >
            Past
          </button>
        </div>
        <div className="flex md:gap-5 gap-2 items-center ">
          <div>
            <p className="text-12">From</p>
            <DatePicker
              className="px-3 text-12 py-1 w-24 sm:w-48"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              popperPlacement="bottom-start"
            />
          </div>
          <div>
            <p className="text-12">To</p>
            <DatePicker
              className="px-3 text-12 py-1 w-24 sm:w-48"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              popperPlacement="bottom-start"
            />
          </div>
          <button
            onClick={() => {
              setStartDate(new Date()), setEndDate(new Date());
            }}
            className="flex items-center text-white bg-red-600 mt-6 gap-1  cursor-pointer ml-2 rounded-md py-1 px-3"
          >
            {reactIcons.close}

            {/* <h5 className="ml-2 ">Clear</h5> */}
          </button>
        </div>
      </div>
      <div className="data-table overflow-x-auto">
        {betType === 'past' && (
          <table>
            <thead className="">
              <tr className="bg-gray-400">
                <th className="w-[65px]">Sports</th>
                <th>Event</th>
                <th>Market</th>
                <th>Type</th>
                <th>Selection</th>
                <th>User Rate</th>
                <th>Amount</th>
                <th>Settled</th>
                <th>Profit/Loss </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {betsData?.bets?.length === 0 || betsData?.bets === null ? (
                <tr className="h-[42px] w-full">
                  <td colSpan={10}>
                    <div className="text-center flex-center h-[140px]">
                      <Empty />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {' '}
                  {betsData &&
                    betsData?.bets?.map((items, index) => {
                      return (
                        // bg-[#24A3FF]
                        <tr key={index}>
                          <td
                            className={`w-[65px]  truncate relative after:absolute after:top-1/2 after:-translate-y-1/2 after:left-0 after:w-1 2xl:after:w-[6px] after:h-[35px] 2xl:after:h-[45px] ${
                              items?.bet_on === 'BACK'
                                ? 'after:bg-[#24A3FF]'
                                : 'after:bg-[#FF81B0]'
                            } `}
                          >
                            {items?.event_type}
                          </td>
                          <td>{items?.event}</td>
                          <td>{items?.market}</td>

                          <td>
                            <span
                              className={`text-white px-3 py-1 w-14 inline-block ${
                                items?.bet_on === 'BACK'
                                  ? 'bg-[#24A3FF]'
                                  : 'bg-[#FF81B0]'
                              }`}
                            >
                              {items?.bet_on === 'BACK' ? 'Back' : 'Lay'}
                            </span>
                          </td>
                          <td>{items?.selection}</td>
                          <td className=" text-center"> {items?.price}</td>
                          <td>{items?.stake}</td>
                          <td>{moment(items?.updated_at).format('L, LT')}</td>
                          {items?.bet_on === 'BACK' ? (
                            <td className=" text-center">
                              <span
                                className={
                                  items?.status === 1
                                    ? '!bg-green-700 !text-white px-3 py-1 inline-block'
                                    : items?.status === 10
                                    ? '!bg-red-700 !text-white px-3 py-1 inline-block'
                                    : ''
                                }
                              >
                                {items?.status === 1
                                  ? items.game_type === 'session'
                                    ? numberWithDigit(
                                        (items?.percent / 100) * items?.stake,
                                      ) || 0
                                    : numberWithDigit(
                                        (items?.price - 1) * items?.stake,
                                      ) || 0
                                  : items?.status === 10
                                  ? items.stake
                                  : '-'}{' '}
                              </span>
                            </td>
                          ) : (
                            <td className=" text-center">
                              <span
                                className={
                                  items?.status === 1
                                    ? '!bg-green-700 !text-white px-3 py-1 inline-block'
                                    : items?.status === 10
                                    ? '!bg-red-700 !text-white px-3 py-1 inline-block'
                                    : ''
                                }
                              >
                                {items?.status === 1
                                  ? items.stake
                                  : items?.status === 10
                                  ? items.game_type === 'session'
                                    ? numberWithDigit(
                                        (items?.percent / 100) * items?.stake,
                                      ) || 0
                                    : numberWithDigit(
                                        (items?.price - 1) * items?.stake,
                                      ) || 0
                                  : '-'}
                              </span>
                            </td>
                          )}

                          <td className=" text-center">
                            <span
                              className={
                                items?.status === 1
                                  ? '!bg-green-700 !text-white px-3 py-1 inline-block'
                                  : items?.status === 10
                                  ? '!bg-red-700 !text-white px-3 py-1 inline-block'
                                  : '!bg-gray-700 !text-white px-3 py-1 inline-block'
                              }
                            >
                              {items?.status === 1
                                ? 'WON'
                                : items?.status === 10
                                ? 'LOST'
                                : items.status === -2
                                ? 'Removed'
                                : items.status === 0
                                ? 'Unsettle'
                                : '-'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </>
              )}
            </tbody>
          </table>
        )}
        {betType === 'current' && (
          <table>
            <thead className="">
              <tr className="bg-gray-400">
                <th className="w-[65px]">Sports</th>
                <th>Event</th>
                <th>Market</th>
                <th>Type</th>
                <th>Selection</th>
                <th>User Rate</th>
                <th>Amount</th>
                <th>Placed</th>
                <th>Liability</th>
                <th>Potential Profit</th>
              </tr>
            </thead>
            <tbody>
              {betsData?.bets?.length === 0 || betsData?.bets === null ? (
                <tr className="h-[42px] w-full">
                  <td colSpan={10}>
                    <div className="text-center flex-center h-[140px]">
                      <Empty />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {' '}
                  {betsData &&
                    betsData?.bets?.map((items, index) => {
                      return (
                        // bg-[#24A3FF]
                        <tr key={index}>
                          <td
                            className={`w-[65px] 2xl:w-20 truncate relative after:absolute after:top-1/2 after:-translate-y-1/2 after:left-0 after:w-1 2xl:after:w-[6px] after:h-[35px] 2xl:after:h-[45px] ${
                              items?.bet_on === 'BACK'
                                ? 'after:bg-[#24A3FF]'
                                : 'after:bg-[#FF81B0]'
                            } `}
                          >
                            {items?.event_type}
                          </td>
                          <td>{items?.event}</td>
                          <td>{items?.market}</td>

                          <td>
                            <span
                              className={`text-white px-3 py-1 w-14 inline-block ${
                                items?.bet_on === 'BACK'
                                  ? 'bg-[#24A3FF]'
                                  : 'bg-[#FF81B0]'
                              }`}
                            >
                              {items?.bet_on === 'BACK' ? 'Back' : 'Lay'}
                            </span>
                          </td>
                          <td>{items?.selection}</td>
                          <td className=" text-center"> {items?.price}</td>
                          <td>{items?.stake}</td>
                          <td>{moment(items?.created_at).format('L, LT')}</td>
                          <td>
                            <span
                              className={`text-semibold ${'!bg-red-700 text-white px-3 py-1'}`}
                            >
                              {items?.bet_on === 'BACK'
                                ? items?.stake
                                : items.game_type === 'session'
                                ? numberWithDigit(
                                    (items?.percent / 100) * items?.stake,
                                  ) || 0
                                : numberWithDigit(
                                    (items?.price - 1) * items?.stake,
                                  ) || 0}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`text-semibold ${'!bg-green-700 text-white px-3 py-1'}`}
                            >
                              {items?.bet_on === 'LAY'
                                ? items?.stake
                                : items.game_type === 'session'
                                ? numberWithDigit(
                                    (items?.percent / 100) * items?.stake,
                                  ) || 0
                                : numberWithDigit(
                                    (items?.price - 1) * items?.stake,
                                  ) || 0}
                            </span>
                          </td>
                        </tr>
                      );
                    })}{' '}
                </>
              )}
            </tbody>
          </table>
        )}
        <Pagination
          pageCount={pagination.totalCount}
          setPageNumber={setPage}
          take={take}
        />
        {/* Optionally, you can add functionality to modify or add data here */}
      </div>
    </div>
  );
}

export default MyBets;
