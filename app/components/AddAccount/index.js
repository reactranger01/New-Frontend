/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@/utils/icons';
import { postAuthData } from '@/utils/apiHandlers';
import { isYupError, parseYupError } from '@/utils/Yup';
import { addAccountValidation, addUpiValidation } from '@/utils/validation';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const AddAccount = ({ isOpen, closeModal, setReftech }) => {
  const userId = useSelector((state) => state.user.id);
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
      placeholder: 'Enter bank name',
      keyName: 'bankName',
    },
    {
      label: 'A/C HOLDER NAME',
      placeholder: 'Enter a/c holder name',
      keyName: 'acountholdername',
    },
    {
      label: 'A/C NUMBER',
      placeholder: 'Enter a/c number',
      keyName: 'accountNumber',
    },
    {
      label: 'IFSC CODE',
      placeholder: 'Enter ifsc code',
      keyName: 'ifscCode',
    },
  ];

  const inputBoxUpi = [
    {
      label: 'NAME',
      placeholder: 'Enter name',
      keyName: 'acountholdername',
    },
    {
      label: 'UPI ID',
      placeholder: 'Enter upi id',
      keyName: 'upiId',
    },
    {
      label: 'PHONE NUMBER',
      placeholder: 'Enter phone number',
      keyName: 'phonenumber',
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
        setReftech((prev) => !prev);
        setFormError({
          bankName: '',
          accountNumber: '',
          ifscCode: '',
          accountType: '',
        });
        closeModal();
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
        setReftech((prev) => !prev);
        setFormError({
          upiId: '',
          upiName: '',
          userId: '',
        });
        closeModal();
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

  const tabList = [
    {
      id: 1,
      title: 'Account',
    },
    {
      id: 2,
      title: 'Upi Id',
    },
  ];

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[520px] relative transform overflow-hidden rounded-2xl  align-middle shadow-xl transition-all">
                  <button
                    onClick={closeModal}
                    className="absolute md:top-2 top-[15px] right-2 text-18 flex-center md:w-10 md:h-10 w-6 h-6 rounded-md bg-white text-black"
                  >
                    {reactIcons.close}
                  </button>
                  <div className="text-center md:text-20 text-18 font-semibold bg-[#0f2327] p-4">
                    <p className="text-white">Add Account</p>
                  </div>
                  <div className="bg-[#F1F1F1] p-4 py-6 flex flex-col gap-4">
                    <div>
                      <div className="tab-menu bg-gradient p-[1px] rounded-md w-[207px] ">
                        <ul className="border border-gray-400 p-[3px] flex items-center gap-1 rounded-md">
                          {tabList.map((item) => (
                            <li
                              key={item.id}
                              className={`xl:text-16 text-14 font-semibold py-2 px-5 rounded-md cursor-pointer duration-300 transition-all ${
                                item.title == activeTab
                                  ? 'bg-primary-700 text-white'
                                  : ' text-black'
                              }`}
                              onClick={() => setActiveTab(item.title)}
                            >
                              {item.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {activeTab === 'Account' && (
                      <>
                        <div className="">
                          <label
                            htmlFor="account"
                            className="text-black flex text-start text-14 md:text-16"
                          >
                            ACCOUNT TYPE
                          </label>
                          <div className="bg-gradient p-[1px] rounded-md overflow-hidden h-[38px] md:h-[48px]">
                            <select
                              name="accountType"
                              id="account"
                              onChange={handleChange}
                              className="w-full border bg-white h-full rounded-md text-black outline-none px-4 text-14 md:text-16"
                            >
                              <option value="">--Select Account Type--</option>
                              <option value="bankaccount">Bank Account</option>
                            </select>
                          </div>
                          {formError.accountType && (
                            <div className="form-eror flex text-start text-14">
                              {formError.accountType}
                            </div>
                          )}
                        </div>
                        {inputBox.map((item, index) => (
                          <>
                            <div key={index} className="">
                              <label
                                htmlFor={item.label}
                                className="text-black flex text-start text-14 md:text-16"
                              >
                                {item.label}
                              </label>
                              <div className="bg-gradient p-[1px] rounded-md overflow-hidden h-[38px] md:h-[48px]">
                                <input
                                  name={item.keyName}
                                  placeholder={item.placeholder}
                                  id={item.label}
                                  onChange={handleChange}
                                  className="w-full h-full bg-white rounded-md text-black outline-none px-4 text-14 md:text-16"
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
                      </>
                    )}
                    {activeTab === 'Upi Id' && (
                      <>
                        {inputBoxUpi.map((item, index) => (
                          <>
                            <div key={index} className="">
                              <label
                                htmlFor={item.label}
                                className="text-black flex text-start text-14 md:text-16"
                              >
                                {item.label}
                              </label>
                              <div className="bg-gradient p-[1px] rounded-md overflow-hidden h-[38px] md:h-[48px]">
                                <input
                                  name={item.keyName}
                                  placeholder={item.placeholder}
                                  id={item.label}
                                  onChange={handleChange}
                                  className="w-full h-full bg-white rounded-md text-black outline-none px-4 text-14 md:text-16"
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
                      </>
                    )}
                  </div>
                  <div className=" md:p-4 p-3 flex justify-end md:gap-4 gap-3 bg-[#f1f1f1]">
                    <button
                      type="button"
                      className=" border border-gray-200 bg-white rounded-lg h-[38px] md:h-[48px] text-14 md:text-16 p-[1px] overflow-hidden"
                      onClick={() => {
                        closeModal();
                        setFormError({
                          bank_name: '',
                          ac_number: '',
                          ifsc_code: '',
                          type: '',
                          upiName: '',
                          upiId: '',
                        });
                      }}
                    >
                      <div className="w-full rounded-lg flex-center px-7 md:px-12 font-medium h-full ">
                        Close
                      </div>
                    </button>
                    <button
                      type="button"
                      className="btn rounded-lg h-[38px] md:h-[48px] text-14 md:text-16 px-7 md:px-12 font-medium bg-green-700 "
                      onClick={
                        activeTab === 'Account'
                          ? handleAddAccountSubmit
                          : handleAddUpiSubmit
                      }
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
AddAccount.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  setReftech: PropTypes.func.isRequired,
};
export default AddAccount;
