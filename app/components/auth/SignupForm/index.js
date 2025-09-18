import React, { useState } from 'react';
import { signupSchema } from '@/utils/validation';
import { postReq } from '@/utils/apiHandlers';
import { isYupError, parseYupError } from '@/utils/Yup';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobilenumber: '',
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupSchema.validate(formData, { abortEarly: false });
      // eslint-disable-next-line
      const response = await postReq('/api/signup', formData);
    } catch (err) {
      if (isYupError(err)) {
        setFormError(parseYupError(err));
      } else {
        console.log('Something went wrong');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        {formError.firstname && <p>{formError.firstname}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        {formError.lastname && <p>{formError.lastname}</p>}
      </div>
      <div>
        <label>Mobile Number</label>
        <input
          type="text"
          name="mobilenumber"
          value={formData.mobilenumber}
          onChange={handleChange}
        />
        {formError.mobilenumber && <p>{formError.mobilenumber}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {formError.email && <p>{formError.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {formError.password && <p>{formError.password}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
