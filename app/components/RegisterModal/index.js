import { isYupError, parseYupError } from '@/utils/Yup';
import { postData } from '@/utils/apiHandlers';
import { otpValidationSchema, registerValidation } from '@/utils/validation';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { reactIcons } from '@/utils/icons';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { closeModal, openModal } from '@/redux/Slices/modalSlice';
import { useDispatch } from 'react-redux';
import { getImage } from '@/utils/imagekit';

const sponsorArr = [
  {
    id: 1,
    img: '/images/registerImg1.webp',
    text: 'Diamond upgrade',
  },
  {
    id: 2,
    img: '/images/registerImg2.webp',
    text: '1 to 1 customer support',
  },
  {
    id: 3,
    img: '/images/registerImg3.webp',
    text: '24/7 instant withdrawal',
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 424,
  minWidth: '350px',
  bgcolor: '#1E8067',
  // border: '2px solid #000',
  // boxShadow: 24,
  // overflowY: 'auto',
  outline: 'none',
  p: 0,
  borderRadius: '10px',

  width: '100%',
};

const RegisterModal = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [useUserId, setUseUserID] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    mobile: '',
    dialCode: '91',
    otp: '',
  });
  const [formError, setFormError] = useState({});

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
  const handleSendOtp = async () => {
    try {
      // Validate payload first
      const validationPayload = {
        mobile: form?.mobile,
      };

      await otpValidationSchema.validate(validationPayload, {
        abortEarly: false,
      });
      const toastId = toast.loading('Sending OTP...');
      setIsOtpButtonDisabled(true);
      try {
        const payload = {
          mobile: form?.dialCode + form?.mobile,
        };
        const response = await postData(
          '/user/send-verification-code',
          payload,
        );

        if (response?.status) {
          // setResetOtpTimer(true);
          setIsOtpSent(true);
          toast.success(response?.data?.message);
        } else {
          toast.error(
            response?.error?.message ||
              response?.error?.error ||
              'Internal Server Error',
          );
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        toast.error('Something went wrong. Please try again.');
      } finally {
        setIsOtpButtonDisabled(false);
        toast.dismiss(toastId);
      }
    } catch (validationError) {
      // Handle Yup validation errors
      if (isYupError(validationError)) {
        setFormError(parseYupError(validationError));
      } else {
        toast.dismiss();
        toast.error(validationError?.message || 'Unauthorized');
      }
    }
  };

  console.log(form);
  console.log(formError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      const verifyPayload = {
        username: form?.username,
        password: form?.password,
        mobile: form?.mobile,
        otp: form?.otp,
        confirmPassword: form?.confirmPassword,
      };
      await registerValidation.validate(verifyPayload, {
        abortEarly: false,
      });
      const payload = {
        username: form?.username,
        password: form?.password,
        phoneNumber: form?.dialCode + form?.mobile,
        otp: form?.otp,
        status: true,
        confirmPassword: form?.confirmPassword,
      };
      const response = await postData('/user/register', payload);
      if (response?.status === 200) {
        toast.success('Registered Successfully');
        window.location.reload();

        handleClose();
      } else {
        toast.dismiss();
        toast.error(response?.data?.error || 'Something went wrong');
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

  return (
    <div className="">
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: '#8f8f8f',
          overflowY: 'auto',
        }}
      >
        <Box sx={style}>
          <div className="w-full">
            <button
              onClick={handleClose}
              className="absolute top-2 z-20 right-2  text-black font-bold text-2xl cursor-pointer bg-[#f4d821] rounded"
            >
              {reactIcons.close}
            </button>
            <div className="flex flex-col w-full gap-2 relative px-[10px] py-7">
              <div className="mx-auto">
                <img
                  src={getImage('/images/lotusLogo.jpg')}
                  className="h-[30px]"
                  alt=""
                />
              </div>
              <h1 className="text-center text-20 font-bold text-white mb-4 ">
                Register
              </h1>

              <form action="" className="w-full">
                <div className="flex items-center gap-4 w-full">
                  <div className="border-b-2 border-[#f4d821] pb-1">
                    <select
                      onChange={handleChange}
                      value={form?.dialCode}
                      name="dialCode"
                      className="text-16 font-medium text-white bg-transparent placeholder:text-white outline-none"
                    >
                      <option className="text-black" value="91">
                        +91
                      </option>
                      <option className="text-black" value="880">
                        +880
                      </option>
                      <option className="text-black" value="971">
                        +971
                      </option>
                      <option className="text-black" value="977">
                        +977
                      </option>
                      <option className="text-black" value="92">
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
                  <p className="text-red-500 text-12">{formError?.mobile}</p>
                )}
                {!useUserId && (
                  <div className="flex justify-end items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setUseUserID(true);
                      }}
                      className="ml-auto underline text-12 my-1 text-right text-white"
                    >
                      Want To Set UserId?
                    </button>
                  </div>
                )}
                {isOtpSent && (
                  <>
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
                    {formError?.otp && (
                      <p className="text-red-500 text-12">{formError?.otp}</p>
                    )}
                  </>
                )}
                {useUserId && (
                  <>
                    <div className="border-b-2 border-[#f4d821] pb-1 mt-2 relative">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={form?.username}
                        name="username"
                        placeholder="Enter User Id*"
                        className="text-16 font-medium pl-6 text-white placeholder:text-white bg-transparent outline-none"
                      />
                      <span className="ay-center left-0 text-lg text-gray-300 cursor-pointer">
                        {reactIcons.key}
                      </span>
                    </div>
                    {formError?.username && (
                      <p className="text-red-500 text-12">
                        {formError?.username}
                      </p>
                    )}
                  </>
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
                {formError?.password && (
                  <p className="text-red-500 text-12">{formError?.password}</p>
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
                    {isConfirmPassword ? reactIcons.eye : reactIcons.eyeSlash}
                  </span>
                </div>
                {formError?.confirmPassword && (
                  <p className="text-red-500 text-12">
                    {formError?.confirmPassword}
                  </p>
                )}
                <div className="flex justify-end items-center">
                  {/* <button
                    // onClick={(e) => {
                    //   setUseUserID(true);
                    // }}
                    className="ml-auto underline text-12 my-1 text-right text-white"
                  >
                    Have a referral code?
                  </button> */}
                </div>

                <button
                  type="submit"
                  disabled={!isOtpSent}
                  onClick={handleSubmit}
                  className="flex items-center mt-4 w-full justify-center py-2 rounded-md bg-[#F4D821] text-black text-14 font-medium disabled:opacity-50"
                >
                  Register
                </button>

                <p className="my-1 mt-2 text-14 font-medium text-white text-center">
                  Get Your Ready-Made ID From Whatsapp
                </p>
                <button
                  type="button"
                  className="flex mx-auto rounded-3xl text-white w-[80%] items-center font-semibold text-16 justify-center gap-2 py-2 bg-[#4caf50]  "
                >
                  {reactIcons.whatsapp} Whatsapp Now
                </button>

                <div className="grid grid-cols-3 gap-2 my-4 text-white">
                  {sponsorArr.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <img
                        src={getImage(item?.img)}
                        className="h-[60px] w-[60px]"
                        alt=""
                      />
                      <p className="text-[11px] leading-4">{item?.text}</p>
                    </div>
                  ))}
                </div>

                <p className="underline my-2 text-14  text-center text-white">
                  Already Have Account?{' '}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(closeModal());
                      dispatch(openModal('login'));
                    }}
                    className="underline text-[#f4d821]"
                  >
                    Log In
                  </span>
                </p>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default RegisterModal;
