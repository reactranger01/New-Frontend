import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      className="px-3 text-12 w-24 py-1"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      popperPlacement="bottom-start"
    />
  );
};

export default CustomDatePicker;
