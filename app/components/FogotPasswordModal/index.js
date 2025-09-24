import { isYupError, parseYupError } from '@/utils/Yup';
import { postData, setAuthCookie } from '@/utils/apiHandlers';
import { loginValidation } from '@/utils/validation';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { reactIcons } from '@/utils/icons';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { closeModal, openModal } from '@/redux/Slices/modalSlice';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: '#1E8067',
  // border: '2px solid #000',
  // boxShadow: 24,
  outline: 'none',
  p: 0,
  borderRadius: '10px',
};

const ForgotPasswordModal = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
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

        handleClose();
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
    <div className="">
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: '#8f8f8f',
        }}
      >
        <Box sx={style}>
          <div className="">
            <button
              onClick={handleClose}
              className="absolute top-2 z-20 right-2  text-black font-bold text-2xl cursor-pointer bg-[#f4d821] rounded"
            >
              {reactIcons.close}
            </button>
            <div className="flex flex-col gap-2 relative px-[10px] py-7">
              <div className="mx-auto">
                <img src="/images/lotusLogo.jpg" className="h-[30px]" alt="" />
              </div>
              <h1 className="text-center text-20 font-bold text-white ">
                Forget Password
              </h1>

              <form action="">
                <div className="flex items-center gap-4">
                  <div className="border-b-2 border-[#f4d821] pb-1">
                    <select
                      onChange={handleChange}
                      value={form?.username}
                      name="dialCode"
                      placeholder="Enter User Id*"
                      className="text-16 font-medium text-white bg-transparent placeholder:text-white outline-none"
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
                  <div className="border-b-2 border-[#f4d821] pb-1 w-full relative">
                    <input
                      type="number"
                      onChange={handleChange}
                      value={form?.username}
                      name="username"
                      placeholder="Enter Mobile Number*"
                      className="text-16 font-medium text-white bg-transparent placeholder:text-white outline-none w-full"
                    />
                    <span
                      onClick={() => setOtpSent(true)}
                      className="absolute bottom-2 right-[10px] flex items-center justify-center py-1 px-3 rounded-md bg-[#F4D821] text-black text-14"
                    >
                      GET OTP
                    </span>
                  </div>
                </div>
                {formError?.mobile && (
                  <p className="text-red-600 text-12">{formError?.mobile}</p>
                )}
                {otpSent && (
                  <div className="border-b-2 border-[#f4d821] pb-1 mt-4 relative">
                    <input
                      type="number"
                      onChange={handleChange}
                      value={form?.otp}
                      name="otp"
                      placeholder="Enter OTP*"
                      className="text-16 font-medium text-white pl-6 bg-transparent placeholder:text-white outline-none"
                    />
                    <span className="ay-center left-0 text-lg text-gray-300 cursor-pointer">
                      {reactIcons.key}
                    </span>
                  </div>
                )}
                <div className="border-b-2 border-[#f4d821] pb-1 mt-4 relative">
                  <input
                    type={!isPassword ? 'password' : 'text'}
                    onChange={handleChange}
                    value={form?.password}
                    name="password"
                    placeholder="Enter Password*"
                    className="text-16 font-medium pl-6 text-white bg-transparent placeholder:text-white outline-none"
                  />
                  <span className="ay-center left-0 text-lg text-gray-300 cursor-pointer">
                    {reactIcons.newLock}
                  </span>
                  <span
                    className="ay-center right-[10px] text-22 text-gray-300 cursor-pointer"
                    onClick={() => setIsPassword(!isPassword)}
                  >
                    {isPassword ? reactIcons.eye : reactIcons.eyeSlash}
                  </span>
                </div>
                <div className="border-b-2 border-[#f4d821] pb-1 mt-4 relative">
                  <input
                    type={!isConfirmPassword ? 'password' : 'text'}
                    onChange={handleChange}
                    value={form?.confirmPassword}
                    name="confirmPassword"
                    placeholder="Enter Confirm Password*"
                    className="text-16 font-medium text-white pl-6 bg-transparent placeholder:text-white outline-none"
                  />
                  <span className="ay-center left-0 text-lg text-gray-300 cursor-pointer">
                    {reactIcons.newLock}
                  </span>
                  <span
                    className="ay-center right-[10px] text-22 text-gray-300 cursor-pointer"
                    onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                  >
                    {isConfirmPassword ? reactIcons.eye : reactIcons.eyeSlash}
                  </span>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex items-center mt-4 w-full justify-center py-2 rounded-md bg-[#F4D821] text-black text-14 font-medium"
                >
                  Update Password
                </button>

                <p className="underline my-2 text-14  text-center text-white">
                  Remember your password?{' '}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(closeModal());
                      dispatch(openModal('login'));
                    }}
                    className="underline text-[#f4d821]"
                  >
                    Login
                  </span>
                </p>

                <p className="underline text-14 my-2 text-center text-white">
                  Create New Account
                </p>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

ForgotPasswordModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ForgotPasswordModal;
