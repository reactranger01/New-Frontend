import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { reactIcons } from '@/utils/icons';
import { CustomInput } from '@/components';
import { logout } from '@/utils/logout';
import { isYupError, parseYupError } from '@/utils/Yup';
import toast from 'react-hot-toast';
import { resetPasswordValidation } from '@/utils/validation';
import { postAuthData } from '@/utils/apiHandlers';
import { useNavigate } from 'react-router-dom';
import { getImage } from '@/utils/imagekit';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: '#0f2327',
  // border: '2px solid #000',
  // boxShadow: 24,
  outline: 'none',
  p: 2,
  borderRadius: '10px',
};

export default function UpdateModal() {
  const [isPassword, setIsPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });

  const [formError, setFormError] = useState({
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
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
      await resetPasswordValidation.validate(form, {
        abortEarly: false,
      });
      delete form.confirmpassword;
      const updatedData = {
        oldPassword: form.oldpassword,
        newPassword: form.newpassword,
      };
      // await loginValidationSchema.validate(form, { abortEarly: false });
      const response = await postAuthData(
        '/user/change-firsttime-password',
        updatedData,
      );

      if (response?.status === 200 || response?.status === 201) {
        // setAuthCookie();
        // Cookies.set('__users__isLoggedIn', response?.data.token);
        // localStorage.setItem('__users__isLoggedIn', response?.data.token);
        toast.success(
          response?.data?.message || 'Password changed successfully',
        );
        navigate('/');
        logout();
      } else {
        toast.error(response?.data || 'Something went wrong');
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
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-5 relative p-2 py-5">
            <button className="absolute top-0 right-0 text-white text-xl cursor-pointer">
              {reactIcons.close}
            </button>
            <div className="mx-auto">
              <img src={getImage('/images/logo.png')} className="h-20" alt="" />
            </div>
            <div className="flex flex-col gap-5">
              <div className="relative">
                <CustomInput
                  label="Old Password"
                  type={!isPassword ? 'password' : 'text'}
                  name="oldpassword"
                  value={form.oldpassword}
                  onChange={handleChange}
                  error={formError.oldpassword}
                  classname="bg-white text-black"
                  placeHolder="Old Password"
                />
                <button
                  className="absolute top-[10px] right-[10px] text-22 text-gray-300 cursor-pointer"
                  onClick={() => setIsPassword(!isPassword)}
                >
                  {isPassword ? reactIcons.eye : reactIcons.eyeSlash}
                </button>
              </div>
              <div className="relative">
                <CustomInput
                  label="New Password"
                  type={!isPassword ? 'password' : 'text'}
                  name="newpassword"
                  value={form.newpassword}
                  onChange={handleChange}
                  error={formError.newpassword}
                  classname="bg-white text-black"
                  placeHolder="New Password"
                />
                <button
                  className="absolute top-[10px] right-[10px] text-22 text-gray-300 cursor-pointer"
                  onClick={() => setIsPassword(!isPassword)}
                >
                  {isPassword ? reactIcons.eye : reactIcons.eyeSlash}
                </button>
              </div>
              <div className="relative">
                <CustomInput
                  label="Confirm Password"
                  type={!isPassword ? 'password' : 'text'}
                  name="confirmpassword"
                  value={form.confirmpassword}
                  onChange={handleChange}
                  error={formError.confirmpassword}
                  classname="bg-white text-black"
                  placeHolder="Confirm Password"
                />
                <button
                  className="absolute top-[10px] right-[10px] text-22 text-gray-300 cursor-pointer"
                  onClick={() => setIsPassword(!isPassword)}
                >
                  {isPassword ? reactIcons.eye : reactIcons.eyeSlash}
                </button>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex items-center justify-center py-1 gap-2 bg-[#183f45] text-white "
              >
                Reset Password
                {/* <p className="animate-spin w-fit">{reactIcons.refresh}</p> */}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
