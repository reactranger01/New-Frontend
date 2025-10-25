{
  /* eslint-disable */
}
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { PropTypes } from 'prop-types';
import {
  fetchBetDetailsAction,
  fetchCurrentCalculationAction,
  init,
  setBetPlacementSuccess,
} from '@/redux/actions';
import { getAuthData, postAuthData } from '@/utils/apiHandlers';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { betValidationSchema } from '@/utils/validation';
import { isYupError, parseYupError } from '@/utils/Yup';
import { calcCurrentBetStats } from '@/utils/helper';
import BetProcessing from '../NewModals/BetProcessing';
import { numberWithCommas } from '@/utils/numberWithCommas';

const amountArr = [100, 200, 300, 400, 500, 800, 700, 1000];

const NewBetSlip = () => {
  const [acceptOddsChange, setAcceptOddsChange] = useState(true);
  const [betData, setBetData] = useState({});
  const bets = useSelector((state) => state.bet.selectedBet);
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const [enent_ID, setEnent_ID] = useState(false);
  const [loading, setIsloading] = useState(false);
  const [stakeData, setStakeData] = useState([]);
  const userInfo = useSelector((state) => state.user);
  const [enabled, setEnabled] = useState(false);
  const [formError, setFormError] = useState({
    stake: '',
  });

  useEffect(() => {
    setBetData(bets?.[0]);
    setEnent_ID(bets?.[0]?.eventId);
  }, [bets]);

  useEffect(() => {
    if (bets.length == 0) {
      dispatch(fetchCurrentCalculationAction({}));
    }
  }, [bets.length]);

  useEffect(() => {
    if (userInfo) {
      const timer = setTimeout(() => {
        setBetData({ ...betData, currency: userInfo?.currency_type });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userInfo, betData]);

  const handleRemoveBet = (selectionId) => {
    const updatedBets = bets?.filter(
      (item) => item.selectionId !== selectionId,
    );
    setFormError({});
    dispatch(fetchBetDetailsAction(updatedBets));
    dispatch(fetchCurrentCalculationAction({}));
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;
    setFormError((prev) => ({
      ...prev,
      stake: null,
    }));
    if (
      (betData?.market === 'Match Odds' || 'MATCH_ODDS') &&
      betData?._marketData?.inplay === false &&
      inputValue > 1
    ) {
      inputValue = e.target.value > 1 ? e.target.value : e.target.value;
      setBetData({ ...betData, stake: inputValue });
    } else {
      setBetData({ ...betData, stake: inputValue });
    }
    setFormError({
      ...formError,
      [name]: '',
    });
    dispatch(fetchCurrentCalculationAction());
  };

  useEffect(() => {
    getStakesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, enent_ID]);
  const getStakesData = async () => {
    const response = await getAuthData('/user/get-usermeta-details');
    if (response?.status === 200) {
      setStakeData(response?.data);
    } else {
      setStakeData([]);
    }
  };

  const handleProfitzero = () => {
    dispatch(fetchCurrentCalculationAction(null));
  };
  const handleRestrictedGames = async (gameId) => {
    if (userInfo?.sports_setting?.includes(gameId)) {
      return true;
    } else {
      return false;
    }
  };

  const placeBet = async (e) => {
    e.preventDefault();

    if (betData?.stake == '' || betData?.stake == null) {
      setFormError({ ...formError, stake: 'Required' });
      return;
    }

    const checkRestriction = await handleRestrictedGames(betData?.gameId);
    if (checkRestriction) {
      toast.error('Betting on this sport is not permitted.');
      setIsloading(false);
      return;
    }

    if (userInfo.betLock) {
      toast.error('Betting is currently locked. You cannot place a bet.');
      return;
    }

    setIsloading(true);
    setFormError({});

    let data =
      betData?.market === 'bookmaker'
        ? {
            ...betData,
            stake: Number(betData?.stake),
            price: betData.price / 100 + 1,
            acceptOddsChange,
          }
        : {
            ...betData,
            stake: Number(betData?.stake),
            acceptOddsChange,
          };

    data.stake = Number(data?.stake);

    if (data?.stake !== 0 && data?.price !== 0) {
      try {
        await betValidationSchema.validate(
          {
            ...data,
            minimumBet:
              userInfo.currency_type === 'HKD'
                ? (betData?.minimumBet || 0) / 10
                : betData?.minimumBet || 0,
            maximumBet:
              userInfo.currency_type === 'HKD'
                ? (betData?.maximumBet || Infinity) / 100
                : betData?.maximumBet || Infinity,
          },
          { abortEarly: false },
        );

        // ✅ Start both API and 6-second timer simultaneously
        const apiCall = postAuthData('/user/place-bet', data);
        const delay = new Promise((resolve) => setTimeout(resolve, 6000));

        // Wait until BOTH are done
        const [response] = await Promise.all([apiCall, delay]);

        // ✅ Now handle the API response
        if (response.status === 200) {
          setIsloading(false);
          toast.success('Bet Placed Successfully');
          handleRemoveBet(data.selectionId);
          dispatch(fetchCurrentCalculationAction(null));
          dispatch(fetchBetDetailsAction([]));
          dispatch(init([]));
          handleProfitzero();
          dispatch(setBetPlacementSuccess());
        } else {
          setIsloading(false);
          toast.dismiss();
          toast.error(response?.data?.error || 'Something went wrong');
        }
      } catch (error) {
        if (isYupError(error)) {
          setFormError(parseYupError(error));
        } else {
          toast.error('An error occurred while placing the bet');
        }
        setIsloading(false);
      }
    } else {
      setIsloading(false);
      toast.dismiss();
      toast.error('Cannot place bet due to missing odds');
    }
  };

  useEffect(() => {
    const calculationData = calcCurrentBetStats({ ...betData });
    dispatch(fetchCurrentCalculationAction(calculationData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betData, bets]);

  const remainingBtn = [
    {
      text: 'MIN STAKE',
      onClick: () => setBetData({ ...betData, stake: 100 }),
      css: 'bg-[#4CAF50]',
    },
    {
      text: 'MAX STAKE',
      onClick: () => setBetData({ ...betData, stake: 100 }),
      css: 'bg-[#334579]',
    },
    {
      text: 'CLEAR',
      onClick: () => setBetData({ ...betData, stake: 100 }),
      css: 'bg-[#FF0000]',
    },
    {
      text: 'EDIT STAKE',
      onClick: () => setBetData({ ...betData, stake: 100 }),
      css: 'bg-[#008000]',
    },
  ];
  return (
    <>
      <div
        className={`relative px-2 pb-2 border-x border-x-[#ddd] bg-white rounded-md  text-12 ${
          bets?.[0]?.betOn === 'BACK'
            ? 'border-b-[5px]  border-[#a7d8fd]'
            : 'border-b-[5px] border-[#f9c9d4]'
        } my-2`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-fit">
              <FormControlLabel
                sx={{
                  marginX: 0,
                }}
                control={
                  <Switch
                    checked={acceptOddsChange}
                    onChange={(e) => setAcceptOddsChange(e.target.checked)}
                    color="primary"
                    // disabled={loading}
                  />
                }
              />
            </div>
            <p className="text-14 font-bold"> Accept any odds</p>
          </div>
          <div className="text-14 font-bold flex items-center gap-2">
            Avail Bal :{' '}
            <p className="text-green-600">
              {numberWithCommas(
                userInfo?.balance - Math.abs(userInfo?.exposureAmount) || 0,
              )}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-2 bg-[#edebeb] border border-gray-500 text-black relative rounded-sm overflow-hidden">
            <input
              type="text"
              disabled
              value={
                betData?.market == 'bookmaker'
                  ? parseFloat((betData?.price / 100 + 1 || 0).toFixed(2))
                  : parseFloat((betData?.price || 0).toFixed(2))
              }
              className="outline-none   rounded-sm w-full h-[25px] font-bold text-12 text-center"
            />
          </div>
          <div className="col-span-2 bg-white border border-gray-500 text-black relative rounded-sm overflow-hidden">
            <input
              type="number"
              onChange={handleChange}
              value={betData?.stake}
              placeholder="0"
              className="outline-none   rounded-sm w-full h-[25px] font-bold text-12 text-center"
            />
          </div>
          <div className="col-span-4">
            {formError.stake && (
              <div className="form-eror flex text-start text-10 leading-3">
                {formError.stake}
              </div>
            )}
          </div>
          {amountArr &&
            amountArr.map((item) => {
              return (
                <button
                  key={item}
                  onClick={() => {
                    setBetData({
                      ...betData,
                      stake: item,
                    });
                  }}
                  className="bg-black text-white rounded-sm h-[25px] font-bold text-12 leading-none flex-center"
                >
                  {item}
                </button>
              );
            })}
          {remainingBtn &&
            remainingBtn.map((item) => {
              return (
                <button
                  key={item}
                  onClick={item?.onClick}
                  className={`${item?.css} text-white rounded-sm h-[25px] font-bold text-12 leading-none flex-center`}
                >
                  {item?.text}
                </button>
              );
            })}
          <button
            onClick={() => {
              handleRemoveBet(betData?.selectionId);
            }}
            className="border col-span-2 border-black text-gray-600  font-semibold w-full px-8 py-1 rounded-sm"
          >
            Cancel
          </button>
          <button
            disabled={
              betData?.stake === '' || betData?.stake === 0 || loading
                ? true
                : false
            }
            onClick={(e) => placeBet(e)}
            className={`col-span-2  w-full px-6 flex gap-2 justify-center font-semibold items-center py-1 rounded-sm ${
              betData?.stake === '' || betData?.stake === 0
                ? 'bg-gray-600 text-white'
                : 'bg-[#F4D821] text-black'
            }`}
          >
            {loading && (
              <AiOutlineLoading3Quarters className="animate-spin text-14" />
            )}{' '}
            Place Order
          </button>
        </div>

        {/* <div className="grid  grid-cols-3 sm:grid-cols-7 gap-2 p-2 ">
        {stakeData?.chipSetting &&
          stakeData?.chipSetting.map((item, index) => {
            return (
              <button
                key={item}
                onClick={() => {
                  setBetData({
                    ...betData,
                    stake: item.value,
                  });
                }}
                className={`border border-gray-200  flex-center ${
                  item.value === betData?.stake
                    ? 'bg-primary-700'
                    : 'bg-[#0F2327] text-white'
                } ${
                  index === stakeData.chipSetting.length - 1 ? 'hidden' : ''
                }`}
              >
                {item.name}
              </button>
            );
          })}
      </div> */}

        {/* <div className="flex items-center justify-evenly gap-2  p-2 "></div>
      <div className="px-2 hidden">
        <div className="flex items-center justify-between mb-2">
          <p>Confirm bet before placing</p>
          <div
            onClick={() => setEnabled(!enabled)}
            className={`${
              enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>Auto accept better bets</p>
          <div
            onClick={() => setEnabled(!enabled)}
            className={`${
              enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </div>
        </div>
      </div> */}
      </div>

      {loading && <BetProcessing isOpen={loading} />}
    </>
  );
};
NewBetSlip.propTypes = {
  data1: PropTypes.number.isRequired,
};
export default NewBetSlip;
