/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { reactIcons } from '@/utils/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import * as yup from 'yup';
import {
  deleteAuthData,
  getAuthData,
  isLoggedIn,
  postAuthData,
} from '@/utils/apiHandlers';
import { isYupError, parseYupError } from '@/utils/Yup';
// import { withdrawValidation } from '@/utils/validation';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { AddAccount } from '@/components';
import toast from 'react-hot-toast';

const WithdrawCard = ({ setReftech, reftech }) => {
  const [bankAccountList, setBankAccountList] = useState([]);
  const [upiList, setUpiList] = useState([]);
  const [type, setType] = useState('');
  const islogin = isLoggedIn();
  const [accountIndex, setAccountIndex] = useState(null);
  const [upiIndex, setUpiIndex] = useState(null);
  const UserInfo = useSelector((state) => state.user);
  const copieBtn = async (copyText) => {
    toast.success(copyText + ' Coppied!!');
  };
  const userbal = useSelector((state) => state.user.balance);
  const userexp = useSelector((state) => state.user.exposureAmount);
  const balance = Math.floor(userbal) - Math.floor(Math.abs(userexp));
  const withdrawValidation = yup.object().shape({
    amount: yup
      .number()
      .transform((value, originalValue) => {
        // If the original value is empty or contains non-numeric characters, return NaN
        return originalValue.trim() === '' || isNaN(Number(originalValue))
          ? NaN
          : value;
      })
      .nullable()
      .typeError('Amount must be a valid number')
      .required('Please enter amount')
      .positive('Amount must be a positive number')
      .min(100, 'Amount should not be more than 100')
      .max(balance, `Amount cannot exceed balance of ${balance}`),
  });
  const [form, setForm] = useState({
    amount: '',
  });
  const [form2, setForm2] = useState({
    amount: '',
  });

  const [formError, setFormError] = useState({
    amount: '',
  });

  useEffect(() => {
    getBankAccountList();
    getUpiList();
  }, [reftech]);

  const getBankAccountList = async () => {
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-user-bank-account');
        if (response?.status === 201 || response?.status === 200) {
          setBankAccountList(response.data); // Return the data instead of logging it
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };

  const getUpiList = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-userupi');
        if (response?.status === 201 || response?.status === 200) {
          setUpiList(response.data); // Return the data instead of logging it
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };

  const handleChange = (e, index) => {
    setUpiIndex(index);
    let { name, value } = e.target;
    setForm((prevCredential) => ({
      ...prevCredential,
      [name]: value,
    }));
    setFormError((prevFormError) => ({
      ...prevFormError,
      [name]: '',
    }));
  };
  const handleChange2 = (e, index) => {
    setAccountIndex(index);
    let { name, value } = e.target;
    setForm2((prevCredential) => ({
      ...prevCredential,
      [name]: value,
    }));
    setFormError((prevFormError) => ({
      ...prevFormError,
      [name]: '',
    }));
  };

  const handleSubmit = async (id, type) => {
    setForm({ ...form, id: id });
    setType(type);
    try {
      setFormError({});
      await withdrawValidation.validate(type === 'upi' ? form : form2, {
        abortEarly: false,
      });
      const response = await postAuthData(
        '/user/widraw-req',
        type === 'upi'
          ? {
              userId: UserInfo.id,
              amount: form?.amount,
              upiId: id,
            }
          : {
              userId: UserInfo.id,
              amount: form2?.amount,
              bankAccountId: id,
            },
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Withdraw Request Sent Successfully');
        setForm((prevForm) => ({
          ...prevForm,
          amount: '', // Resetting amount to empty string
        }));
        setForm2((prevForm2) => ({
          ...prevForm2,
          amount: '', // Resetting amount to empty string
        }));
        setReftech((pre) => !pre);
      } else {
        toast.error(response?.data || 'Something went wrong');
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };

  const handleDeleteClick = async (id, type) => {
    const response = await deleteAuthData(
      type === 'account'
        ? `/user/delete-user-account/${id}`
        : `/user/delete-userapi/${id}`,
    );
    if (response?.status === 200 || response?.status === 201) {
      toast.success(
        `${type === 'account' ? 'Account' : 'UPI id'} Delete Successfully`,
      );
      getBankAccountList();
      getUpiList();
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };

  return (
    <>
      {bankAccountList &&
        bankAccountList.map((items, index) => {
          return (
            <div key={index} className="col-span-1 border border-gray-300">
              <div className="bg-white text-black rounded-lg p-2 md:p-4 relative">
                <button
                  onClick={() => handleDeleteClick(items?.id, 'account')}
                  className="absolute top-2 right-2 text-2xl flex-center w-7 h-7 md:w-10 md:h-10 rounded-md bg-primary-red text-white"
                >
                  {reactIcons.delete}
                </button>
                <h1 className="underline xl:text-24 lg:text-20 text-18 font-semibold text-center">
                  Account
                </h1>
                <div className="rounded-lg bg-primary-900/30 px-3 p-1 mt-5 mb-2">
                  <div className="flex justify-between items-center my-1 ">
                    <p className="lg:text-16 text-14">
                      Bank Name.: {items?.bankName}
                    </p>
                    <CopyToClipboard text={items?.bankName}>
                      <span
                        className="cursor-pointer"
                        onClick={() => copieBtn(items?.bankName)}
                      >
                        {reactIcons.copy}
                      </span>
                    </CopyToClipboard>
                  </div>
                  <div className="flex justify-between items-center my-1 ">
                    <p className="lg:text-16 text-14">
                      NAME: {items?.acountholdername}
                    </p>
                    <CopyToClipboard text={items?.acountholdername}>
                      <span
                        className="cursor-pointer"
                        onClick={() => copieBtn(items?.acountholdername)}
                      >
                        {reactIcons.copy}
                      </span>
                    </CopyToClipboard>
                  </div>
                  <div className="flex justify-between items-center my-1 ">
                    <p className="lg:text-16 text-14">
                      A/C No.: {items?.accountNumber}
                    </p>
                    <CopyToClipboard text={items?.accountNumber}>
                      <span
                        className="cursor-pointer"
                        onClick={() => copieBtn(items?.accountNumber)}
                      >
                        {reactIcons.copy}
                      </span>
                    </CopyToClipboard>
                  </div>
                  <div className="flex justify-between items-center my-1">
                    <p className="lg:text-16 text-14">
                      IFSC Code: {items?.ifscCode}
                    </p>
                    <CopyToClipboard text={items?.ifscCode}>
                      <span
                        className="cursor-pointer"
                        onClick={() => copieBtn(items?.ifscCode)}
                      >
                        {reactIcons.copy}
                      </span>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="amount"
                    className="text-black flex text-start lg:text-16 text-14"
                  >
                    Enter amount
                  </label>
                  <div className="rounded-md overflow-hidden h-[48px]">
                    <input
                      name="amount"
                      type="number"
                      placeholder={'Enter amount'}
                      id="amount"
                      value={accountIndex === index ? form2.amount : ''}
                      onChange={(e) => handleChange2(e, index)}
                      className="placeholder:text-black w-full h-full bg-primary-900/30 rounded-md text-black outline-none px-4 lg:text-16 text-14"
                    />
                  </div>

                  <div className="form-eror text-12 h-[16px]">
                    {formError.amount &&
                    form?.id === items?.id &&
                    type === 'account'
                      ? formError.amount
                      : ''}
                  </div>
                </div>
                <button
                  disabled={accountIndex !== index}
                  onClick={() => {
                    handleSubmit(items?.id, 'account');
                  }}
                  className="btn bg-green-700 rounded-lg mt-3 h-12 w-full font-medium"
                >
                  WITHDRAW
                </button>
              </div>
            </div>
          );
        })}

      {upiList &&
        upiList.map((items, index) => {
          return (
            <div key={index} className="col-span-1">
              <div className="bg-white text-black rounded-lg p-4 relative border border-gray-300">
                <button
                  onClick={() => handleDeleteClick(items?.id, 'upi')}
                  className="absolute top-2 right-2 text-2xl flex-center w-10 h-10 rounded-md bg-primary-red text-white"
                >
                  {reactIcons.delete}
                </button>
                <h1 className="underline xl:text-24 lg:text-20 text-18 font-semibold text-center">
                  Account
                </h1>
                <div className="rounded-lg bg-primary-900/30 px-3 p-1 mt-5 mb-4">
                  <div className="flex justify-between items-center my-2 gap-2">
                    <p className="lg:text-16 text-14">
                      Name: {items?.acountholdername}
                    </p>
                    <CopyToClipboard text={items?.acountholdername}>
                      <span
                        className="cursor-pointer"
                        onClick={() => copieBtn(items?.acountholdername)}
                      >
                        {reactIcons.copy}
                      </span>
                    </CopyToClipboard>
                  </div>
                  <div className="flex justify-between items-center my-2 gap-2">
                    <p className="lg:text-16 text-14">UPI id: {items?.upiId}</p>
                    <CopyToClipboard text={items?.upiId}>
                      <span
                        className="cursor-pointer"
                        onClick={() => copieBtn(items?.upiId)}
                      >
                        {reactIcons.copy}
                      </span>
                    </CopyToClipboard>
                  </div>
                  <div className="flex justify-between items-center my-2 gap-2">
                    <p className="lg:text-16 text-14">
                      Phone Number: {items?.phonenumber}
                    </p>
                    <CopyToClipboard text={items?.phonenumber}>
                      <span
                        className="cursor-pointer"
                        onClick={() => copieBtn(items?.phonenumber)}
                      >
                        {reactIcons.copy}
                      </span>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="amount"
                    className="text-black flex text-start lg:text-16 text-14"
                  >
                    Enter amount
                  </label>
                  <div className="rounded-md overflow-hidden h-[48px]">
                    <input
                      name="amount"
                      placeholder={'Enter amount'}
                      id="amount"
                      value={upiIndex === index ? form.amount : ''}
                      onChange={(e) => handleChange(e, index)}
                      className="placeholder:text-black w-full h-full bg-primary-900/30 rounded-md text-black outline-none px-4 lg:text-16 text-14"
                    />
                  </div>
                  <div className="form-eror text-12 h-[16px]">
                    {formError.amount &&
                    form?.id === items?.id &&
                    type === 'upi'
                      ? formError.amount
                      : ''}
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleSubmit(items?.id, 'upi');
                  }}
                  disabled={upiIndex !== index}
                  className="btn bg-green-700 rounded-lg mt-4 h-12 w-full font-medium"
                >
                  WITHDRAW
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};
WithdrawCard.propTypes = {
  setReftech: PropTypes.func.isRequired,
  reftech: PropTypes.func.isRequired,
};

const Withdraw = () => {
  const [accountType, setAccountType] = useState('new');
  const [isOpen, setIsOpen] = useState(false);
  const [reftech, setReftech] = useState(false);
  const islogin = isLoggedIn();
  // eslint-disable-next-line
  const [withdrawList, setWithdrawList] = useState([]);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  const take = 15;
  // eslint-disable-next-line
  const [pagination, setPagination] = useState({
    totalCount: 0,
  });
  const closeModal = () => {
    setIsOpen(false);
  };
  // eslint-disable-next-line
  const openModal = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    getWithdrawList();
  }, [reftech, page, take]);

  const getWithdrawList = async () => {
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-user-widrawreq');
        if (response?.status === 201 || response?.status === 200) {
          setWithdrawList(response?.data?.deposits);
          setPagination({
            totalCount: response.data.total_bets,
          });
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };

  const rules = [
    '1. This form is for withdrawing the amount from the main wallet only.',
    '2. The bonus wallet amount cannot be withdrawn by this form.',
    '3. Do not put Withdraw request without betting with deposit amount. Such activity may be identified as Suspicious',
    '4. If multiple users are using same withdraw account then all the linked users will be blocked.',
    '5. Maximum Withdraw time is 45 minutes then only complain on WhatsApp number.',
    '6. Withdrawal account should be same to deposit account.',
  ];

  return (
    <>
      <div className="min-h-screen mx-1 md:mx-0 lg:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:bg-white">
          <div className="px-12 py-9 hidden lg:block shadow-sm lg:shadow-[-1px_1px_10px_#383838]">
            <h1 className="hidden mb-5 lg:flex text-[29px] font-bold text-black">
              Withdraw funds
            </h1>
            <ul className=" bg-white border border-black p-2 rounded-md ">
              {rules.map((item, index) => (
                <li
                  className=" text-[13px] leading-5 font-bold mb-2"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:px-12 lg:py-10 p-2 shadow-sm lg:shadow-[1px_1px_10px_#383838] ">
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setAccountType('new')}
                className="bg-primary-1300 my-5 text-14 h-[35px] flex-center rounded-[4px] w-full text-white shadow-[2px_2px_#00000040]"
              >
                Use New Account
              </button>
              <button
                onClick={() => setAccountType('prev')}
                className="bg-primary-1300 my-5 text-14 h-[35px] flex-center rounded-[4px] w-full text-white shadow-[2px_2px_#00000040]"
              >
                Use Previous Account
              </button>
            </div>

            <div className="lg:hidden flex items-center justify-between">
              <h2 className="text-18 font-bold">Withdraw Funds</h2>
              {accountType === 'new' ? (
                <button
                  onClick={() => setAccountType('prev')}
                  className=" bg-primary-1300 px-4 w-fit my-5 text-14 h-[35px] flex-center rounded-[4px]  text-white shadow-[2px_2px_#00000040]"
                >
                  Use Previous Account
                </button>
              ) : (
                <button
                  onClick={() => setAccountType('new')}
                  className=" bg-primary-1300 px-4 w-fit my-5 text-14 h-[35px] flex-center rounded-[4px]  text-white shadow-[2px_2px_#00000040]"
                >
                  Use New Account
                </button>
              )}
            </div>

            {accountType === 'new' ? (
              <AddAccount
                isOpen={isOpen}
                closeModal={closeModal}
                setReftech={setReftech}
              />
            ) : (
              <div className="text-[13px] font-bold p-2 px-5 text-center border border-black rounded-lg">
                No Account Available. Continue with new account!!
              </div>
            )}
          </div>
        </div>
        <ul className="lg:hidden bg-white border mb-5 border-black p-2 rounded-md ">
          {rules.map((item, index) => (
            <li className=" text-[13px] leading-5 font-bold mb-2" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="md:border-b border-black py-2 mt-3 mx-1 md:mx-0 mb-2 md:mb-0">
        <h1 className="text-18 md:text-24 mt-4 md:mt-0">Withdraw</h1>
      </div>

      <div className="border rounded-lg p-2 sm:p-5 -mt-2 md:mt-5 md:my-5 bg-white min-h-screen mx-1 md:mx-0">
        <div className="flex justify-between gap-1 items-center">
          <button
            onClick={openModal}
            className="rounded-lg px-6 xl:font-semibold font-normal xl:h-[40px] h-[30px] xl:text-16 text-14 flex-center gap-2 btn bg-primary-700"
          >
            <span className="text-20">{reactIcons.plus}</span>
            <span>ADD ACCOUNT</span>
          </button>
        </div>
        <div className="my-5 mt-2 md:mt-5 border-y border-dashed p-5">
          <ul className="flex flex-col gap-1 list-decimal list-outside">
            {rules.map((item, index) => (
              <li className="text-14" key={index}>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 grid md:grid-cols-2 grid-cols-1 gap-5">
          <WithdrawCard setReftech={setReftech} reftech={reftech} />
        </div>
      </div> */}
    </>
  );
};

export default Withdraw;
