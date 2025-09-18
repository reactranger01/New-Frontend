/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { reactIcons } from '@/utils/icons';
import { getAuthData, isLoggedIn, postAuthData } from '@/utils/apiHandlers';
import { isYupError, parseYupError } from '@/utils/Yup';
import { depositValidation } from '@/utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { init } from '@/redux/actions';
import moment from 'moment';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { Empty } from 'antd';
import toast from 'react-hot-toast';
import Pagination from '@/containers/Pagination';

const Deposit = () => {
  const [activeIndex, setActiveIndex] = useState();
  const [paymentType, setPaymentType] = useState('ACCOUNT');
  const [depositListData, setDepositListData] = useState([]);
  const [qrData, setQrData] = useState({});
  const [accountData, setAccountData] = useState({});
  const [selectedImage, setSelectedImage] = useState({});
  const [qrType, setQrType] = useState('');
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user);
  const login = isLoggedIn();
  const [page, setPage] = useState(1);
  const take = 15;
  const [pagination, setPagination] = useState({
    totalCount: 0,
  });

  useEffect(() => {
    dispatch(init());
  }, [dispatch, login]);

  useEffect(() => {
    if (User?.id) {
      handleChange({
        target: { name: 'userId', value: User?.id },
      });
    }
  }, [User?.id, selectedImage]);

  const [form, setForm] = useState({
    paymentMethod: '',
    utr: '',
    img: '',
    amount: '',
    condition: false,
  });

  const [formError, setFormError] = useState({
    paymentMethod: '',
    utr: '',
    img: '',
    amount: '',
    condition: false,
  });

  const stakebutton = [
    { text: '500', value: 500 },
    { text: '1000', value: 1000 },
    { text: '5000', value: 5000 },
    { text: '10000', value: 10000 },
    { text: '50000', value: 50000 },
    { text: '100000', value: 100000 },
  ];

  const rules = [
    {
      text: 'Deposit money only in the below available accounts to get the fastest credits and avoid possible delays.',
    },
    {
      text: 'Deposits made 45 minutes after the account removal from the site are valid & will be added to their wallets.',
    },
    {
      text: 'Site is not responsible for money deposited to Old, Inactive or Closed accounts.',
    },
    {
      text: 'After deposit, add your UTR and amount to receive balance.',
    },
    {
      text: 'NEFT receiving time varies from 40 minutes to 2 hours.',
    },
    {
      text: 'In case of account modification: payment valid for 1 hour after changing account details in deposit page.',
    },
  ];

  const paymentList = [
    {
      text: 'ACCOUNT',
      icon: '/images/payment/bank.svg',
      value: 'account',
    },
    { text: 'PAYTM', icon: '/images/payment/paytm.svg', value: 'Paytm' },
    { text: 'GPAY', icon: '/images/payment/gpay.svg', value: 'G-Pay' },
    {
      text: 'PHONEPE',
      icon: '/images/payment/phonepe.svg',
      value: 'Phone-Pay',
    },
  ];

  const accountDetails =
    paymentType === 'ACCOUNT'
      ? accountData?.bankName &&
        accountData?.acountholdername &&
        accountData?.accountNumber &&
        accountData?.ifscCode &&
        accountData?.accountType
        ? [
            {
              text: `Bank : ${accountData?.bankName}`,
              copy: accountData?.bankName,
            },

            {
              text: `A/c Holder Name : ${accountData?.acountholdername}`,
              copy: accountData?.acountholdername,
            },
            {
              text: `A/c No. : ${accountData?.accountNumber}`,
              copy: accountData?.accountNumber,
            },

            {
              text: `IFSC Code : ${accountData?.ifscCode}`,
              copy: accountData?.ifscCode,
            },
            {
              text: `A/c Type : ${accountData?.accountType}`,
              copy: accountData?.accountType,
            },
          ]
        : []
      : qrData?.upi
      ? [{ text: `Upi Id : ${qrData?.upi}`, copy: `${qrData?.upi}` }]
      : [];

  useEffect(() => {
    getDepositList();
    getQrCode();
    getAccountNumber();
  }, [take, page, qrType]);

  const getDepositList = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/deposits?limit=${take}&offset=${(page - 1) * take}`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setDepositListData(response.data?.deposits);
          setPagination({
            totalCount: response.data.totalCount,
          });
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  const getQrCode = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData(
          `/user/get-qr-true-status?qrtype=${
            qrType === 'account' ? '' : qrType
          }`,
        );
        if (response?.status === 201 || response?.status === 200) {
          setQrData(response.data);
        } else {
          setQrData({});
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };

  const getAccountNumber = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getAuthData('/user/get-account-true-status');
        if (response?.status === 201 || response?.status === 200) {
          setAccountData(response.data);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };

  const copieBtn = async (e) => {
    toast.success(e + ' Coppied!!');
  };

  const handleImageChange = async (event) => {
    setSelectedImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validImageTypes.includes(file?.type)) {
        const data = new FormData();
        data.append('image', event.target.files[0]);
        const image = await postAuthData('/user/uploads', data);
        if (image?.status) {
          setForm({ ...form, img: image?.data?.imageUrl });
          setFormError({ ...formError, img: '' });
        } else {
          toast.error(image?.data || 'Something went wrong!');
          setSelectedImage({});
        }
      } else {
        toast.error(
          'Invalid file type. Please select a JPEG, PNG, or JPG image.',
        );
        setSelectedImage({});
      }
    }
  };
  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    let updatedValue = type === 'checkbox' ? checked : value;
    if (name === 'amount' && value < 0) {
      updatedValue = 0;
    }
    setForm((prevCredential) => ({
      ...prevCredential,
      [name]: updatedValue,
    }));
    setFormError((prevFormError) => ({
      ...prevFormError,
      [name]: '',
    }));
  };

  const handleButtonClick = (index, type, value) => {
    setActiveIndex(index);
    setPaymentType(type);
    setQrType(value);
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await depositValidation.validate(form, {
        abortEarly: false,
      });
      if (form.condition) {
        const newData = { ...form };
        delete newData.condition;
        const response = await postAuthData('/user/create-deposit', newData);
        if (response?.status === 200 || response?.status === 201) {
          toast.success('Deposit Request Sent Successfully');
          setForm({
            paymentMethod: '',
            utr: '',
            img: '',
            amount: '',
            condition: false,
          });
          setActiveIndex();
          setPaymentType('ACCOUNT');
          getDepositList();
          setSelectedImage({});
        } else if (response?.status !== 200 && response?.status !== 201) {
          const errorMessage = response?.data?.error || 'Something went wrong';
          toast.error(errorMessage);
        }
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
    <>
      <div className=" md:border-b border-black py-2 mt-3 mx-1 md:mx-0 mb-2 md:mb-0">
        <h1 className="text-18 md:text-24 mt-4 md:mt-0">Deposit</h1>
      </div>
      <div className="border rounded-lg p-2 sm:p-5 -mt-2 md:mt-5 md:my-5 bg-white mx-1 md:mx-0">
        <div className="my-5 mt-2 md:mt-5 border-y border-dashed p-5">
          <ul className="flex flex-col gap-1 list-decimal list-outside">
            {rules.map((item, index) => (
              <li className=" text-14" key={index}>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex flex-wrap items-center px-3 sm:px-6 py-3 gap-1 sm:gap-3 xl:gap-3 bg-white rounded-b-20 border-l border-l-primary-900/30 border-r border-r-primary-900/30  border-b-8 border-b-primary-900/30">
          {paymentList.map((item, index) => (
            <button
              className={`rounded-xl h-[60px] md:h-[72px] w-[65px] sm:w-[85px] border border-[#B2E0FF] p-1 sm:p-2 flex justify-between items-center text-black ${
                activeIndex === index
                  ? 'bg-[#181E2C] text-white'
                  : 'bg-primary-900/[.2]'
              } flex-col md:gap-2`}
              key={index}
              onClick={() => {
                handleButtonClick(index, item.text, item.value);
                handleChange({
                  target: { name: 'paymentMethod', value: item.value },
                });
              }}
            >
              <span className="xl:text-16 md:text-14 text-12">{item.text}</span>
              <img src={item.icon} className="object-contain" alt="" />
            </button>
          ))}
          {formError.paymentMethod && (
            <div className="form-eror text-center xl:text-16 text-12">
              {formError.paymentMethod}
            </div>
          )}{' '}
        </div>

        <div className="mt-5 bg-white text-black rounded-lg p-3 sm:p-6 relative">
          <h1 className="capitalize underline xl:text-24 md:text-20 text-18 font-semibold text-center">
            {paymentType}
          </h1>

          <div className="grid md:grid-cols-11 grid-cols-none gap-3 my-3 md:my-5">
            <div className="col-span-5">
              <div className="rounded-lg bg-primary-900/30 px-3 p-1 ">
                {accountDetails.length !== 0 ? (
                  <>
                    {' '}
                    {accountDetails.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center my-1 md:my-2 gap-2"
                      >
                        <p className="xl:text-16 text-14">{item.text}</p>
                        <CopyToClipboard text={item.copy}>
                          <span
                            className="cursor-pointer"
                            onClick={() => copieBtn(item.copy)}
                          >
                            {reactIcons.copy}
                          </span>
                        </CopyToClipboard>
                      </div>
                    ))}
                    <p className="my-1 md:my-2 xl:text-16 text-14">
                      Min Amount : 100 Rs.
                    </p>
                    <p className="my-1 md:my-2 xl:text-16 text-14">
                      Max Amount : 200000 Rs.
                    </p>
                    {paymentType !== 'ACCOUNT' && (
                      <div className="bg-white rounded-2xl p-2 relative mx-auto w-[150px] sm:w-[170px] aspect-square my-5">
                        <p className="absolute bottom-12 -left-9 ml-1 -rotate-90 text-12">
                          {qrData?.upi}
                        </p>
                        <img
                          src={qrData?.image}
                          className="sm:w-full w-[120px] mx-auto mt-2 sm:mt-0"
                          alt=""
                        />
                      </div>
                    )}{' '}
                  </>
                ) : (
                  <div className="flex justify-center items-center h-[80px]">
                    <p className="my-1 md:my-2 text-red-700 xl:text-16 text-14">
                      Not Added Any Account Yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1 flex justify-center">
              <div className="w-[1px] h-full bg-primary-900/20"></div>
            </div>
            <div className="col-span-5">
              <div className="">
                <label
                  htmlFor="utr"
                  className="text-primary-100 flex text-start xl:text-16 text-14"
                >
                  Unique Transaction Reference{' '}
                  <span className="text-primary-red">*</span>
                </label>
                <div className="rounded-md overflow-hidden h-[48px] mt-1">
                  <input
                    name="utr"
                    placeholder={'6 to 12 Digit UTR Number'}
                    id="utr"
                    value={form.utr}
                    onChange={handleChange}
                    className="placeholder:text-black w-full h-full bg-primary-900/30 rounded-md text-black outline-none px-4 xl:text-16 text-14"
                  />
                </div>
                {formError.utr && (
                  <div className="form-eror xl:text-16 text-14">
                    {formError.utr}
                  </div>
                )}
              </div>
              <div className="my-3">
                <label
                  htmlFor="file"
                  className="text-primary-100 flex text-start xl:text-16 text-14"
                >
                  Upload Your Payment Proof{' '}
                </label>
                <label className="block mt-2">
                  <input
                    id="file"
                    type="file"
                    onChange={handleImageChange}
                    className="block w-[120px] xl:file:h-[42px] file:h-[35px] leading-5 text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-primary-700 file:text-white hover:file:bg-primary-700 file:border-0 xl:text-16 text-14"
                  />
                </label>
                {selectedImage && (
                  <div className="text-black truncate xl:text-14 text-12">
                    {selectedImage?.name}
                  </div>
                )}
                {formError.img && (
                  <div className="form-eror xl:text-16 text-14">
                    {formError.img}
                  </div>
                )}
              </div>
              <div className="">
                <label
                  htmlFor="amount"
                  className="text-primary-100 flex text-start xl:text-16 text-14"
                >
                  Amount
                  <span className="text-primary-red">*</span>
                </label>
                <div className="rounded-md overflow-hidden h-[48px] mt-1">
                  <input
                    type="number"
                    name="amount"
                    placeholder={'Enter amount'}
                    id="amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="placeholder:text-black w-full h-full bg-primary-900/30 rounded-md text-black outline-none px-4 xl:text-16 text-14"
                  />
                </div>
                {formError.amount && (
                  <div className="form-eror xl:text-16 text-14">
                    {formError.amount ==
                    'amount must be a `number` type, but the final value was: `NaN` (cast from the value `""`).'
                      ? 'Please Enter Amount'
                      : formError.amount}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-5">
                {stakebutton.map((item, index) => (
                  <button
                    key={index}
                    className="col-span-1  text-white xl:h-[42px] h-[35px] rounded-lg flex-center bg-[#4283ca] xl:text-16 text-14"
                    onClick={() => {
                      handleChange({
                        target: { name: 'amount', value: item.value },
                      });
                    }}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
              <div className="flex items-start justify-start gap-2 mt-4">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-primary-red"
                  name="condition"
                  checked={form.condition}
                  onChange={handleChange}
                  id="odds"
                />
                <label htmlFor="odds" className="leading-5 xl:text-14 text-14">
                  I have read and agree with terms of payment and withdrawal
                  policy.
                </label>
              </div>
              {formError.condition && (
                <div className="form-eror xl:text-16   text-14">
                  {formError.condition}
                </div>
              )}
              <button
                onClick={handleDepositSubmit}
                className="btn rounded-lg mt-5 bg-green-600 h-8 md:h-12 w-full text-14 font-medium"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto theme-scroller">
          <table className="w-full min-w-[650px] ">
            <thead>
              <tr className="bg-gray-200 text-black w-full border-b border-b-primary-200 divide-primary-600 xl:text-16 text-14">
                <th className="rounded-tl-lg w-[70px] pl-4 pr-0">
                  <div className="border-r border-r-black xl:text-16 text-14">
                    SN.
                  </div>
                </th>{' '}
                <th className="w-[130px] pl-4 pr-0">
                  <div className="border-r border-r-black xl:text-14 text-14">
                    Amount
                  </div>
                </th>
                <th className="px-0 w-[130px]">
                  <div className="border-r border-r-black xl:text-14 text-14">
                    Status
                  </div>
                </th>
                <th className="px-0 w-[180px]">
                  <div className="border-r border-r-black xl:text-14 text-14">
                    Date
                  </div>
                </th>
                <th className="px-0">
                  <div className="border-r border-r-black xl:text-14 text-14">
                    Utr
                  </div>
                </th>
                <th className="rounded-tr-lg pl-0">
                  <div className="xl:text-14 text-14">Payment Method</div>
                </th>
              </tr>
            </thead>
            <tbody className="max-h-[400px] overflow-y-auto theme-scroller">
              {depositListData?.length === 0 ? (
                <tr className="h-[42px] w-full">
                  <td colSpan={6}>
                    <div className="text-center flex-center h-[140px]">
                      <Empty />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {' '}
                  {depositListData &&
                    depositListData?.map((items, index) => (
                      <tr
                        key={index}
                        className=" bg-white text-black text-center"
                      >
                        <td className="w-[70px] text-center  text-12">
                          {index + 1}
                        </td>{' '}
                        <td className="px-4 w-[130px]  text-12">
                          {numberWithCommas(items?.amount || 0) || 0}
                        </td>
                        <td
                          className={` w-[130px] text-12 ${
                            items?.status === 'pending'
                              ? 'text-yellow-700'
                              : items?.status === 'Approved'
                              ? 'text-green-700'
                              : 'text-red-700'
                          }`}
                        >
                          <span
                            className={`p-1 rounded-[5px] ${
                              items?.status === 'pending'
                                ? 'bg-yellow-200'
                                : items?.status === 'Approved'
                                ? 'bg-green-200'
                                : 'bg-red-100'
                            }  font-semibold`}
                          >
                            {items?.status?.toUpperCase()}
                          </span>
                        </td>
                        <td className=" w-[180px] text-12">
                          {moment(items?.created_at).format('L')}
                        </td>
                        <td className=" text-12">{items?.utr}</td>
                        <td className="truncate  text-12">
                          {items?.paymentMethod}
                        </td>
                      </tr>
                    ))}{' '}
                </>
              )}
            </tbody>
          </table>
          <Pagination
            pageCount={pagination.totalCount}
            setPageNumber={setPage}
            take={take}
          />
        </div>
      </div>
    </>
  );
};

export default Deposit;
