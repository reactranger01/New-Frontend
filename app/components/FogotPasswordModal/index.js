import { postReq } from '@/utils/apiHandlers';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { reactIcons } from '@/utils/icons';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { closeModal, openModal } from '@/redux/Slices/modalSlice';
import { useDispatch } from 'react-redux';
import {
  forgotPassValidationSchema,
  otpValidationSchema,
  otpVerifyValidation,
} from '@/utils/validation';
import { isYupError, parseYupError } from '@/utils/Yup';

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
  const [isPassword, setIsPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [form, setForm] = useState({
    dialCode: '91',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState({});

  const [resetOtpTimer, setResetOtpTimer] = useState(false);
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isOtpSent) {
      setIsOtpButtonDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  useEffect(() => {
    resetOtpTimer === true ? setTimer(120) : setTimer(0);
  }, [resetOtpTimer]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'mobile') {
      value = value.replace(/\D/g, '');
    }

    setForm({
      ...form,
      [name]: value,
    });

    setFormError({
      ...formError,
      [name]: '',
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const validationPayload = {
        mobile: form?.mobile,
      };

      await otpValidationSchema.validate(validationPayload, {
        abortEarly: false,
      });
      const payload = { phoneNumber: form?.dialCode + form?.mobile };
      const response = await postReq('/user/forgot-password', payload);
      if (response?.status) {
        setIsOtpSent(true);
        setIsOtpButtonDisabled(true);
        setResetOtpTimer(true);
        toast.success(response?.data?.data?.message);
      } else {
        toast.error(response?.error?.error || 'Internal Server Error');
      }
    } catch (error) {
      console.log(error);
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        toast.dismiss();
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        mobile: form?.mobile,
        otp: form?.otp,
        // password: form?.password,
        // confirmPassword: form?.confirmPassword,
      };
      await otpVerifyValidation.validate(payload, {
        abortEarly: false,
      });
      const data = {
        ...payload,
        phoneNumber: form?.dialCode + form?.mobile,
      };
      const response = await postReq('/user/verify-otp', data);
      if (response?.status) {
        toast.success(response?.data?.data?.message);
        setIsOtpVerified(true);
      } else if (response?.error) {
        toast.error(response?.error?.message || 'Invalid OTP');
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

  const finalSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Loading...');

    try {
      const payload = {
        mobile: form?.mobile,
        otp: form?.otp,
        password: form?.password,
        confirmPassword: form?.confirmPassword,
      };
      await forgotPassValidationSchema.validate(payload, {
        abortEarly: false,
      });
      const data = {
        phoneNumber: form?.dialCode + form?.mobile,
        otp: form?.otp,
        password: form?.password,
        confirmPassword: form?.confirmPassword,
      };
      const response = await postReq('/user/reset-password', data);

      if (response.status) {
        toast.success('Password reset successfully');
        dispatch(closeModal());
        dispatch(openModal('login'));
      } else {
        toast.error(response?.error?.message || response?.error?.error);
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        toast.dismiss();
        toast.error(error?.message || 'Unauthorised');
      }
    } finally {
      toast.dismiss(toastId);
    }
  };
  const handleResendOtp = async (e) => {
    e.preventDefault();
    setResetOtpTimer(false);
    handleSendOtp(e);
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

              <form>
                <div className="flex items-center gap-4">
                  <div className="border-b-2 border-[#f4d821] pb-1">
                    <select
                      onChange={handleChange}
                      value={form?.username}
                      name="dialCode"
                      disabled={isOtpVerified}
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
                      type="text"
                      onChange={handleChange}
                      value={form?.mobile}
                      name="mobile"
                      disabled={isOtpVerified}
                      maxLength={10}
                      placeholder="Enter Mobile Number*"
                      className="text-16 font-medium text-white bg-transparent placeholder:text-white outline-none w-full"
                    />
                    {!isOtpSent && (
                      <span
                        onClick={handleSendOtp}
                        disabled={isOtpButtonDisabled}
                        className="absolute bottom-2 right-[10px] flex items-center justify-center py-1 px-3 rounded-md bg-[#F4D821] text-black text-14"
                      >
                        GET OTP
                      </span>
                    )}
                  </div>
                </div>
                {formError?.mobile && (
                  <p className="text-red-600 text-12">{formError?.mobile}</p>
                )}
                {isOtpSent && (
                  <>
                    <div className="flex items-center mt-2 justify-between leading-3 text-white font-lato text-12 mb-2">
                      <span>
                        Time Remaining{' '}
                        {String(Math.floor(timer / 60)).padStart(2, '0')}:
                        {String(timer % 60).padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        // disabled={timer > 0 || isOtpButtonDisabled}
                        className={`${
                          timer > 0 ? 'pointer-events-none opacity-80' : ''
                        } font-lato font-semibold text-12 leading-3 !text-red-600`}
                      >
                        Not received otp?{' '}
                        <span className="text-white hover:border-b !pb-[1px]">
                          Resend
                        </span>
                      </button>
                    </div>
                    <div className="border-b-2 border-[#f4d821] pb-1 mt-4 relative">
                      <input
                        type="number"
                        onChange={handleChange}
                        value={form?.otp}
                        name="otp"
                        disabled={isOtpVerified}
                        placeholder="Enter OTP*"
                        className="text-16 font-medium text-white pl-6 bg-transparent placeholder:text-white outline-none"
                      />
                      <span className="ay-center left-0 text-lg text-gray-300 cursor-pointer">
                        {reactIcons.key}
                      </span>
                    </div>
                    {formError?.otp && (
                      <p className="text-red-600 text-12">{formError?.otp}</p>
                    )}
                  </>
                )}
                {!isOtpVerified ? (
                  <button
                    type="submit"
                    disabled={!isOtpSent}
                    onClick={(e) => handleVerifyOtp(e)}
                    className="flex items-center mt-4 w-full justify-center py-2 rounded-md bg-[#F4D821] disabled:bg-opacity-50 text-black text-14 font-medium"
                  >
                    Verify Otp
                  </button>
                ) : (
                  <>
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
                    {formError?.password && (
                      <p className="text-red-600 text-12">
                        {formError?.password}
                      </p>
                    )}
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
                        {isConfirmPassword
                          ? reactIcons.eye
                          : reactIcons.eyeSlash}
                      </span>
                    </div>
                    {formError?.confirmPassword && (
                      <p className="text-red-600 text-12">
                        {formError?.confirmPassword}
                      </p>
                    )}
                    <button
                      type="submit"
                      onClick={(e) => finalSubmit(e)}
                      className="flex items-center mt-4 w-full justify-center py-2 rounded-md bg-[#F4D821] text-black text-14 font-medium"
                    >
                      Update Password
                    </button>
                  </>
                )}

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
