/* eslint-disable react-hooks/exhaustive-deps */
import GradientHeading from '@/components/GradientHeading';
import { postAuthData } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import { userChangePasswordValidation } from '@/utils/validation';
import { isYupError, parseYupError } from '@/utils/Yup';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Settings = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isPassword1, setIsPassword1] = useState(false);
  const [isPassword2, setIsPassword2] = useState(false);
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

  return (
    <div className="lg:min-h-screen mx-1 md:mx-0 pb-5">
      <div className=" py-2 w-full lg:max-w-[570px]">
        <GradientHeading heading={'Change Password'} />
      </div>

      <div className="w-full lg:max-w-[570px] text-12 ">
        <form className="flex flex-col gap-2 px-2" action="">
          <div className="relative w-full">
            <input
              className="border bg-white border-gray-300 w-full text-14  px-[10px] py-2 rounded-lg font-semibold text-black outline-none"
              type={!isPassword ? 'password' : 'text'}
              placeholder="Old Password"
              onChange={handleChange}
              value={form.oldPassword}
              name="oldPassword"
            />
            <span
              className="absolute top-[10px] right-[10px] text-22 text-black font-bold cursor-pointer"
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
              className="border bg-white border-gray-300 w-full text-14  px-[10px] py-2 rounded-lg font-semibold text-black outline-none"
              type={!isPassword1 ? 'password' : 'text'}
              placeholder="New Password"
              onChange={handleChange}
              value={form.newPassword}
              name="newPassword"
            />
            <span
              className="absolute top-[10px] right-[10px] text-22 text-black font-bold cursor-pointer"
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
              className="border bg-white border-gray-300 w-full text-14  px-[10px] py-2 rounded-lg font-semibold text-black outline-none"
              type={!isPassword2 ? 'password' : 'text'}
              placeholder="Repeat New Password"
              onChange={handleChange}
              value={form.confirmPassword}
              name="confirmPassword"
            />
            <span
              className="absolute top-[10px] right-[10px] text-22 text-black font-bold cursor-pointer"
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
          <button
            onClick={handleLoginSubmit}
            className="w-full bg-[#1E8067] text-14 text-center text-white py-1 px-4 rounded-sm"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
