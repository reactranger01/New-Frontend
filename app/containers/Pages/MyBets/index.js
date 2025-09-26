import GradientHeading from '@/components/GradientHeading';
import Pagination from '@/containers/Pagination';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { numberWithDigit } from '@/utils/numberWithDigit';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyBets() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // eslint-disable-next-line
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
  console.log(betsData, 'betsData');
  return (
    <div className="min-h-screen mx-1 md:mx-0">
      <div className=" py-2 mt-3">
        <GradientHeading heading={'Open Bets'} />
      </div>

      <div className="flex gap-[5px] items-center w-full mb-2">
        <div className="w-full">
          <p className="text-14">From Date</p>
          <DatePicker
            className="px-3 text-14 font-medium py-1 w-full h-10 rounded-[4px] border border-gray-300"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            popperPlacement="bottom-start"
          />
        </div>
        <div className="w-full">
          <p className="text-14">To Date</p>
          <DatePicker
            className="px-3 text-14 font-medium py-1 w-full h-10 rounded-[4px] border border-gray-300"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            popperPlacement="bottom-start"
          />
        </div>
      </div>
      <div className="flex gap-[5px] items-center w-full">
        <div className="w-full">
          <p className="text-14">Type</p>
          <select
            className="px-3 text-14 font-medium py-1 w-full h-10 rounded-[4px] border border-gray-300"
            name=""
            id=""
          >
            <option value="cricket">Cricket</option>
            <option value="soccer">Soccer</option>
            <option value="tennis">Tennis</option>
          </select>
        </div>
        <div className="w-full">
          <div className="text-14 h-6"></div>
          <button className="bg-primary-1300 text-16  h-10 flex-center rounded-[4px] w-full text-white">
            APPLY
          </button>
        </div>
      </div>
      <div className="data-table overflow-x-auto mt-3">
        {betType === 'past' && (
          <table>
            <thead className="">
              <tr className="bg-gray-400 text-black capitalize font-bold">
                <th className="w-[65px] ">Sports</th>
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
                    <div className="text-center flex-center h-8 bg-[#DAE1DF] border border-gray-400 text-14">
                      No Event Found
                    </div>
                  </td>
                </tr>
              ) : (
                <>
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
              <tr className="bg-gray-400 text-black capitalize font-bold">
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
              {!betsData ||
              betsData?.bets?.length === 0 ||
              betsData?.bets === null ? (
                <tr className="h-[42px] w-full">
                  <td colSpan={10}>
                    <tr className="h-[42px] w-full">
                      <td colSpan={10}>
                        <div className="text-center flex-center h-8 bg-[#DAE1DF] border border-gray-400 text-14">
                          No Event Found
                        </div>
                      </td>
                    </tr>
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
