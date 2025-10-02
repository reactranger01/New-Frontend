import * as Yup from 'yup';
import * as yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const loginValidation = Yup.object().shape({
  username: Yup.string().required('Please enter username'),
  password: Yup.string().required('Please enter password'),
});
export const otpValidationSchema = Yup.object().shape({
  // username: Yup.string()
  //   // .required('Username is required')
  //   .min(3, 'Username must be at least 3 characters long'),

  // password: Yup.string()
  //   .required('Password is required')
  //   .min(6, 'Password must be at least 6 characters long'),

  mobile: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
});

// Register Validation Schema
export const registerValidation = Yup.object().shape({
  username: Yup.string(),
  // .required('Username is required')
  // .min(3, 'Username must be at least 3 characters long'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),

  mobile: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),

  otp: Yup.string()
    .required('OTP is required')
    .matches(/^[0-9]{4,6}$/, 'OTP must be 4 to 6 digits'),
});

// Optional: Referral Code Validation
export const referralCodeValidation = Yup.object().shape({
  referralCode: Yup.string()
    .optional()
    .min(4, 'Referral code must be at least 4 characters long'),
});
export const resetPasswordValidation = Yup.object().shape({
  oldpassword: Yup.string().required('Please enter your old password'),
  newpassword: Yup.string()
    .required('Please enter password')
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password cannot be more than 15 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .notOneOf(
      [Yup.ref('oldpassword')],
      'New password cannot be the same as the old password',
    ),
  confirmpassword: Yup.string()
    .oneOf(
      [Yup.ref('newpassword'), null],
      'Confirm password must match new password',
    )
    .required('Please confirm your new password'),
});
export const signupSchema = Yup.object().shape({
  firstname: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters'),

  lastname: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters'),

  mobilenumber: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
});

export const userChangePasswordValidation = Yup.object().shape({
  oldPassword: Yup.string().required('Please enter old password'),
  newPassword: yup
    .string()
    .required('Please enter password')
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password cannot be more than 15 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .required('Please enter confirm password')
    .oneOf([Yup.ref('newPassword')], 'Passwords not matched'),
});

export const amountValidation = yup.object().shape({
  amount: yup
    .number()
    .required('Please enter amount')
    .min(100, 'Amount should not be more than 100')
    .max(200000, 'Amount should not be more than 2,00,000'),
});

export const depositValidation = yup.object().shape({
  paymentMethod: yup.string().required('Please select payment method'),
  utr: yup
    .string()
    .min(6, 'UTR ID must be at least 6 characters')
    .max(12, 'UTR ID must be at most 12 characters')
    .required('Please enter UTR ID'),
  img: yup.string().required('Please select image'),
  amount: yup
    .number()
    .required('Please enter amount')
    .min(100, 'Amount should not be more than 100')
    .max(200000, 'Amount should not be more than 2,00,000'),
  condition: yup
    .boolean()
    .oneOf([true], 'Please accept the Terms and Conditions'),
});

export const addAccountValidation = yup.object().shape({
  bankName: yup
    .string()
    .required('Please select bank name')
    .max(60, 'Bank name must be at most 60 characters long'),
  acountholdername: yup
    .string()
    .required('Please enter account holder name')
    .min(2, 'Account holder name must be at least 2 characters long')
    .max(50, 'Account holder name must be at most 50 characters long'),
  ifscCode: yup
    .string()
    .required('Please enter IFSC code')
    .min(4, 'Ifsc Code must be at least 4 characters long')
    .max(20, 'Ifsc Code must be at most 20 characters long'),

  // accountType: yup.string().required('Please select type'),
  accountNumber: yup
    .string()
    .required('Please enter account number')
    .min(4, 'Acount number must be at least 4 characters long')
    .max(20, 'Account number must be at most 20 characters long'),
  withdrawPassword: Yup.string().required('Please enter withdraw password'),
});
export const addUpiValidation = yup.object().shape({
  upiName: yup
    .string()
    .min(3, 'UPI Name must be at least 3 characters')
    .required('Please enter name')
    .max(50, 'UPI Name must be at most 50 characters long'),
  upiId: yup
    .string()
    .required('Please enter UPI id')
    .matches(/@/, 'UPI id must contain @ symbol')
    .min(3, 'UPI id must be at least 3 characters long')
    .max(50, 'UPI id must be at most 50 characters long'),
  phonenumber: yup
    .number()
    .required('Please enter phone number')
    .typeError('Phone number must be a number')
    .test('len', 'Phone number must be exactly 10 digits', (value) => {
      return value && value.toString().length === 10;
    }),
});
export const betValidationSchema = yup.object().shape({
  stake: yup
    .number()
    .required('Stake is required')
    .min(
      yup.ref('minimumBet'),
      ({ min }) => `Stake cannot be less than the minimum bet of ${min}`,
    )
    .max(
      yup.ref('maximumBet'),
      ({ max }) => `Stake cannot be more than the maximum bet of ${max}`,
    ),
  minimumBet: yup.number().required(),
  maximumBet: yup.number().required(),
});
