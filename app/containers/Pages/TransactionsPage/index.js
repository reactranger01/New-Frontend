import NoDataFound from '@/components/NoDataFound';
import Pagination from '@/containers/Pagination';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { getQueryString } from '@/utils/formatter';
import { getImage } from '@/utils/imagekit';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const tabList = [
  {
    id: 1,
    title: 'All',
  },
  {
    id: 2,
    title: 'Deposit',
  },
  {
    id: 3,
    title: 'Withdraw',
  },
];
const TransactionsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [filterData, setFilterData] = useState('');
  const [transactionData, setTransactionData] = useState({});
  const [page, setPage] = useState(1);
  const take = 10; // Number of items per page
  const today = new Date();

  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(() => {
    today.setDate(today.getDate() - 2);
    return today;
  });
  // eslint-disable-next-line
  const [endDate, setEndDate] = useState(new Date());

  const getAllTransactions = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const params = getQueryString({
          offset: (page - 1) * take,
          limit: take,
          // startDate: moment(startDate).startOf('day').toISOString(),
          // endDate: moment(endDate).endOf('day').toISOString(),
          status: filterData,
          requestType: activeTab === 'All' ? '' : activeTab.toLowerCase(),
        });

        const response = await getAuthData(
          `/user/get-deposit-withdrawreq?${params}`,
        );
        if (response?.status === 200) {
          setTransactionData({
            bets: response?.data?.data || [],
            totalCount: response?.data?.totalCount || 0,
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getAllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData, activeTab, page, startDate, endDate]);

  return (
    <div className="py-2">
      <div className="w-full">
        <select
          className="px-3 text-14 font-medium py-1 w-full h-10 rounded-[4px] border border-gray-300"
          name=""
          onChange={(e) => setFilterData(e.target.value)}
          id=""
        >
          <option value="">All</option>
          <option value="pending">Pending/Processing</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <ul className="bg-white mb-2 p-2 rounded-md mt-2 grid grid-cols-3 ">
        {tabList.map((item) => (
          <li
            key={item.id}
            className={`xl:text-16 text-center text-14  py-1 rounded-md cursor-pointer duration-300 transition-all ${
              item.title == activeTab
                ? 'bg-primary-1300 text-white'
                : ' text-black'
            }`}
            onClick={() => setActiveTab(item.title)}
          >
            {item.title}
          </li>
        ))}
      </ul>
      {transactionData && transactionData?.bets?.length > 0 ? (
        transactionData?.bets?.map((item, index) => (
          <div
            key={index}
            className="bg-white px-[20px] py-[18px] relative rounded-[5px] mb-2 flex justify-between gap-2 shadow-[0_1px_10px_rgba(0,0,0,0.2)]"
          >
            <p
              className={`text-white text-10 leading-none p-[2px] rounded-bl-[5px] ${
                item?.status?.toLowerCase() === 'pending'
                  ? 'bg-[#ffc107]'
                  : item?.status?.toLowerCase() === 'rejected'
                  ? 'bg-red-600'
                  : item?.status?.toLowerCase() === 'approved'
                  ? 'bg-green-600'
                  : ''
              }  font-bold absolute top-0 right-0`}
            >
              {item?.status}
            </p>
            <div className="flex gap-2">
              <div className="w-[42px] h-[42px] flex-center rounded-md overflow-hidden border border-gray-200 bg-[#ffe49687] ">
                <img
                  src={getImage('/images/graph.webp')}
                  className="w-[26px] h-[24px]"
                  alt=""
                />
              </div>
              <div className="font-semibold text-14 ">
                <h1 className="font-semibold text-14 leading-4 ">
                  Client <span className="capitalize">{item?.requestType}</span>{' '}
                  Request
                </h1>
                <p className="text-12 font-medium">
                  {dayjs(item?.updatedAt).format('DD-MM-YY hh:mm:s')}
                </p>
              </div>
            </div>
            <div className=" px-3 text-black flex-center text-14 ">
              {item?.amount}
            </div>
          </div>
        ))
      ) : (
        <div className="my-2">
          <NoDataFound />
        </div>
      )}

      {transactionData?.bets?.length > 0 && (
        <Pagination
          pageCount={transactionData.totalCount}
          setPageNumber={setPage}
          take={take}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
