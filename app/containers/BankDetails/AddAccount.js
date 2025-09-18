/* eslint-disable react-hooks/exhaustive-deps */
import { CustomInput } from '@/components';
import { isYupError, parseYupError } from '@/utils/Yup';
import { postReq } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddAccount = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('shiv11_userID');
  useEffect(() => {
    if (userId) {
      setForm({ ...form, userId: userId });
    }
  }, [userId]);

  const [form, setForm] = useState({
    bankName: '',
    acountholdername: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
  });

  const [formError, setFormError] = useState({
    bankName: '',
    acountholdername: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
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
      const response = await postReq('/user/add-user-bank-account', form);
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Account Added Successfully');
        setFormError({
          bankName: '',
          acountholdername: '',
          accountNumber: '',
          ifscCode: '',
          accountType: '',
        });
        navigate('/profile/bank-details');
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

  const handleReset = () => {
    setForm({
      bankName: '',
      acountholdername: '',
      accountNumber: '',
      ifscCode: '',
      accountType: '',
    });
  };

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

        <div className="bg-gradient-to-br from-[#00000080] to-[#00000040] p-5 rounded-md 3xl:w-[636px] 2xl:w-[500px]">
          <div className="input-group mb-3">
            <select
              name="accountType"
              id="account"
              onChange={handleChange}
              className="w-full py-2  bg-white font-rajdhani text-black  h-full rounded-md outline-none px-4 text-16 md:text-16"
            >
              <option className="hidden text-[#9DA4B0]" value="">
                Select Account Type
              </option>
              <option value="bankaccount">Bank Account</option>
            </select>
            {formError.accountType && (
              <div className="form-eror flex text-start text-14">
                {formError.accountType}
              </div>
            )}
          </div>
          <div className="input-group mb-3">
            <CustomInput
              onChangeHandler={handleChange}
              placeholder="Bank Name"
              name={'bankName'}
              value={form?.bankName || ''}
            />
            {formError.bankName && (
              <div className="form-eror flex text-start text-14">
                {formError.bankName}
              </div>
            )}
          </div>
          <div className="input-group mb-3">
            <CustomInput
              onChangeHandler={handleChange}
              placeholder="Account holder name"
              name={'acountholdername'}
              value={form?.acountholdername || ''}
            />
            {formError.acountholdername && (
              <div className="form-eror flex text-start text-14">
                {formError.acountholdername}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-3 mb-3">
            <div className="input-group">
              <CustomInput
                placeholder="Account Number"
                type="number"
                onChangeHandler={handleChange}
                name={'accountNumber'}
                value={form?.accountNumber}
              />
              {formError.accountNumber && (
                <div className="form-eror flex text-start text-14">
                  {formError.accountNumber}
                </div>
              )}
            </div>
            <div className="input-group">
              <CustomInput
                className="pr-10"
                placeholder="IFSC Code"
                onChangeHandler={handleChange}
                name={'ifscCode'}
                value={form?.ifscCode}
              />
              {formError.ifscCode && (
                <div className="form-eror flex text-start text-14">
                  {formError.ifscCode}
                </div>
              )}
            </div>
          </div>
          <p className="text-14 font-rajdhani font-medium leading-5 mb-5">
            For Security Reasons, Withdrawal Is Only Allowed Account Owner. If
            You Have Any Issues, Do Not Hesitate To Contact Our{' '}
            <span className="text-[#FF4646]">Customer Service</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="bg-black text-white font-rajdhani font-medium text-18 p-2 w-[128px] rounded-lg"
            >
              Reset
            </button>
            <button
              onClick={handleAddAccountSubmit}
              className="bg-[#1C77FF] text-white font-rajdhani font-medium text-18 p-2 flex-1 rounded-lg"
            >
              Add Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
