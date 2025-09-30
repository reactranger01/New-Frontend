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
            <div className="tabber-menu w-full min-w-[147px] md:min-w-[221px]">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfitAndLoss;
