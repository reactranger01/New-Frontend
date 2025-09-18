import { isYupError, parseYupError } from '@/utils/Yup';
import { postData, setAuthCookie } from '@/utils/apiHandlers';
import { loginValidation } from '@/utils/validation';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { reactIcons } from '@/utils/icons';
import { CustomInput } from '@/components';

const LoginForm = ({ onClose }) => {
  const [isPassword, setIsPassword] = useState(false);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
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
      console.log(response, 'ress');
      if (response?.status === 200 && response?.data?.data?.ut === 'USER') {
        setAuthCookie();
        Cookies.set('__users__isLoggedIn', response?.data?.data?.token);
        localStorage.setItem(
          '__users__isLoggedIn',
          response?.data?.data?.token,
        );
        toast.success('Login Successfully');
        // localStorage.setItem(
        //   'isPasswordChanged',
        //   response?.data?.isPasswordChanged,
        // );
        // const isPasswordChanged = response?.data?.data?.isPasswordChanged;
        // localStorage.setItem(
        //   'isPasswordChanged',
        //   isPasswordChanged ? 'true' : 'false',
        // );
        // if (isPasswordChanged === false) {
        //   navigate(
        //     response?.data?.data?.isPasswordChanged
        //       ? '/'
        //       : '/dashboard/change-password-first',
        //   );
        // }
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
    <>
      <div className="flex flex-col gap-5">
        <CustomInput
          label="Username"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          error={formError.username}
          classname="bg-white text-black"
          placeHolder="Username"
        />
        <div className="relative">
          <CustomInput
            label="Password"
            type={!isPassword ? 'password' : 'text'}
            name="password"
            value={form.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={formError.password}
            classname="bg-white text-black"
            placeHolder="Password"
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
          Login
        </button>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginForm;
