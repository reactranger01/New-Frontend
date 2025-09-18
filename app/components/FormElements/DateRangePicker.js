import { reactIcons } from '@/utils/icons';
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [triggerStart, setTriggerStart] = useState(true);
  const [triggerEnd, setTriggerEnd] = useState(true);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  const handleStartDateCal = () => {
    if (triggerStart) startDatePickerRef.current.setFocus(triggerStart);
    setTriggerStart(!triggerStart);
  };
  const handleEndDateCal = () => {
    if (triggerEnd) endDatePickerRef.current.setFocus(triggerEnd);
    setTriggerEnd(!triggerEnd);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="grid place-content-center text-black">
        {reactIcons.calender}
      </div>
      <div className="relative flex-1 3xl:w-[175px] w-[150px]">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="02/02/2024"
          ref={startDatePickerRef}
          popperPlacement="bottom-start"
        />
        <div
          className="w-[35px] h-full bg-gradient-1 flex justify-center items-center absolute top-0 right-0 rounded-tr-[4px] rounded-br-[4px] cursor-pointer"
          onClick={handleStartDateCal}
        >
          {reactIcons.triangleDown}
        </div>
      </div>
      <div className="relative flex-1 3xl:w-[175px] 2xl:w-[150px] w-full">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="02/02/2024"
          ref={endDatePickerRef}
          popperPlacement="bottom-start"
        />
        <div
          className="w-[35px] h-full bg-gradient-1 flex justify-center items-center absolute top-0 right-0 rounded-tr-[4px] rounded-br-[4px] cursor-pointer"
          onClick={handleEndDateCal}
        >
          {reactIcons.triangleDown}
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
