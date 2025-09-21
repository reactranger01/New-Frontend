import { isYupError, parseYupError } from '@/utils/Yup';
import { postData, setAuthCookie } from '@/utils/apiHandlers';
import { loginValidation } from '@/utils/validation';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { reactIcons } from '@/utils/icons';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '@/redux/Slices/modalSlice';

const LoginForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('otp');
  const [isPassword, setIsPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('mobile');
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [formError, setFormError] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };
  const handleDemoLogin = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      const response = await postData('/user/create-demo-user');
      if (
        response?.status === 200 &&
        (response?.data?.data?.ut === 'USER' ||
          response?.data?.data?.ut === 'DEMO')
      ) {
        setAuthCookie();
        Cookies.set('__users__isLoggedIn', response?.data?.data?.token);
        localStorage.setItem(
          '__users__isLoggedIn',
          response?.data?.data?.token,
        );
        toast.success('Login Successfully');

        onClose();
        window.location.reload();
      } else if (
        response?.status === 200 &&
        (response?.data?.data?.ut !== 'USER' ||
          response?.data?.data?.ut !== 'DEMO')
      ) {
        toast.error('User not found');
      } else {
        toast.dismiss();
        toast.error(response?.data?.error || 'Something went wrong');
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        toast.dismiss();
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await loginValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postData('/user/signin', form);
      if (response?.status === 200 && response?.data?.data?.ut === 'USER') {
        setAuthCookie();
        Cookies.set('__users__isLoggedIn', response?.data?.data?.token);
        localStorage.setItem(
          '__users__isLoggedIn',
          response?.data?.data?.token,
        );
        toast.success('Login Successfully');
        window.location.reload();

        onClose();
      } else if (
        response?.status === 200 &&
        response?.data?.data?.ut !== 'USER'
      ) {
        toast.error('User not found');
      } else {
        toast.dismiss();
        toast.error(response?.data?.error || 'Something went wrong');
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        toast.dismiss();
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 relative px-[10px] py-7">
      <div className="mx-auto">
        <img src="/images/lotusLogo.jpg" className="h-[30px]" alt="" />
      </div>
      <h1 className="text-center text-20 font-bold text-white ">Login Now</h1>
      <div className="grid grid-cols-2 border border-[#F4D821] rounded-md mb-4">
        <div
          onClick={() => setActiveTab('mobile')}
          className={` flex items-center justify-center gap-2 py-2  ${
            activeTab === 'mobile' ? 'bg-[#F4D821] text-black' : 'text-white'
          }   text-14 font-medium cursor-pointer`}
        >
          <span
            className={`${
              activeTab === 'mobile' ? 'text-black' : 'text-gray-400'
            } text-lg `}
          >
            {' '}
            {reactIcons.mobile}
          </span>
          Mobile Number
        </div>
        <div
          onClick={() => setActiveTab('userId')}
          className={` flex items-center justify-center gap-2 py-2  ${
            activeTab === 'userId' ? 'bg-[#F4D821] text-black' : 'text-white'
          }   text-14 font-medium cursor-pointer`}
        >
          <span
            className={`${
              activeTab === 'userId' ? 'text-black' : 'text-gray-400'
            } text-lg`}
          >
            {' '}
            {reactIcons.user}
          </span>
          User ID
        </div>
      </div>
      <form className="">
        {activeTab === 'mobile' ? (
          <>
            <div className="flex items-center gap-4">
              <div className="border-b-2 border-[#f4d821] pb-1">
                <select
                  onChange={handleChange}
                  value={form?.username}
                  name="dialCode"
                  placeholder="Enter User Id*"
                  className="text-16 font-medium text-white bg-transparent outline-none"
                >
                  <option className="text-black" value="+91">
                    +91
                  </option>
                  <option className="text-black" value="+880">
                    +880
                  </option>
                  <option className="text-black" value="+971">
                    +971
                  </option>
                  <option className="text-black" value="+977">
                    +977
                  </option>
                  <option className="text-black" value="+92">
                    +92
                  </option>
                </select>
              </div>
              <div className="border-b-2 border-[#f4d821] pb-1 w-full">
                <input
                  type="number"
                  onChange={handleChange}
                  value={form?.username}
                  name="username"
                  placeholder="Enter Mobile Number*"
                  className="text-16 font-medium text-white bg-transparent outline-none w-full"
                />
              </div>
            </div>
            {formError?.mobile && (
              <p className="text-red-600 text-12">{formError?.mobile}</p>
            )}

            <div className="flex items-center gap-4  py-2 rounded">
              {/* Password Option */}
              <label className="flex items-center gap-2 cursor-pointer text-white  text-14">
                <input
                  type="radio"
                  value="password"
                  checked={selected === 'password'}
                  onChange={(e) => setSelected(e.target.value)}
                  className="hidden"
                />
                <span
                  className={`w-3 h-3 rounded-full bg-white border-2 flex items-center justify-center ${
                    selected === 'password'
                      ? 'border-yellow-400'
                      : 'border-white'
                  }`}
                ></span>
                Password
              </label>

              {/* OTP Option */}
              <label className="flex items-center gap-2 cursor-pointer text-white text-14 ">
                <input
                  type="radio"
                  value="otp"
                  checked={selected === 'otp'}
                  onChange={(e) => setSelected(e.target.value)}
                  className="hidden"
                />
                <span
                  className={`w-3 h-3 rounded-full bg-white border-2 flex items-center justify-center ${
                    selected === 'otp' ? 'border-yellow-400' : 'border-white'
                  }`}
                ></span>
                OTP
              </label>
            </div>

            {selected === 'password' ? (
              <>
                <div className="border-b-2 border-[#f4d821] pb-1  relative">
                  <input
                    type={!isPassword ? 'password' : 'text'}
                    onChange={handleChange}
                    value={form?.password}
                    name="password"
                    placeholder="Enter Password*"
                    className="text-16 font-medium text-white bg-transparent outline-none"
                  />
                  <span
                    className="ay-center right-[10px] text-22 text-gray-300 cursor-pointer"
                    onClick={() => setIsPassword(!isPassword)}
                  >
                    {isPassword ? reactIcons.eye : reactIcons.eyeSlash}
                  </span>
                </div>
                {formError?.password && (
                  <p className="text-red-600 text-12">{formError?.password}</p>
                )}
              </>
            ) : (
              <>
                <div className="border-b-2 border-[#f4d821] pb-1  relative">
                  <input
                    type="number"
                    onChange={handleChange}
                    value={form?.otp}
                    name="otp"
                    placeholder="Enter OTP*"
                    className="text-16 font-medium text-white bg-transparent outline-none"
                  />

                  <span className="absolute bottom-2 right-[10px] flex items-center justify-center py-1 px-3 rounded-md bg-[#F4D821] text-black text-14">
                    GET OTP
                  </span>
                </div>
                {formError?.password && (
                  <p className="text-red-600 text-12">{formError?.password}</p>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {' '}
            <div className="border-b-2 border-[#f4d821] pb-1">
              <input
                type="text"
                onChange={handleChange}
                value={form?.username}
                name="username"
                placeholder="Enter User Id*"
                className="text-16 font-medium text-white bg-transparent outline-none"
              />
            </div>
            {formError?.username && (
              <p className="text-red-600 text-12">{formError?.username}</p>
            )}
            <div className="border-b-2 border-[#f4d821] pb-1 mt-4 relative">
              <input
                type={!isPassword ? 'password' : 'text'}
                onChange={handleChange}
                value={form?.password}
                name="password"
                placeholder="Enter Password*"
                className="text-16 font-medium text-white bg-transparent outline-none"
              />
              <span
                className="ay-center right-[10px] text-22 text-gray-300 cursor-pointer"
                onClick={() => setIsPassword(!isPassword)}
              >
                {isPassword ? reactIcons.eye : reactIcons.eyeSlash}
              </span>
            </div>
            {formError?.password && (
              <p className="text-red-600 text-12">{formError?.password}</p>
            )}
          </>
        )}
        <div className="flex justify-end items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(closeModal());
              dispatch(openModal('forgot-password'));
            }}
            className="ml-auto underline text-14 my-1 text-right text-white"
          >
            Forgot Password?
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="flex items-center justify-center py-2 rounded-md bg-[#F4D821] text-black text-14 font-medium"
          >
            Login with Demo Id
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center justify-center py-2 rounded-md bg-[#F4D821] text-black text-14 font-medium"
          >
            Log In
          </button>
        </div>
        <p className="my-1 text-14 text-white text-center">
          Or Continue With Whatsapp
        </p>
        <button
          type="button"
          className="flex w-full text-white items-center font-semibold text-16 justify-center gap-2 py-2 rounded-md bg-[#4caf50]  "
        >
          {reactIcons.whatsapp} Whatsapp Now
        </button>

        <div className="flex items-center justify-between my-2 gap-5 text-white">
          <div className="signUpNew-separator-rightLine"></div>
          <div className="text-[13px] font-semibold">or Login With</div>
          <div className="signUpNew-separator-leftLine"></div>
        </div>

        <div className="my-2 flex items-center justify-center gap-4">
          <img
            src="/images/fbIcon.webp"
            className="h-6 w-6 rounded-full"
            alt=""
          />
          <img
            src="/images/instaIcon.webp"
            className="h-6 w-6 rounded-full"
            alt=""
          />
          <img
            src="/images/teleIcon.webp"
            className="h-6 w-6 rounded-full"
            alt=""
          />
        </div>
        <p className="underline my-2 text-14  text-center text-white">
          Don&apos;t have an account{' '}
          <span
            onClick={(e) => {
              e.preventDefault();
              dispatch(closeModal());
              dispatch(openModal('register'));
            }}
            className="underline text-[#f4d821] cursor-pointer"
          >
            Register
          </span>
        </p>
        <div className="flex-center my-2">
          <img
            src="/images/emailIcon.webp"
            className="w-9 h-9 rounded-full"
            alt=""
          />
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginForm;
