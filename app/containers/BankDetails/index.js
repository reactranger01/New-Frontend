/* eslint-disable react-hooks/exhaustive-deps */
import { BankAccountCard } from '@/components';
import { reactIcons } from '@/utils/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BankDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full py-[10px]">
      <div className="text-white  bg-[#35353591] rounded-10 font-inter p-3 md:p-5 h-full md:mx-0 mx-[10px]">
        <div className="flex justify-between items-center border-b border-b-[#E1E1E1] pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span
                onClick={() => navigate(-1)}
                className="w-[22px] h-[22px] rounded-full bg-gradient-to-r from-[#757FC7] to-[#98A2F8] grid place-content-center text-12 cursor-pointer shadow-[0_0_25px_0_#150E4BB2]"
              >
                {reactIcons.leftChev}
              </span>
              <span className="font-inter font-bold text-primary-1300">
                Bank details
              </span>
            </div>
            <p className="text-12 text-[#8B9BCA]">
              Home Page <span> &gt; </span> My Dashboard <span> &gt; </span>
              Profile <span> &gt; </span>{' '}
              <span className="text-white">Bank Details</span>
            </p>
          </div>
        </div>
        <div className="mb-7">
          <button
            className="btn-blue-gradient font-semibold text-18 flex items-center gap-2"
            onClick={() => navigate('/profile/bank-details/add-account')}
          >
            <span className="text-20">{reactIcons.bank}</span>
            <span>Add Account</span>
          </button>
        </div>
        <div className="flex flex-col  gap-3">
          <BankAccountCard />
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
