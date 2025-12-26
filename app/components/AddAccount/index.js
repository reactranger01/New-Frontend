/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { postAuthData } from '@/utils/apiHandlers';
import { isYupError, parseYupError } from '@/utils/Yup';
import { addAccountValidation, addUpiValidation } from '@/utils/validation';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { reactIcons } from '@/utils/icons';
import { Link } from 'react-router-dom';

const AddAccount = () => {
  const userId = useSelector((state) => state.user.id);
  const [isPassword, setIsPassword] = useState(false);

  const userName = useSelector((state) => state.user.username);
  const [activeTab, setActiveTab] = useState('Account');
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (userId) {
      setForm({ ...form, userId: userId });
      if (activeTab != 'Account') {
        setForm({ ...form, upiName: userName });
      }
    }
  }, [userId, userName, activeTab]);

  const inputBox = [
    {
      label: 'BANK NAME',
      placeholder: 'Enter Bank name',
      keyName: 'bankName',
    },
    {
      label: 'Account holder’s name',
      placeholder: 'Eg. John Doe',
      keyName: 'acountholdername',
    },
    {
      label: 'Account number',
      placeholder: 'Enter account number',
      keyName: 'accountNumber',
    },
    {
      label: 'IFSC Code',
      placeholder: 'Eg SBIN0005943',
      keyName: 'ifscCode',
    },
  ];

  const handleChange = (e) => {
    let { name, value } = e.target;
    value = value.trim();
    setForm({ ...form, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };
  const handleAddAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await addAccountValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/add-user-bank-account', form);
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Account Added Successfully');
        setFormError({
          bankName: '',
          accountNumber: '',
          ifscCode: '',
          withdrawPassword: '',
        });
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

  const handleAddUpiSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await addUpiValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postAuthData('/user/add-userupi', form);
      if (response?.status === 200 || response?.status === 201) {
        toast.success('UPI Id Added Successfully');
        setActiveTab('Account');
        setFormError({
          upiId: '',
          upiName: '',
          userId: '',
        });
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

  // const tabList = [
  //   {
  //     id: 1,
  //     title: 'Account',
  //   },
  //   {
  //     id: 2,
  //     title: 'Upi Id',
  //   },
  // ];

  return (
    <div className="w-full  relative transform overflow-hidden  align-middle  transition-all">
      <div className=" flex flex-col gap-4">
        {inputBox.map((item, index) => (
          <>
            <div key={index} className="">
              <label
                htmlFor={item.label}
                className="text-black flex text-start text-14 md:text-16 font-bold"
              >
                {item.label}
              </label>
              <div className="bg-gradient p-[1px] rounded-md overflow-hidden h-[38px] md:h-[48px]">
                <input
                  name={item.keyName}
                  placeholder={item.placeholder}
                  id={item.label}
                  onChange={handleChange}
                  className="w-full h-full  text-black outline-none px-4 py-1 border border-black rounded-md text-14 md:text-16"
                />
              </div>
              {formError[item.keyName] && (
                <div className="form-eror flex text-start text-14">
                  {formError[item.keyName]}
                </div>
              )}
            </div>
          </>
        ))}{' '}
        <div className="">
          <label
            htmlFor=""
            className="text-black flex text-start text-14 md:text-16 font-bold"
          >
            Withdraw Password
          </label>
          <div className="bg-gradient p-[1px] relative rounded-md overflow-hidden h-[38px] md:h-[48px]">
            <input
              name="withdrawPassword"
              placeholder="Enter Withdraw Password"
              id=""
              type={!isPassword ? 'password' : 'text'}
              onChange={handleChange}
              className="w-full h-full  text-black outline-none px-4 py-1 border border-black rounded-md text-14 md:text-16"
            />
            <span
              onClick={() => setIsPassword(!isPassword)}
              className="absolute ay-center right-2"
            >
              {isPassword ? reactIcons.eye : reactIcons.eyeSlash}
            </span>
          </div>
          {formError?.withdrawPassword && (
            <div className="form-eror flex text-start text-14">
              {formError?.withdrawPassword}
            </div>
          )}

          <div className="flex items-start justify-start gap-2 mt-4">
            <input
              type="checkbox"
              className="w-5 h-5 accent-primary-red"
              name="condition"
              checked={form.condition}
              onChange={handleChange}
              id="odds"
            />
            <label htmlFor="odds" className="leading-5 text-14 ">
              I have read and agree with{' '}
              <Link to="#" className="text-primary-1300 underline">
                the terms of payment and withdrawal policy.
              </Link>
            </label>
          </div>
          {formError.condition && (
            <div className="form-eror xl:text-16   text-14">
              {formError.condition}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={
          activeTab === 'Account' ? handleAddAccountSubmit : handleAddUpiSubmit
        }
        className="bg-primary-1300 my-5 text-14 h-[35px] flex-center rounded-[4px] w-full text-white shadow-[2px_2px_#00000040]"
      >
        Proceed
      </button>
    </div>
  );
};

export default AddAccount;
