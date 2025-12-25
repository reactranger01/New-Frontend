/* eslint-disable react-hooks/exhaustive-deps */
import GradientHeading from '@/components/GradientHeading';
import Pagination from '@/containers/Pagination';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { getQueryString } from '@/utils/formatter';
import { reactIcons } from '@/utils/icons';
import { getImage } from '@/utils/imagekit';
import { numberWithCommas } from '@/utils/numberWithCommas';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

function AccountStatement() {
  const startDatePickerRef = useRef(null);
  const [sportFilter, setSportFilter] = useState('');
  const endDatePickerRef = useRef(null);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 2);
    return today;
  });
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
  }, [id, page, take, startDate, endDate, sportFilter]);

  console.log(sportFilter, 'sportFilter');
  const getTransactionList = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const params = getQueryString({
          // filterUserId: id,
          offset: (page - 1) * take,
          limit: take,
          startDate: moment(startDate).startOf('day').toISOString(),
          endDate: moment(endDate).endOf('day').toISOString(),
          sportid:
            sportFilter === 'cricket'
              ? 4
              : sportFilter === 'soccer'
              ? 1
              : sportFilter === 'tennis'
              ? 2
              : '',
          filterTransaction:
            sportFilter === 'settling'
              ? 'settling'
              : ['cricket', 'soccer', 'tennis'].includes(sportFilter)
              ? 'betting'
              : '',
        });
        const response = await getAuthData(
          `/user/get-all-transactions?${params}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setStatementData(response?.data?.data?.statements);
          setPagination({
            totalCount: response?.data?.data?.count,
          });
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  return (
    <div className="min-h-screen mx-1 md:mx-0 w-full">
      <div className=" pb-2 md:py-2">
        <h1 className="text-18 md:text-24 font-bold mt-4 md:mt-0">
          <GradientHeading heading={'Account Statement'} />
        </h1>
      </div>

      <div className="flex gap-[5px] items-center w-full mb-2">
        <div className="w-full">
          <p className="text-14">From Date</p>
          <div className="relative">
            <DatePicker
              ref={startDatePickerRef}
              className="px-3 text-14 font-medium py-1 w-full h-10 rounded-[4px] border border-gray-300"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              popperPlacement="bottom-start"
              dateFormat="dd-MM-yyyy"
            />
            <span
              onClick={() => startDatePickerRef.current.setFocus()}
              className="ay-center z-0 right-2 cursor-pointer"
            >
              {reactIcons.calendar}
            </span>
          </div>
        </div>
        <div className="w-full">
          <p className="text-14">To Date</p>
          <div className="relative">
            <DatePicker
              ref={endDatePickerRef}
              className="px-3 text-14 font-medium py-1 w-full h-10 rounded-[4px] border border-gray-300"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              popperPlacement="bottom-start"
              dateFormat="dd-MM-yyyy"
            />
            <span
              onClick={() => endDatePickerRef.current.setFocus()}
              className="ay-center z-0 right-2 cursor-pointer"
            >
              {reactIcons.calendar}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-[5px] items-center w-full mb-3">
        <div className="w-full">
          <p className="text-14">Type</p>
          <select
            className="px-3 text-14 font-medium py-1 w-full h-10 rounded-[4px] border border-gray-300"
            name=""
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            id=""
          >
            <option value="">All</option>
            <option value="settling">Deposit/Withdrawal</option>
            <option value="cricket">Cricket</option>
            <option value="soccer">Soccer</option>
            <option value="tennis">Tennis</option>
          </select>
        </div>
        <div className="w-full">
          <div className="text-14 h-6"></div>
          <div className="flex items-center gap-2">
            <button className="bg-primary-1300 text-16  h-10 flex-center rounded-[4px] w-full text-white">
              APPLY
            </button>
            <div className="bg-primary-1300 flex-center gap-[5px] h-[38px] w-[43px] rounded-[4px] ">
              <img
                src={getImage('/images/rightDrawer/downloadNew.svg')}
                className="h-5 w-5"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="data-table overflow-x-auto">
        <table className="overflow-x-auto border-collapse whitespace-nowrap">
          <thead className="">
            <tr className="bg-[#8F8F8F] text-white text-14 font-bold">
              <th>#</th>
              <th>Date</th>
              <th>DESCRIPTION</th>
              <th>CREDIT</th>
              <th>DEBIT</th>
              <th>BALANCE</th>
              <th>REMARK</th>
            </tr>
          </thead>
          <tbody>
            {statementData && statementData?.length === 0 ? (
              <tr className=" w-full">
                <td colSpan={7} className="!p-0">
                  <div className="p-1 text-center text-14 bg-[#DAE1DF] border border-[#aaa] cursor-pointer">
                    No Event Found
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {statementData?.map((_item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-[#E9E9E9]' : 'bg-[#F5F5F5]'
                    } text-center`}
                  >
                    <td className="">{index + 1}</td>
                    <td className=" whitespace-nowrap">
                      {moment(_item?.updatedAt).format('DD/MM/YYYY, hh:mm')}
                    </td>
                    <td className=" whitespace-nowrap">{_item?.remark}</td>
                    <td className=" text-green-600">
                      {_item.type == 'CREDIT' ||
                      (_item.type == 'BALANCE' && !_item.amount?.includes('-'))
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
                    <td className="">-</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {statementData?.length > 0 && (
        <Pagination
          pageCount={pagination.totalCount}
          setPageNumber={setPage}
          take={take}
        />
      )}
    </div>
  );
}

export default AccountStatement;
