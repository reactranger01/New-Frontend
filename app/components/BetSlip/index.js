/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  fetchBetDetailsAction,
  fetchCurrentCalculationAction,
  init,
  setBetPlacementSuccess,
} from '@/redux/actions';
import { isLoggedIn, postAuthData } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { betValidationSchema } from '@/utils/validation';
import { isYupError, parseYupError } from '@/utils/Yup';
import { calcCurrentBetStats } from '@/utils/helper';
import BetProcessing from '../NewModals/BetProcessing';
import BetEditStake from '../NewModals/BetEditStake';
import MobOpenBets from '../MobOpenBets';
import { useParams } from 'react-router-dom';
import { numberWithCommas } from '@/utils/numberWithCommas';

const BetSlip = () => {
  const isLogin = isLoggedIn();
  const { eventId } = useParams();
  const [openEditStake, setOpenEditStake] = useState(false);
  const [stakebutton, setStakeButton] = useState([
    { text: '100', value: 100 },
    { text: '200', value: 200 },
    { text: '300', value: 300 },
    { text: '400', value: 400 },
    { text: '500', value: 500 },
    { text: '600', value: 600 },
    { text: '700', value: 700 },
    { text: '800', value: 800 },
  ]);
  const [activeTab, setActiveTab] = useState('betslip');
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
          await postAuthData('/user/place-bet', data)
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
                  toast.error(response?.data?.error || 'Something went wrong');
                } else {
                  toast.dismiss();
                  toast.error(response?.data?.error || 'Something went wrong');
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

  useEffect(() => {
    const localStakeData = JSON.parse(
      localStorage.getItem('localBetStakeData'),
    );
    if (localStakeData && Array.isArray(localStakeData)) {
      setStakeButton(localStakeData);
    }
  }, [openEditStake]);

  return (
    <>
      <div className=" pb-2 text-12 ">
        {isLogin && (
          <div className="bg-[#026B4F] flex items-center justify-between  px-3 py-2">
            <h1 className=" text-14   text-white leading-none ">
              Available Credit:{' '}
              {numberWithCommas(
                userInfo?.balance - Math.abs(userInfo?.exposureAmount) || 0,
              )}
            </h1>
            <div className="text-white text-2xl">{reactIcons?.downArrow}</div>
          </div>
        )}

        <h1 className="border-b border-[#777]  py-1 text-16 mt-2  text-black">
          Bet Slip
        </h1>

        <div className="flex items-center justify-between mt-2">
          <div className="flex">
            <div
              onClick={() => setActiveTab('betslip')}
              className={`${
                activeTab === 'betslip' ? 'bg-white' : 'bg-[#DEDBD7]'
              }  text-12 py-2 px-[15px] rounded cursor-pointer`}
            >
              Betslip
            </div>
            <button
              onClick={() => setActiveTab('openBets')}
              disabled={!isLogin}
              className={`${
                activeTab === 'openBets' ? 'bg-white' : 'bg-[#DEDBD7]'
              } text-12 py-2 px-[15px] rounded cursor-pointer`}
            >
              Open Bets
            </button>
          </div>
          <button
            onClick={() => setOpenEditStake(true)}
            disabled={!isLogin}
            className="bg-[#1E8067] px-2 py-1 rounded text-white font-bold text-[13px]"
          >
            Edit Stakes
          </button>
        </div>
        {/* main div */}
        <div className={activeTab === 'openBets' ? 'hidden' : ''}>
          {betData && betData?.marketId && (
            <div className="bg-white p-2">
              <div className="flex items-center gap-1">
                <div
                  className={`${
                    bets?.[0]?.betOn === 'BACK'
                      ? 'bg-[#a7d8fd]'
                      : 'bg-[#f9c9d4]'
                  } w-3 h-3`}
                ></div>
                <p>{bets?.[0]?.betOn === 'BACK' ? 'back' : 'lay'}</p>
              </div>
              <p className=" text-[13px] font-bold text-black">
                {bets?.[0]?.event}
              </p>
              <div
                className={`relative p-2 ${
                  bets?.[0]?.betOn === 'BACK' ? 'bg-[#a7d8fd]' : 'bg-[#f9c9d4]'
                } my-1`}
              >
                <div className="flex items-center justify-between text-12 font-lato ">
                  <p> {bets?.[0]?.selection}</p>
                  <p> Max Market: {betData?.maximumBet}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <label htmlFor="" className="text-12 font-[200]  ">
                        Odds
                      </label>
                    </div>
                    <div className="relative rounded-md overflow-hidden bg-white">
                      <input
                        type="text"
                        disabled
                        value={
                          betData?.market == 'bookmaker'
                            ? parseFloat(
                                (betData?.price / 100 + 1 || 0).toFixed(2),
                              )
                            : parseFloat((betData?.price || 0).toFixed(2))
                        }
                        className="outline-none   rounded-sm w-full h-[28px] max-w-[103px] px-8 py-2"
                      />
                      <button
                        type="button"
                        onClick={handleDecrease}
                        className="absolute ay-center rounded-sm cursor-pointer h-[22px] w-[22px] left-1 bg-[#051316] font-bold  flex-center text-white"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={handleIncrease}
                        className="absolute ay-center rounded-sm cursor-pointer h-[22px] w-[22px] right-1 bg-[#051316] font-bold flex-center text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className=" font-[200] text-12">
                      Stake
                    </label>
                    <div className="relative rounded-md overflow-hidden">
                      <input
                        type="number"
                        onChange={handleChange}
                        value={betData?.stake}
                        placeholder="0"
                        className="outline-none border border-gray-200 text-center  max-w-[90px] rounded-sm w-full h-[26px] "
                      />
                    </div>
                  </div>
                  <div className="">
                    <p className="text-black font-[200]">
                      {bets?.[0]?.betOn === 'BACK' ? 'Profit' : 'Liability'}
                    </p>
                    <p className="text-black text-12 font-bold">
                      {bets?.[0]?.betOn === 'BACK'
                        ? !isNaN(
                            Number(currentBetWinLossDatas?.calculation?.win),
                          )
                          ? Number(
                              currentBetWinLossDatas?.calculation?.win,
                            ).toFixed(0)
                          : 0
                        : !isNaN(
                            Number(currentBetWinLossDatas?.calculation?.loss),
                          )
                        ? Number(
                            currentBetWinLossDatas?.calculation?.loss,
                          ).toFixed(0)
                        : 0}
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      handleRemoveBet(betData?.selectionId);
                    }}
                    className="bg-[#B2493E] text-white rounded-sm h-5 w-5 flex-center text-xl font-bold mt-auto mb-1"
                  >
                    {reactIcons.close}
                  </div>
                </div>
                <div className="bg-white p-3 grid grid-cols-3 gap-y-3  gap-x-2 mt-2">
                  <button
                    onClick={() => setBetData({ ...betData, stake: 100 })}
                    className="border  bg-[#1E8067] h-[14px] text-white font-medium text-10 leading-none rounded-sm flex-center"
                  >
                    Min
                  </button>

                  {stakebutton &&
                    stakebutton.map((item) => {
                      return (
                        <button
                          key={item}
                          onClick={() => {
                            setBetData({
                              ...betData,
                              stake: item?.value,
                            });
                          }}
                          className={`border  rounded-sm h-[14px] text-white font-medium text-10 leading-none flex-center ${
                            item === betData?.stake
                              ? 'bg-[#1E8067]'
                              : 'bg-[#1E8067]'
                          }`}
                        >
                          {item?.text}
                        </button>
                      );
                    })}
                  <button
                    onClick={() => setBetData({ ...betData, stake: 25000 })}
                    className="border text-10 h-[14px] leading-none text-white font-medium  bg-[#1E8067] rounded-sm flex-center"
                  >
                    Max
                  </button>
                  <button
                    onClick={() => {
                      setBetData({ ...betData, stake: '' });
                    }}
                    className="text-12 font-medium h-[14px] flex items-center"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2  mt-2">
                  <button
                    onClick={() => {
                      setBetData({ ...betData, stake: '' });
                    }}
                    // onClick={() => {
                    //   handleRemoveBet(betData?.selectionId);
                    // }}
                    className="bg-[#B2493E] text-white px-4 py-1 text-12 font-semibold rounded-sm shadow-[inset_-2px_-2px_#8d3a31]"
                  >
                    Remove All
                  </button>
                  <button
                    disabled={
                      betData?.stake === '' || betData?.stake === 0 || loading
                        ? true
                        : false
                    }
                    onClick={(e) => placeBet(e)}
                    className={`text-white px-4 flex gap-2 items-center text-12 font-semibold shadow-[inset_-2px_-2px_#1E8067] py-1 rounded-sm ${
                      betData?.stake === '' || betData?.stake === 0
                        ? 'bg-[#5c996f] '
                        : 'bg-[#5C996F] '
                    }`}
                  >
                    {loading && (
                      <AiOutlineLoading3Quarters className="animate-spin text-14" />
                    )}{' '}
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )}
          {!betData?.marketId && (
            <div className="text-14 bg-white p-2">
              Click on the odds to add selections to the betslip
            </div>
          )}
        </div>

        <div className={`${activeTab === 'betslip' ? 'hidden' : ''}`}>
          <MobOpenBets eventId={eventId} />
        </div>
      </div>

      {loading && <BetProcessing isOpen={loading} />}
      {openEditStake && (
        <BetEditStake
          isOpen={openEditStake}
          handleClose={() => setOpenEditStake(false)}
          stakebutton={stakebutton}
          setStakeButton={setStakeButton}
        />
      )}
    </>
  );
};

export default BetSlip;
