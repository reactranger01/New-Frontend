/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  fetchBetDetailsAction,
  fetchCurrentCalculationAction,
  init,
  setBetPlacementSuccess,
} from '@/redux/actions';
import { postAuthData } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { betValidationSchema } from '@/utils/validation';
import { isYupError, parseYupError } from '@/utils/Yup';
import { calcCurrentBetStats } from '@/utils/helper';
const NewBetSlip = () => {
  const [betData, setBetData] = useState({});
  const [currentBetWinLossDatas, setCurrentBetWinLossData] = useState(null);
  const bets = useSelector((state) => state.bet.selectedBet);
  const dispatch = useDispatch();
  const [enent_ID, setEnent_ID] = useState(false);
  const [loading, setIsloading] = useState(false);
  const userInfo = useSelector((state) => state.user);
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

  const increaseStake = () => {
    if (betData.stake > 0) {
      setBetData((prevBet) => ({ ...prevBet, stake: prevBet.stake + 50 }));
    }
  };

  useEffect(() => {
    if (userInfo) {
      const timer = setTimeout(() => {
        setBetData({ ...betData, currency: userInfo?.currency_type });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userInfo, betData]);

  const decreaseStake = () => {
    if (betData.stake > 50) {
      setBetData((prevBet) => ({ ...prevBet, stake: prevBet.stake - 50 }));
    }
  };

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
  };

  const betStake = [100, 200, 500, 1000, 5000, 10000];

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
                dispatch(fetchCurrentCalculationAction({}));
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
        }, 1000);
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

  useEffect(() => {
    if (betData) {
      const calculationData = calcCurrentBetStats({ ...betData });
      dispatch(fetchCurrentCalculationAction(calculationData));
      setCurrentBetWinLossData(calculationData);
    }
  }, [betData, bets]);
  console.log('betDatathoos', betData);
  return (
    <>
      <div className="bg-white pb-2 text-12 ">
        <h1 className="border-b border-gray-200 px-2 py-1 text-16 font-bold bg-[#1f5058] text-white text-center">
          Bet Slip
        </h1>
        <div
          className={`relative px-2 ${
            bets?.[0]?.betOn === 'BACK' ? 'bg-[#a7d8fd]' : 'bg-[#f9c9d4]'
          } my-2`}
        >
          <button
            onClick={() => {
              handleRemoveBet(betData?.selectionId);
            }}
            className="absolute top-2 right-2 text-red-700 text-xl"
          >
            {reactIcons.close}
          </button>
          <p> {bets?.[0]?.event}</p>
          <p>{bets?.[0]?.bettingOn}</p>
          <p> {bets?.[0]?.selection}</p>
        </div>
        <div className="px-2">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <label htmlFor="" className="text-14 flex items-end  font-medium">
                Odds
              </label>
              <div
                className={` ${
                  bets?.[0]?.betOn === 'BACK'
                    ? ' bg-[#DAEDFF]'
                    : ' bg-[#FFD6D6]'
                }  bg-[#DAEDFF] flex gap-2 rounded-tl-md rounded-bl-md px-3 py-1 `}
              >
                <p className="text-[#35495E]">
                  {bets?.[0]?.betOn === 'BACK' ? 'Profit' : 'Liability'}
                </p>
                <p
                  className={
                    bets?.[0]?.betOn === 'BACK'
                      ? 'text-[#219642]'
                      : 'text-[#fa7272]'
                  }
                >
                  {bets?.[0]?.betOn === 'BACK'
                    ? currentBetWinLossDatas?.calculation?.win.toFixed(2) || 0.0
                    : currentBetWinLossDatas?.calculation?.loss.toFixed(2) ||
                      0.0}
                </p>
              </div>
            </div>
            <div className="relative rounded-md overflow-hidden">
              <input
                type="text"
                disabled
                value={
                  betData?.market == 'bookmaker'
                    ? parseFloat((betData?.price / 100 + 1 || 0).toFixed(2))
                    : parseFloat((betData?.price || 0).toFixed(2))
                }
                className="outline-none border border-gray-200   rounded-sm w-full h-10 px-12"
              />
              <button
                type="button"
                onClick={handleDecrease}
                className="absolute ay-center cursor-pointer h-10 left-0 bg-[#051316] font-bold px-3 py-1 w-10 flex-center text-white"
              >
                -
              </button>
              <button
                type="button"
                onClick={handleIncrease}
                className="absolute ay-center cursor-pointer  h-10 right-0 bg-[#051316] font-bold px-3 py-1 w-10 flex-center text-white"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-14 font-medium">
              Stakes
            </label>
            <div className="relative rounded-md overflow-hidden">
              <input
                type="number"
                onChange={handleChange}
                value={betData?.stake}
                placeholder="0"
                className="outline-none border border-gray-200   rounded-sm w-full h-10 px-12"
              />
              <button
                onClick={decreaseStake}
                className="absolute ay-center h-10 left-0 bg-[#051316] font-bold px-3 py-1 w-10 flex-center text-white"
              >
                -
              </button>
              <button
                onClick={increaseStake}
                className="absolute ay-center h-10 right-0 bg-[#051316] font-bold px-3 py-1 w-10 flex-center text-white"
              >
                +
              </button>
            </div>
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
            <div className="form-eror flex text-start text-14">
              {formError.stake}
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3 p-2 ">
          {betStake &&
            betStake.map((item) => {
              return (
                <button
                  key={item}
                  onClick={() => {
                    setBetData({
                      ...betData,
                      stake: item,
                    });
                  }}
                  className={`border border-gray-200 rounded-xl flex-center ${
                    item === betData?.stake ? 'bg-primary-700' : 'bg-white'
                  }`}
                >
                  {item}
                </button>
              );
            })}

          <button
            onClick={() => {
              setBetData({
                ...betData,
                stake: 25000,
              });
            }}
            className={`border border-gray-200 rounded-xl col-span-3 flex-center ${
              25000 === betData?.stake ? 'bg-primary-700' : 'bg-white'
            }`}
          >
            25000
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 px-2">
          <button
            onClick={() => setBetData({ ...betData, stake: 100 })}
            className="border border-gray-200 bg-gray-200 rounded-xl flex-center"
          >
            Min
          </button>
          <button
            onClick={() => setBetData({ ...betData, stake: 25000 })}
            className="border border-gray-200 bg-gray-200 rounded-xl flex-center"
          >
            Max
          </button>
          <button
            onClick={() => {
              setBetData({ ...betData, stake: '' });
            }}
            className="border border-gray-200 bg-gray-200 rounded-xl flex-center"
          >
            Clear
          </button>
        </div>
        <div className="flex items-center justify-end gap-2  p-2 mt-2">
          <button
            onClick={() => {
              handleRemoveBet(betData?.selectionId);
            }}
            className="bg-[#bf3e35] text-white px-4 py-1 rounded-lg"
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
            className={`text-white px-4 flex gap-2 items-center py-1 rounded-lg ${
              betData?.stake === '' || betData?.stake === 0
                ? 'bg-[#5c996f] border-[#5c996f] '
                : 'bg-[#0EAD69] border-[#0EAD69]'
            }`}
          >
            {loading && (
              <AiOutlineLoading3Quarters className="animate-spin text-14" />
            )}{' '}
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default NewBetSlip;
