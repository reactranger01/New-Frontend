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
import { useSelector } from 'react-redux';
import { AddAccount } from '@/components';
import toast from 'react-hot-toast';

const WithdrawCard = () => {
  const [bankAccountList, setBankAccountList] = useState([]);
  const [type, setType] = useState('');
  const islogin = isLoggedIn();
  const [accountIndex, setAccountIndex] = useState(null);
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
  }, [islogin]);

  const getBankAccountList = async () => {
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-user-bank-account');
        if (response?.status === 201 || response?.status === 200) {
          setBankAccountList(response?.data); // Return the data instead of logging it
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
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
      await withdrawValidation.validate(form2, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/widraw-req', {
        userId: UserInfo.id,
        amount: form2?.amount,
        bankAccountId: id,
      });
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
      } else {
        toast.error('Something went wrong');
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
    } else {
      toast.error(response?.data || 'Something went wrong');
    }
  };
  return (
    <>
      {bankAccountList && bankAccountList.length > 0 ? (
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
                <div className="rounded-lg  px-3 p-1 mt-5 mb-2">
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
                      className="w-full h-full  text-black outline-none px-4 py-1 border border-black rounded-md text-14 md:text-16"
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
        })
      ) : (
        <div className="text-[13px] font-bold p-2 px-5 text-center border border-black rounded-lg">
          No Account Available. Continue with new account!!
        </div>
      )}
    </>
  );
};

const Withdraw = () => {
  const [accountType, setAccountType] = useState('new');
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  // eslint-disable-next-line
  const openModal = () => {
    setIsOpen(true);
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
              <AddAccount isOpen={isOpen} closeModal={closeModal} />
            ) : (
              <WithdrawCard />
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
