/* eslint-disable react-hooks/exhaustive-deps */
import Pagination from '@/containers/Pagination';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { Empty } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

function AccountStatement() {
  const [startDate, setStartDate] = useState(new Date());
  const User = useSelector((state) => state.user);
  const { id } = useSelector((state) => state.user || { id: null });
  const [endDate, setEndDate] = useState(new Date());
  const [statementData, setStatementData] = useState([]);
  const [page, setPage] = useState(1);
  const take = 15;
  const [pagination, setPagination] = useState({
    totalCount: 0,
  });

  useEffect(() => {
    if (id !== undefined && startDate && endDate) {
      getTransactionList();
    }
  }, [id, page, take, startDate, endDate]);

  const getTransactionList = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/get-transactions?filterUserId=${id}&limit=${take}&offset=${
            (page - 1) * take
          }&startdate=${moment(startDate).format(
            'YYYY-MM-DD',
          )}&enddate=${moment(endDate).add(1, 'day').format('YYYY-MM-DD')}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setStatementData(response?.data?.statements);
          setPagination({
            totalCount: response?.data.count,
          });
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  return (
    <div className="min-h-screen mx-1 md:mx-0">
      <div className="md:border-b border-black py-2 mt-3">
        <h1 className="text-18 md:text-24 font-bold mt-4 md:mt-0">
          Transfer Statement
        </h1>
      </div>

      <div className="flex items-end gap-8 my-4 md:mb-10 mb-3">
        <div className="flex md:gap-5 gap-2 items-center ">
          <div className="from-date">
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
            className="flex items-center text-white bg-red-600 mt-6 gap-1  cursor-pointer  rounded-md py-1 px-3"
          >
            {reactIcons.close}
          </button>
        </div>
      </div>

      <div>
        <p className="md:text-20 text-16 font-medium">
          Account Balance:{' '}
          {numberWithCommas(User?.balance - Math.abs(User?.exposureAmount)) ||
            0}
        </p>
      </div>
      <div className="data-table overflow-x-auto">
        <table className="overflow-x-auto">
          <thead className="">
            <tr className="bg-gray-400">
              <th>Date & Time</th>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {statementData.length === 0 ? (
              <tr className="h-[42px] w-full">
                <td colSpan={5}>
                  <div className="text-center flex-center h-[140px]">
                    <Empty />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {' '}
                {statementData &&
                  statementData.map((_item, index) => (
                    <tr key={index} className="text-center">
                      <td className="">
                        {moment(_item?.createdAt).format(
                          'MMMM Do YYYY, h:mm:ss a',
                        )}
                      </td>
                      <td className="">{_item?.remark}</td>
                      <td className=" text-green-600">
                        {_item.type == 'CREDIT' ||
                        (_item.type == 'BALANCE' &&
                          !_item.amount?.includes('-'))
                          ? numberWithCommas(_item?.amount)
                          : 0}
                      </td>
                      <td className=" text-red-600 ">
                        {_item.type == 'WITHDRAW' ||
                        (_item.type == 'BALANCE' && _item.amount?.includes('-'))
                          ? numberWithCommas(_item?.amount)
                          : _item.type == 'COMMISSION'
                          ? numberWithCommas(_item?.amount)
                          : 0}
                      </td>
                      <td className="">
                        {_item.type == 'WITHDRAW' || _item.type == 'COMMISSION'
                          ? numberWithCommas(_item?.senderBalance)
                          : numberWithCommas(_item?.receiverBalance)}
                      </td>
                    </tr>
                  ))}{' '}
              </>
            )}
          </tbody>
        </table>
        <Pagination
          pageCount={pagination.totalCount}
          setPageNumber={setPage}
          take={take}
        />
      </div>
    </div>
  );
}

export default AccountStatement;
