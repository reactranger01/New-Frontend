/* eslint-disable react-hooks/exhaustive-deps */
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
const BetSlip = () => {
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

  console.log(betData, 'betData');
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
      betData?.market == 'bookmaker'
        ? {
            ...betData,
            stake: Number(betData?.stake),
            price: betData.price / 100 + 1,
          }
        : { ...betData, stake: Number(betData?.stake) };
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
          {
            abortEarly: false,
          },
        );
        setTimeout(async () => {
          await postAuthData('/bet/place', data)
            .then((response) => {
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
                if (response.data.length > 0) {
                  toast.dismiss();
                  toast.error(response?.data || 'Something went wrong');
                } else {
                  toast.dismiss();
                  toast.error(response?.data || 'Something went wrong');
                }
              }
            })
            .catch((e) => {
              setIsloading(false);
              console.error(e);
            });
        }, 3000);
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
      toast.error('can not place bet due to missing odds');
    }
  };

  useEffect(() => {
    const calculationData = calcCurrentBetStats({ ...betData });
    dispatch(fetchCurrentCalculationAction(calculationData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betData, bets]);

  const handleIncrease = () => {
    if (betData?.price > 1) {
      if (betData?.market == 'Match Odds') {
        setBetData((prevData) => ({
          ...prevData,
          price: parseFloat((prevData.price + 0.01).toFixed(2)),
        }));
      } else {
        return;
      }
    } else {
      toast.dismiss();
      toast.error('Odds should be greater than 1');
    }
  };

  const handleDecrease = () => {
    if (betData?.price > 1) {
      if (betData?.market == 'Match Odds') {
        setBetData((prevData) => ({
          ...prevData,
          price: parseFloat((prevData.price - 0.01).toFixed(2)),
        }));
      } else {
        return;
      }
    } else {
      toast.dismiss();
      toast.error('Odds should be greater than 1');
    }
  };
  return (
    <div
      className={`relative px-2 bg-white rounded-md pb-2 text-12 ${
        bets?.[0]?.betOn === 'BACK'
          ? 'border-2 border-b-8 border-[#a7d8fd]'
          : 'border-2 border-b-8 border-[#f9c9d4]'
      } my-2`}
    >
      <div className="px-2 grid grid-cols-5 gap-3">
        <div className="flex flex-col  col-span-2">
          <div className="flex justify-between ">
            <label
              htmlFor=""
              className="text-10 flex items-end  leading-3 font-medium mt-2"
            >
              ODDS
            </label>
          </div>
          <div
            className={`relative rounded-sm overflow-hidden ${
              bets?.[0]?.betOn === 'BACK' ? 'bg-[#a7d8fd]' : 'bg-[#f9c9d4]'
            }`}
          >
            <input
              type="text"
              disabled
              value={
                betData?.market == 'bookmaker'
                  ? parseFloat((betData?.price / 100 + 1 || 0).toFixed(2))
                  : parseFloat((betData?.price || 0).toFixed(2))
              }
              className="outline-none   rounded-sm w-full h-8 px-12"
            />
            <button
              type="button"
              onClick={handleIncrease}
              className="absolute ay-center h-[30px] right-[2px] bg-white opacity-75 font-bold px-3 py-1 w-10 flex-center text-black rounded-l-full rounded-r-sm"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleDecrease}
              className=" absolute ay-center h-[30px] left-[2px] bg-white opacity-75 font-bold px-3 py-1 w-10 flex-center text-black rounded-l-sm rounded-r-full"
            >
              -
            </button>
          </div>
        </div>
        <div className="flex flex-col col-span-3">
          <label htmlFor="" className="text-10 font-medium leading-3 mt-2">
            STAKES
          </label>
          <div className="relative rounded-md overflow-hidden">
            <input
              type="number"
              onChange={handleChange}
              value={betData?.stake}
              placeholder="0"
              className="outline-none border border-gray-300   rounded-md w-full h-8 text-center"
            />
          </div>
          <div className="flex gap-2">
            <p className="text-10">
              Min.Bet:
              {userInfo.currency_type === 'HKD'
                ? (betData?.minimumBet || 0) / 10
                : betData?.minimumBet || 0}
            </p>{' '}
            <p className="text-10">
              max.Bet:
              {userInfo.currency_type === 'HKD'
                ? (betData?.maximumBet || Infinity) / 100
                : betData?.maximumBet || Infinity}
            </p>
          </div>

          {formError.stake && (
            <div className="form-eror flex text-start text-10 leading-3">
              {formError.stake}
            </div>
          )}
        </div>
      </div>
      <div className="grid  grid-cols-3 sm:grid-cols-7 gap-2 p-2 ">
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
      </div>

      <div className="flex items-center justify-evenly gap-2  p-2 ">
        <button
          onClick={() => {
            handleRemoveBet(betData?.selectionId);
          }}
          className="border border-black bg-gray-600 text-white  font-semibold w-full px-8 py-1 rounded-md"
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
          className={` border border-black text-white w-full px-6 flex gap-2 justify-center items-center py-1 rounded-md ${
            betData?.stake === '' || betData?.stake === 0
              ? 'bg-gray-400'
              : 'bg-gray-600'
          }`}
        >
          {loading && (
            <AiOutlineLoading3Quarters className="animate-spin text-14" />
          )}{' '}
          Place Order
        </button>
      </div>
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
      </div>
    </div>
  );
};
BetSlip.propTypes = {
  data1: PropTypes.number.isRequired,
};
export default BetSlip;
