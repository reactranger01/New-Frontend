{
  /* eslint-disable */
}
import GradientHeading from '@/components/GradientHeading';
import Pagination from '@/containers/Pagination';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { Empty } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

function ProfitAndLoss() {
  const [activeTab, setActiveTab] = useState('Cricket');
  const [profitLoss, setProfitLossData] = useState([]);
  const User = useSelector((state) => state.user);
  const [profitData, setProfitData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const take = 15;
  const [pagination, setPagination] = useState({
    totalCount: 0,
  });
  let totalProfitLoss = 0;
  const tabberMenu = [
    {
      id: 'Cricket',
      title: 'Cricket',
      earning: '0.00',
    },
    {
      id: 'Soccer',
      title: 'Football',
      earning: '0.00',
    },
    {
      id: 'Tennis',
      title: 'Tennis',
      earning: '0.00',
    },
    // {
    //   id: 'casino',
    //   title: 'Casino & Aviator',
    //   earning: '0.00',
    // },
  ];

  useEffect(() => {
    getProfitLoss(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page, take, startDate, endDate, User]);
  const getProfitLoss = async (page) => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const url = `/user/user-profitandloss?limit=${take}&offset=${
          (page - 1) * take
        }&userId=${User?.username}&gameId=${
          activeTab === 'Cricket'
            ? 4
            : activeTab === 'Soccer'
            ? 1
            : activeTab === 'casino'
            ? 3
            : activeTab === 'Tennis'
            ? 2
            : 4
        }`;
        const dateFilter =
          startDate && endDate
            ? `&startDate=${moment(startDate).format(
                'YYYY-MM-DD',
              )}&endDate=${moment(endDate).add(1, 'day').format('YYYY-MM-DD')}`
            : '';

        const response = await getAuthData(url + dateFilter);
        if (response?.status === 200) {
          const formattedData = response.data.data.map((entry) => {
            const profit =
              entry.total_winning_amount - entry.total_lossing_amount;
            const amount = Math.abs(profit);
            const type = profit >= 0 ? 'profit' : 'loss';
            return {
              ...entry,
              type: type,
              amount: amount,
            };
          });
          setProfitLossData(formattedData);
          setPagination({
            totalCount: response.data.totalCount,
          });
        }
        return null;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  const getProfitsData = useCallback(async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const url = `/user/user-allgames-profitandloss?userId=${User?.username}`;
        const dateFilter =
          startDate && endDate
            ? `&startDate=${moment(startDate).format(
                'YYYY-MM-DD',
              )}&endDate=${moment(endDate).add(1, 'day').format('YYYY-MM-DD')}`
            : '';
        const response = await getAuthData(url + dateFilter);
        if (response?.status === 200) {
          const formattedData = response.data.data.map((entry) => {
            const profit =
              entry.total_winning_amount - entry.total_lossing_amount;
            const amount = Math.abs(profit);
            const type = profit >= 0 ? 'profit' : 'loss';
            return {
              ...entry,
              type: type,
              amount: amount,
            };
          });
          setProfitData(formattedData);
        }
        return null;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }, [startDate, endDate, User?.username]);

  useEffect(() => {
    getProfitsData();
  }, [getProfitsData, activeTab]);

  if (profitData) {
    profitData.forEach((item) => {
      const eventType = item.event_type;
      const amount = parseFloat(item.amount);
      const foundEvent = tabberMenu.find((event) => event.id === eventType);
      if (foundEvent) {
        if (item.type === 'profit') {
          foundEvent.earning = (
            parseFloat(foundEvent.earning) + amount
          ).toFixed(2);
        } else if (item.type === 'loss') {
          foundEvent.earning = (
            parseFloat(foundEvent.earning) - amount
          ).toFixed(2);
        }
      }
    });
  }
  tabberMenu.forEach((event) => {
    totalProfitLoss += parseFloat(event.earning);
  });
  return (
    <div className="min-h-screen mx-1 md:mx-0">
      <div className="w-full ">
        <GradientHeading heading={' Betting Profit and Loss'} />
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
      <button className="bg-primary-1300 text-16  h-10 flex-center rounded-[4px] w-full text-white">
        SEARCH
      </button>

      <div className="data-table  ">
        <div className="tab-body max-w-full ">
          <div className="tabber min-h-[350px] flex justify-between bg-white overflow-hidden rounded-lg flex-col md:flex-row">
            <div className="tabber-menu min-w-[147px] md:min-w-[221px]">
              {/* <div className="rounded-tl-lg w-full text-center 2xl:text-16 text-[15px] text-black font-medium 2xl:p-[10px_5px] p-[7px_5px] shadow-[0_0_15px_2px_#00000050]">
                Games
              </div>
              <div className="rounded-md w-[calc(100%-20px)] mx-auto my-3 text-center text-14 text-black font-medium p-[7px_5px] shadow-[0px_4px_8px_1px_#00000025]">
                Total P&L{' '}
                <span
                  className={
                    totalProfitLoss.toFixed(2) > 0
                      ? '!text-green-700'
                      : totalProfitLoss.toFixed(2) < 0
                      ? '!text-red-700'
                      : 'text-black'
                  }
                >
                  {totalProfitLoss.toFixed(2)}
                </span>
              </div> */}

              <div className="grid grid-cols-2 gap-[1px] mt-2 ">
                <div className="text-white font-bold flex-center text-14 bg-[#8f8f8f] py-1 ">
                  EVENT
                </div>
                <div className="text-white font-bold flex-center text-14 bg-[#8f8f8f] py-1 ">
                  P&L
                </div>
              </div>

              <ul className="border border-[#e9e9e9]">
                {tabberMenu.map((item, index) => (
                  <li
                    key={item.id}
                    className={`text-14 font-medium grid grid-cols-2 gap-[1px] ${
                      index % 2 !== 0 ? 'bg-white' : 'bg-[#f1f0f0]'
                    }    cursor-pointer`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <div className="flex-center py-1 border-r-[2px] border-[#e9e9e9]">
                      <div className="bg-primary-1300  text-14 max-w-[90px] mx-auto m-1  h-9 flex-center  w-full text-white rounded-md">
                        <p className="text-center w-full">{item.title}</p>
                      </div>
                    </div>
                    <div
                      className={`${
                        item.earning > 0
                          ? '!text-green-700'
                          : item.earning < 0
                          ? '!text-red-700'
                          : 'text-black'
                      } flex-center `}
                    >
                      {item.earning}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className=" md:w-[calc(100%-235px)]  overflow-x-auto ">
              {(activeTab == 'Cricket' ||
                activeTab == 'Soccer' ||
                activeTab == 'Tennis') && (
                <>
                  <table className=" ">
                    <thead>
                      <tr className="bg-[#DDDDDD] text-14">
                        <th className="w-[100px] 2xl:w-[120px]">Game</th>
                        <th className="w-[100px] 2xl:w-[120px]">Market</th>
                        <th className="w-[100px] 2xl:w-[120px]">Event</th>
                        <th className="w-[100px] 2xl:w-[120px]">Settle Time</th>
                        <th className="w-[100px] 2xl:w-[120px]">Commission</th>
                        <th className="w-[100px] 2xl:w-[120px]">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profitLoss?.length === 0 ? (
                        <tr>
                          <td colSpan={6}>
                            <p className="text-center py-5 text-14">
                              {' '}
                              <Empty />
                            </p>
                          </td>
                        </tr>
                      ) : (
                        <>
                          {profitLoss &&
                            profitLoss.map((items, index) => {
                              return (
                                <tr key={index}>
                                  <td className="w-[100px] 2xl:w-[120px]">
                                    {items?.event_type}
                                  </td>
                                  <td className="w-[100px] 2xl:w-[120px]">
                                    {items?.market}
                                  </td>
                                  <td className="w-[100px] 2xl:w-[120px]">
                                    {items?.event}
                                  </td>
                                  <td className="w-[100px] 2xl:w-[120px]">
                                    {' '}
                                    {moment(items?.settlement_time).format(
                                      'L, LT',
                                    )}
                                  </td>
                                  <td
                                    className={`w-[100px] ${
                                      items?.market == 'Match Odds' &&
                                      items.type === 'profit'
                                        ? '!text-red-700'
                                        : ''
                                    } 2xl:w-[120px]`}
                                  >
                                    {items?.market == 'Match Odds' &&
                                    items.type === 'profit'
                                      ? (items?.amount * User?.commission) / 100
                                      : '0'}
                                  </td>
                                  <td
                                    className={`w-[100px] 2xl:w-[120px]
                                    ${
                                      items.type === 'profit'
                                        ? '!text-green-700'
                                        : '!text-red-700'
                                    }
                                  `}
                                  >
                                    {items?.amount}
                                  </td>
                                </tr>
                              );
                            })}
                        </>
                      )}
                    </tbody>
                  </table>
                  <Pagination
                    pageCount={pagination.totalCount}
                    setPageNumber={setPage}
                    take={take}
                  />
                </>
              )}

              {activeTab == 'casino' && (
                <>
                  <table>
                    <thead>
                      <tr className="bg-[#DDDDDD] text-14">
                        <th className="w-[100px] 2xl:w-[120px]">Game</th>
                        <th className="w-[100px] 2xl:w-[120px]">Event Type </th>
                        <th className="w-[100px] 2xl:w-[120px]">Event</th>
                        <th className="w-[100px] 2xl:w-[120px]">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profitLoss?.length === 0 ? (
                        <tr>
                          <td colSpan={4}>
                            <p className="text-center py-5 text-14">
                              {' '}
                              <Empty />
                            </p>
                          </td>
                        </tr>
                      ) : (
                        <>
                          {profitLoss &&
                            profitLoss.map((items, index) => {
                              return (
                                <tr key={index}>
                                  <td className="w-[100px] 2xl:w-[120px]">
                                    {items?.game_code}
                                  </td>
                                  <td className="w-[100px] 2xl:w-[120px]">
                                    {items?.event_type}
                                  </td>
                                  <td className="w-[100px] 2xl:w-[120px]">
                                    {items?.event}
                                  </td>
                                  <td
                                    className={`w-[100px] 2xl:w-[120px]
                                    ${
                                      items.type === 'profit'
                                        ? '!text-green-700'
                                        : '!text-red-700'
                                    }
                                  `}
                                  >
                                    {numberWithCommas(items?.amount) || 0}
                                  </td>
                                </tr>
                              );
                            })}
                        </>
                      )}
                    </tbody>
                  </table>
                  <Pagination
                    pageCount={pagination.totalCount}
                    setPageNumber={setPage}
                    take={take}
                  />
                </>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfitAndLoss;
