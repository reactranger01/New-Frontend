import React from 'react';
import CustomDatePicker from '../CustomDatePicker';
import { reactIcons } from '@/utils/icons';
import { PropTypes } from 'prop-types';

const FilterHeader = ({ heading }) => {
  return (
    <>
      <div className="border-b border-black py-2 mt-3">
        <h1 className="text-24">{heading}</h1>
      </div>

      <div className="flex items-end gap-8 my-4 mb-10">
        <div className="">
          <button className="bg-[#4283ca] rounded-md text-white text-12 px-5 w-[100px] mr-3">
            Current
          </button>
          <button className="border border-gray-300 rounded-md text-12 px-5 w-[100px] bg-white">
            Past
          </button>
          <div className="flex items-center gap-3 text-12 font-medium mt-2">
            <div className="flex items-center gap-1">
              <input type="radio" id="match" name="radioBtn" />
              <label htmlFor="match">Matched</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="radio" id="unmatch" name="radioBtn" />
              <label htmlFor="unmatch">Unmatched</label>
            </div>
          </div>
        </div>
        <div className="flex gap-5 items-center ">
          <div>
            <p className="text-12">From</p>
            <CustomDatePicker />
          </div>
          <div>
            <p className="text-12">To</p>
            <CustomDatePicker />
          </div>
          <button className="flex items-center text-white bg-green-600 mt-6 gap-1  cursor-pointer ml-4 rounded-md py-1 px-3">
            {reactIcons.search}
            <h5 className="ml-2 ">Search</h5>
          </button>
        </div>
      </div>
    </>
  );
};

FilterHeader.propTypes = {
  heading: PropTypes.string,
};

export default FilterHeader;
