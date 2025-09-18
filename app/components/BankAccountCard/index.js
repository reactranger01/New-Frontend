/* eslint-disable react-hooks/exhaustive-deps */
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import { getReq, isLoggedIn } from '@/utils/apiHandlers';
const BankAccountCard = () => {
  const [bankAccountList, setBankAccountList] = useState([]);
  const islogin = isLoggedIn();
  useEffect(() => {
    getBankAccountList();
  }, []);

  const getBankAccountList = async () => {
    if (islogin) {
      try {
        const response = await getReq('/user/get-user-bank-account');
        if (response?.status === 201 || response?.status === 200) {
          setBankAccountList(response.data); // Return the data instead of logging it
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  const handleDeleteClick = async (id) => {
    console.log(id);
  };
  return (
    <>
      {bankAccountList &&
        bankAccountList.map((items, index) => {
          return (
            <div
              key={index}
              className="xl:w-[550px] h-[200px]  bg-gradient-to-br from-[#00000080] to-[#00000040] p-5 pl-4 rounded-[5px] relative"
            >
              {index === 0 ? (
                <div className="absolute top-4 left-0 w-[200px] p-[8px_12px] bg-gradient-1 rounded-tr-md rounded-br-md">
                  <h4 className="font-semibold text-18">Default Account</h4>
                </div>
              ) : (
                <div className="absolute top-4 left-0 w-[200px] p-[8px_12px] bg-gradient-1 rounded-tr-md rounded-br-md">
                  <h4 className="font-semibold text-18">Account</h4>
                </div>
              )}
              <div className="flex items-center justify-end">
                {/* <div
                  className="w-8 h-8 rounded-[4px] bg-[#505050] grid place-content-center cursor-pointer"
                  onClick={() =>
                    navigate('/profile/bank-details/edit-bank-account-details')
                  }
                >
                  {reactIcons.pen}
                </div> */}
                <div
                  onClick={() => handleDeleteClick(items?.id)}
                  className="ml-3 w-8 h-8 rounded-[4px] bg-[#505050] grid place-content-center cursor-pointer"
                >
                  {reactIcons.delete}
                </div>
              </div>
              <div className="mt-5">
                {/* <h4 className="font-semibold text-22 text-[#82CFFF] mb-2">
                  Krishnapal patel
                </h4> */}
                <div className="flex items-start gap-3">
                  <span className="text-20 mt-[2px]">{reactIcons.bank}</span>
                  <div>
                    <h6 className="text-16 font-semibold">
                      {' '}
                      {items?.accountType === 'bankaccount'
                        ? 'Bank Account'
                        : 'Bank Account'}
                    </h6>
                    <h6 className="text-16 font-semibold">
                      Bank Name : {items?.bankName}
                    </h6>
                    <h6 className="text-16 font-semibold">
                      Account holder name : {items?.acountholdername}
                    </h6>
                    <h6 className="text-16 font-semibold">
                      Account No : {items?.accountNumber}
                    </h6>
                    <h6 className="text-16 font-semibold">
                      IFSC : {items?.ifscCode}
                    </h6>
                    {/* <h6 className="text-16 font-semibold">ROADSANAWAD NIMAR451111</h6> */}
                  </div>
                </div>
              </div>

              {/* <div className="absolute bottom-0 left-0 w-full z-10 h-[50px] flex">
                <div className="w-[85px] bg-black flex-center h-full">
                  <h6 className="text-14 font-semibold text-center">Remarks</h6>
                </div>
                <div className="flex-1 justify-center bg-[#343434] flex-center h-full">
                  <h6 className="text-14 font-semibold text-center">
                    Sanawad Remark
                  </h6>
                </div>
              </div> */}
            </div>
          );
        })}
    </>
  );
};

BankAccountCard.propTypes = {
  bankList: PropTypes.array,
};

export default BankAccountCard;
