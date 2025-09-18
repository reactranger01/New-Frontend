import { CustomInput, SelectBox } from '@/components';
import { reactIcons } from '@/utils/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditBankAccountDetails = () => {
  const navigate = useNavigate();
  const bankOptions = [
    { value: 'State Bank of India', label: 'State Bank of India' },
    { value: 'Bak Of India', label: 'Bak Of India' },
    { value: 'Punjab National', label: 'Punjab National' },
  ];

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

        <div className="bg-gradient-to-br from-[#00000080] to-[#00000040] p-5 rounded-md 3xl:w-[636px] xl:w-[500px] w-full">
          <div className="input-group mb-3">
            <SelectBox
              optionArr={bankOptions}
              placeholder="Select Bank Name"
              fontFamily="Rajdhani"
            />
          </div>
          <div className="input-group mb-3">
            <CustomInput placeholder="full Name" />
          </div>
          <div className="grid lg:grid-cols-2 gap-3 mb-3">
            <div className="input-group">
              <CustomInput
                placeholder="Account Number"
                required={true}
                type="number"
              />
            </div>
            <div className="input-group">
              <CustomInput
                className="pr-10"
                placeholder="IFSC Code"
                required={true}
                addonRight={
                  <div className="absolute top-0 right-0 w-[35px] h-full rounded-tr-lg rounded-br-lg bg-primary-1200 text-20 text-white grid place-content-center">
                    {reactIcons.search}
                  </div>
                }
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 mb-3">
            <div className="input-group">
              <CustomInput placeholder="Bank Branch" />
            </div>
            <div className="input-group">
              <CustomInput placeholder="Bank Address" />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 mb-3">
            <div className="input-group">
              <CustomInput placeholder="Remarks" />
            </div>
            <div className="input-group">
              <CustomInput
                className="pl-6"
                placeholder="Set Default Account"
                addonLeft={
                  <div className="w-[10px] h-[10px] bg-primary-1200 rounded-full absolute top-[15px] left-[10px]"></div>
                }
              />
            </div>
          </div>
          <p className="text-14 font-rajdhani font-medium leading-5 mb-5">
            For Security Reasons, Withdrawal Is Only Allowed Account Owner. If
            You Have Any Issues, Do Not Hesitate To Contact Our{' '}
            <span className="text-[#FF4646]">Customer Service</span>
          </p>

          <div className="flex items-center gap-2">
            <button className="bg-black text-white font-rajdhani font-medium text-18 p-2 w-[128px] rounded-lg">
              Reset
            </button>
            <button className="bg-[#1C77FF] text-white font-rajdhani font-medium text-18 p-2 flex-1 rounded-lg">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBankAccountDetails;
