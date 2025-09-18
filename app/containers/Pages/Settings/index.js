/* eslint-disable react-hooks/exhaustive-deps */
import { postAuthData } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import { userChangePasswordValidation } from '@/utils/validation';
import { isYupError, parseYupError } from '@/utils/Yup';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Settings = () => {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState({});
  const userid = useSelector((state) => state.user?.id);
  useEffect(() => {
    if (userid) {
      setForm({ ...form, _uid: userid });
    }
  }, [userid]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({ ...formError, [name]: '' });
  };

  const passwordRequirements = [
    {
      text: 'Between 8-15 characters',
      status: form?.newPassword?.length >= 8 && form?.newPassword?.length <= 15,
    },
    {
      text: 'At least one upper and one lower case letter',
      status:
        /[a-z]/.test(form?.newPassword) && /[A-Z]/.test(form?.newPassword),
    },
    { text: 'At least one number', status: /[0-9]/.test(form?.newPassword) },
    {
      text: 'At least one special character',
      status: /[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/.test(form?.newPassword),
    },
  ];

  const fulfilledRequirements = passwordRequirements.filter(
    (req) => req.status,
  ).length;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await userChangePasswordValidation.validate(form, {
        abortEarly: false,
      });
      delete form.confirmPassword;
      const response = await postAuthData('/user/change-password', form);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          response?.data?.message || 'Password changed successfully',
        );
        setForm({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        toast.error(response?.data || 'Something went wrong');
        setForm({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };

  const handlereset = () => {
    setForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setFormError({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const [isPassword, setIsPassword] = useState(false);
  const [isPassword1, setIsPassword1] = useState(false);
  const [isPassword2, setIsPassword2] = useState(false);

  return (
    <div className="min-h-screen mx-1 md:mx-0">
      <div className="md:border-b border-black py-2 mt-3">
        <h1 className="text-18 md:text-24 font-bold mt-4 md:mt-0">
          Change Password
        </h1>
      </div>

      <div className="w-full max-w-[450px] bg-white p-4 text-12 my-2">
        <form className="flex flex-col gap-3" action="">
          <div className="relative w-full">
            <input
              className="border border-gray-300 w-full  px-2 py-2 rounded-sm outline-none"
              type={!isPassword ? 'password' : 'text'}
              placeholder="Old Password"
              onChange={handleChange}
              value={form.oldPassword}
              name="oldPassword"
            />
            <span
              className="absolute top-[10px] right-[10px] text-22 text-gray-300 cursor-pointer"
              onClick={() => setIsPassword(!isPassword)}
            >
              {isPassword ? reactIcons.eye : reactIcons.eyeSlash}
            </span>

            {formError?.oldPassword && (
              <div className="text-12  font-normal  text-red-700">
                {formError?.oldPassword}
              </div>
            )}
          </div>

          <div className="relative w-full">
            <input
              className="border border-gray-300 w-full px-2 py-2 rounded-sm outline-none"
              type={!isPassword1 ? 'password' : 'text'}
              placeholder="New Password"
              onChange={handleChange}
              value={form.newPassword}
              name="newPassword"
            />
            <span
              className="absolute top-[10px] right-[10px] text-22 text-gray-300 cursor-pointer"
              onClick={() => setIsPassword1(!isPassword1)}
            >
              {isPassword1 ? reactIcons.eye : reactIcons.eyeSlash}
            </span>
            {formError?.newPassword && (
              <div className="text-12  font-normal  text-red-700">
                {formError?.newPassword}
              </div>
            )}
          </div>

          <div className="relative w-full">
            <input
              className="border border-gray-300 w-full px-2 py-2 rounded-sm outline-none"
              type={!isPassword2 ? 'password' : 'text'}
              placeholder="Repeat New Password"
              onChange={handleChange}
              value={form.confirmPassword}
              name="confirmPassword"
            />
            <span
              className="absolute top-[10px] right-[10px] text-22 text-gray-300 cursor-pointer"
              onClick={() => setIsPassword2(!isPassword2)}
            >
              {isPassword2 ? reactIcons.eye : reactIcons.eyeSlash}
            </span>
            {formError?.confirmPassword && (
              <div className="text-12  font-normal  text-red-700">
                {formError?.confirmPassword}
              </div>
            )}
          </div>
        </form>
        <div className="flex justify-between">
          <p className="text-16 my-2 mt-4">Password should:</p>
          <span
            className={
              fulfilledRequirements > 0
                ? 'text-green my-2 mt-4'
                : 'text-red my-2 mt-4'
            }
          >
            {fulfilledRequirements}
          </span>
        </div>

        {passwordRequirements.map((requirement, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className={`rounded-full text-white p-[2px] flex justify-center items-center ${
                requirement.status ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {requirement.status ? reactIcons.checkMark : reactIcons.close}
            </div>{' '}
            <span
              className={fulfilledRequirements > 0 ? 'text-green' : 'text-red'}
            >
              {' '}
              {requirement.text}
            </span>
          </div>
        ))}

        <div className="mt-3 flex gap-3 items-center justify-between">
          <button
            onClick={handlereset}
            className="w-full border border-gray-200 py-2 px-4 rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleLoginSubmit}
            className="w-full bg-[#777] text-white py-2 px-4 rounded-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
