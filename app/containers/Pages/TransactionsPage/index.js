import NoDataFound from '@/components/NoDataFound';
import dayjs from 'dayjs';
import React, { useState } from 'react';

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

  return (
    <div className="py-2">
      <div className="w-full">
        <select
          className="px-3 text-14 font-medium py-1 w-full h-10 rounded-[4px] border border-gray-300"
          name=""
          id=""
        >
          <option value="">All</option>
          <option value="pending">Pending/Processing</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <ul className="bg-white p-2 rounded-md mt-2 grid grid-cols-3 ">
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
      <div className="my-2">
        {Array(2)
          .fill()
          .map((item, index) => (
            <div
              key={index}
              className="bg-white px-[20px] py-[18px] relative rounded-[5px] mb-2 flex justify-between gap-2 shadow-[0_1px_10px_rgba(0,0,0,0.2)]"
            >
              <p className="text-white text-10 leading-none p-[2px] rounded-bl-[5px] bg-[#ffc107] font-bold absolute top-0 right-0">
                Pending
              </p>
              <div className="flex gap-2">
                <div className="w-[42px] h-[42px] flex-center rounded-md overflow-hidden border border-gray-200 bg-[#ffe49687] ">
                  <img
                    src="/images/graph.webp"
                    className="w-[26px] h-[24px]"
                    alt=""
                  />
                </div>
                <div className="font-semibold text-14 ">
                  <h1 className="font-semibold text-14 leading-4 ">
                    Client Deposit Request
                  </h1>
                  <p className="text-12 font-medium">
                    {dayjs().format('DD-MM-YY hh:mm:s')}
                  </p>
                </div>
              </div>
              <div className=" px-3 text-black flex-center text-14 ">100</div>
            </div>
          ))}
      </div>
      <div className="my-2">
        <NoDataFound />
      </div>
    </div>
  );
};

export default TransactionsPage;
