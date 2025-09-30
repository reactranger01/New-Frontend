import GradientHeading from '@/components/GradientHeading';
import Pagination from '@/containers/Pagination';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyBets() {
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const [page, setPage] = useState(1);
  const take = 2;

  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 2);
    return today;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [selectedSport, setSelectedSport] = useState('cricket');
  // eslint-disable-next-line
  const [betsData, setBetsData] = useState({});
  const getAllBets = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData(
          `/bet/get-past-currentbets?status=past&limit=1000&offset=0&startDate=${dayjs(
            startDate,
          )
            .startOf('day')
            .toISOString()}&endDate=${dayjs(endDate)
            .endOf('day')
            .toISOString()}`,
        );
        if (response?.status === 200) {
          setBetsData(response?.data);
          setPage(1);
        }
        return null;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  useEffect(() => {
    getAllBets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const filteredBets =
    betsData?.bets?.filter(
      (bet) => bet?.event_type?.toLowerCase() === selectedSport.toLowerCase(),
    ) || [];

  const filteredTotalCount = filteredBets.length;

  // slice filtered bets for current page
  const pagedBets = filteredBets.slice((page - 1) * take, page * take);
  return (
    <div className="min-h-screen mx-1 md:mx-0">
      <div className="pb-2 md:py-2">
        <GradientHeading heading={'My Bets'} />
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
      <div className="flex gap-[5px] items-center w-full">
        <div className="w-full">
          <p className="text-14">Type</p>
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="px-3 text-14 font-medium py-1 w-full h-10 rounded-[4px] border border-gray-300"
            name="selectedSport"
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
      {/* Div of all bets */}
      <div className="my-4">
        {pagedBets.length > 0 ? (
          pagedBets.map((item, index) => (
            <div
              key={index}
              className="bg-white px-[10px] py-2 rounded-[5px] mb-2 flex justify-between gap-2 shadow-[0_1px_10px_rgba(0,0,0,0.2)]"
            >
              <div className="flex gap-1">
                <div className="font-semibold text-14 leading-4 ">
                  {index + 1 + (page - 1) * take}.
                </div>
                <div className="font-semibold text-14 ">
                  <h1 className="font-semibold text-14 leading-4 ">
                    {item?.event}
                  </h1>
                  <p className="text-12 font-medium">
                    {dayjs(item?.updated_at).format('DD-MM-YY hh:mm:s')}
                  </p>
                </div>
              </div>
              <div className="bg-primary-1300 px-3 text-white font-semibold h-7 flex-center text-10 rounded-sm">
                1
              </div>
            </div>
          ))
        ) : (
          <div className="p-1 mb-5 text-center text-14 bg-[#DAE1DF] border border-[#aaa] cursor-pointer">
            No Event Found
          </div>
        )}
        {filteredTotalCount > 0 && (
          <Pagination
            pageCount={filteredTotalCount}
            setPageNumber={setPage}
            take={take}
          />
        )}
      </div>
    </div>
  );
}

export default MyBets;
