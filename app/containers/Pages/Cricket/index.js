import { Loading } from '@/components';
import DesktopMarketAll from '@/components/DesktopMarketAll';
import MostPopular from '@/components/MostPopular';
import { LoginModal } from '@/containers/pageListAsync';
import { fetchBetDetailsAction } from '@/redux/actions';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { isLoggedIn } from '@/utils/apiHandlers';
import { getFixtureData } from '@/utils/helper';
import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Cricket = () => {
  const isLogin = isLoggedIn();
  // eslint-disable-next-line
  const [isLoading, setisLoading] = useState(false);
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const betData = useSelector((state) => state.bet.selectedBet);
  const [inplayTrue, setInplayTrue] = useState([]);
  const [inplayFalse, setInplayFalse] = useState([]);

  const [bets, setBets] = useState([]);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:1024px)');
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);
  useEffect(() => {
    if (bets?.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
      if (isMobile) {
        dispatch(setActiveBetSlipIndex(bets[0]?.eventId));
      }
    }
  }, [bets, dispatch, isMobile]);

  const addToBetPlace = (
    competition_name,
    eventId,
    selectionId,
    betDetails,
    game,
    OddsPrice,
    betType,
    selectType,
    name,
    market_id,
    _marketData,
    sportId,
    minBetLimit,
    maxBetLimit,
  ) => {
    setBets([
      {
        marketId: String(market_id),
        eventId: Number(eventId),
        gameId: Number(sportId),
        selectionId: String(selectionId),
        betOn: selectType,
        price: parseFloat(OddsPrice),
        stake: '',
        eventType: game,
        competition: competition_name,
        event: name,
        market: betType,
        gameType: betType,
        nation: betDetails?.runnerName,
        type: selectType,
        calcFact: 0,
        bettingOn: betType,
        runners: 2,
        row: 1,
        matchName: name,
        percent: 100,
        selection: betDetails?.runnerName,
        _marketData,
        minimumBet: minBetLimit,
        maximumBet: maxBetLimit,
      },
    ]);
  };

  const getCricketData = () => {
    getFixtureData(
      'cricket',
      setInplayTrue,
      setInplayFalse,
      setisLoading,
      setLoaderOneTime,
    );
  };

  useEffect(() => {
    const fetchInterval = isLogin ? 5000 : 10000;
    getCricketData();
    const intervalId = setInterval(() => {
      getCricketData();
    }, fetchInterval);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && !loaderOneTime && <Loading />}
      <div className="mb-10 min-h-screen">
        <div className="">
          <MostPopular />
          <div className="flex items-center justify-center sm:justify-between bg-white py-[8.5px] pl-[8.5px]">
            <div className="flex items-center gap-2 pl-2">
              <img
                src="/images/sidebarIcons/cricketDesk.png"
                className="w-6 h-6"
                alt=""
              />
              <p className="text-16 font-bold text-center sm:text-left">
                Cricket{' '}
              </p>
            </div>
            <div className="sm:grid grid-cols-6 hidden sm:min-w-[360px] min-w-[300px]">
              <div className="col-span-2 flex-center text-14 font-bold">1</div>
              <div className="col-span-2 flex-center text-14 font-bold">X</div>
              <div className="col-span-2 flex-center text-14 font-bold">2</div>
            </div>
          </div>

          {/* <div className="flex flex-col mb-5">
            <div className="flex items-center justify-center sm:justify-between">
              <div className="flex items-center text-12 font-semibold">
                <span className="text-[#3cdeff] mx-1">
                  {reactIcons.lightning}
                </span>{' '}
                Live
              </div>
              <div className="sm:grid grid-cols-6 hidden sm:min-w-[360px] min-w-[300px]">
                <div className="col-span-2 flex-center text-12 font-semibold">
                  1
                </div>
                <div className="col-span-2 flex-center text-12 font-semibold">
                  X
                </div>
                <div className="col-span-2 flex-center text-12 font-semibold">
                  2
                </div>
              </div>
            </div>
            <div className="w-full border border-[#ddd]">
              {inplayTrue === null || inplayTrue?.length === 0 ? (
                <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
                  <span className="text-12">
                    Currently, no in-play matches are available.
                  </span>
                </div>
              ) : (
                <>
                  {' '}
                  {inplayTrue &&
                    inplayTrue.map((_items, index) => {
                      let minLimitOdds, maxLimitOdds;
                      if (_items.inplay) {
                        minLimitOdds = _items?.inPlayMinLimit;
                        maxLimitOdds = _items?.inPlayMaxLimit;
                      } else {
                        minLimitOdds = _items?.offPlayMinLimit;
                        maxLimitOdds = _items?.offPlayMaxLimit;
                      }
                      return (
                        <>
                          {!_items?.runners?.[0]?.backPrice1 &&
                          !_items?.runners?.[1]?.backPrice1 &&
                          !_items?.runners?.[2]?.backPrice1 &&
                          !_items?.runners?.[0]?.layPrice1 &&
                          !_items?.runners?.[1]?.layPrice1 &&
                          !_items?.runners?.[2]?.layPrice1 ? (
                            <></>
                          ) : (
                            <div
                              key={index}
                              className="flex flex-col sm:flex-row justify-between items-center w-full border-b border-[#ddd] bg-white"
                            >
                              <div className="flex items-center  justify-between  gap-1 w-full py-1 px-2">
                                <div className="flex items-center gap-1">
                                  <div className="text-[#e4c41e] w-[18px]">
                                    {reactIcons.star}
                                  </div>
                                  <div
                                    onClick={() =>
                                      navigate(
                                        _items?.event_id
                                          ? `/dashboard/cricket/market/${_items?.event_id}`
                                          : `/dashboard/cricket/market/${_items?.matchId}`,
                                        {
                                          state: { data: _items },
                                        },
                                      )
                                    }
                                    className="flex-1 cursor-pointer  leading-3 text-[#005ba2] text-12 font-bold hover:underline"
                                  >
                                    {' '}
                                    {_items?.runners[0]?.runnerName} v{' '}
                                    {_items?.runners[1]?.runnerName}
                                  </div>
                                </div>
                                <div></div>
                                <div className="flex-center text-green-800 gap-1 text-10">
                                  <span className="text-green-800 text-14">
                                    {reactIcons.play}
                                  </span>
                                  In-Play
                                </div>
                              </div>
                              {_items?.runners?.[0]?.backPrice1 ||
                              _items?.runners?.[1]?.backPrice1 ||
                              _items?.runners?.[2]?.backPrice1 ||
                              _items?.runners?.[0]?.layPrice1 ||
                              _items?.runners?.[1]?.layPrice1 ||
                              _items?.runners?.[2]?.layPrice1 ? (
                                <div className="grid grid-cols-6  sm:min-w-[360px] min-w-[300px]">
                                  <div className="">
                                    {_items?.runners?.[0]?.backPrice1 ? (
                                      <BlueBtn
                                        onClick={() => {
                                          if (isLogin) {
                                            addToBetPlace(
                                              _items?.competition_name,
                                              _items?.event_id ||
                                                _items?.matchId,
                                              _items?.runners?.[0]?.selectionId,
                                              _items?.runners?.[0],
                                              'Cricket',
                                              _items?.runners?.[0]?.backPrice1,
                                              _items?.market_name,
                                              'BACK',
                                              _items?.name,
                                              _items?.market_id,
                                              _items?.runners,
                                              _items?.sportId,
                                              minLimitOdds,
                                              maxLimitOdds,
                                            );
                                          } else {
                                            setOpenModal(true);
                                          }
                                        }}
                                        text={
                                          _items?.runners?.[0]?.backPrice1 ||
                                          '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                  <div className="">
                                    {_items?.runners?.[0]?.layPrice1 ? (
                                      <PinkBtn
                                        onClick={() => {
                                          isLogin
                                            ? addToBetPlace(
                                                _items?.competition_name,
                                                _items?.event_id ||
                                                  _items?.matchId,
                                                _items?.runners?.[0]
                                                  ?.selectionId,
                                                _items?.runners?.[0],
                                                'Cricket',
                                                _items?.runners?.[0]?.layPrice1,
                                                _items?.market_name,
                                                'LAY',
                                                _items?.name,
                                                _items?.market_id,
                                                _items?.runners,
                                                _items?.sportId,
                                                minLimitOdds,
                                                maxLimitOdds,
                                              )
                                            : setOpenModal(true);
                                        }}
                                        text={
                                          _items?.runners?.[0]?.layPrice1 || '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                  <div className="">
                                    {_items?.runners?.[2]?.backPrice1 ? (
                                      <BlueBtn
                                        onClick={() => {
                                          isLogin
                                            ? addToBetPlace(
                                                _items?.competition_name,
                                                _items?.event_id ||
                                                  _items?.matchId,
                                                _items?.runners?.[2]
                                                  ?.selectionId,
                                                _items?.runners?.[2],
                                                'Cricket',
                                                _items?.runners?.[2]
                                                  ?.backPrice1,
                                                _items?.market_name,
                                                'BACK',
                                                _items?.name,
                                                _items?.market_id,
                                                _items?.runners,
                                                _items?.sportId,
                                                minLimitOdds,
                                                maxLimitOdds,
                                              )
                                            : setOpenModal(true);
                                        }}
                                        text={
                                          _items?.runners?.[2]?.backPrice1 ||
                                          '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                  <div className="">
                                    {_items?.runners?.[2]?.layPrice1 ? (
                                      <PinkBtn
                                        onClick={() => {
                                          isLogin
                                            ? addToBetPlace(
                                                _items?.competition_name,
                                                _items?.event_id ||
                                                  _items?.matchId,
                                                _items?.runners?.[2]
                                                  ?.selectionId,
                                                _items?.runners?.[2],
                                                'Cricket',
                                                _items?.runners?.[2]?.layPrice1,
                                                _items?.market_name,
                                                'LAY',
                                                _items?.name,
                                                _items?.market_id,
                                                _items?.runners,
                                                _items?.sportId,
                                                minLimitOdds,
                                                maxLimitOdds,
                                              )
                                            : setOpenModal(true);
                                        }}
                                        text={
                                          _items?.runners?.[2]?.layPrice1 || '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                  <div className="">
                                    {_items?.runners?.[1]?.backPrice1 ? (
                                      <BlueBtn
                                        onClick={() => {
                                          isLogin
                                            ? addToBetPlace(
                                                _items?.competition_name,
                                                _items?.event_id ||
                                                  _items?.matchId,
                                                _items?.runners?.[1]
                                                  ?.selectionId,
                                                _items?.runners?.[1],
                                                'Cricket',
                                                _items?.runners?.[1]
                                                  ?.backPrice1,
                                                _items?.market_name,
                                                'BACK',
                                                _items?.name,
                                                _items?.market_id,
                                                _items?.runners,
                                                _items?.sportId,
                                                minLimitOdds,
                                                maxLimitOdds,
                                              )
                                            : setOpenModal(true);
                                        }}
                                        text={
                                          _items?.runners?.[1]?.backPrice1 ||
                                          '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                  <div className="">
                                    {_items?.runners?.[1]?.layPrice1 ? (
                                      <PinkBtn
                                        onClick={() => {
                                          isLogin
                                            ? addToBetPlace(
                                                _items?.competition_name,
                                                _items?.event_id ||
                                                  _items?.matchId,
                                                _items?.runners?.[1]
                                                  ?.selectionId,
                                                _items?.runners?.[1],
                                                'Cricket',
                                                _items?.runners?.[1]?.layPrice1,
                                                _items?.market_name,
                                                'LAY',
                                                _items?.name,
                                                _items?.market_id,
                                                _items?.runners,
                                                _items?.sportId,
                                                minLimitOdds,
                                                maxLimitOdds,
                                              )
                                            : setOpenModal(true);
                                        }}
                                        text={
                                          _items?.runners?.[1]?.layPrice1 || '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-6  sm:min-w-[360px] min-w-[300px]">
                                  <div
                                    onClick={() =>
                                      navigate(
                                        _items?.event_id
                                          ? `/dashboard/cricket/market/${_items?.event_id}`
                                          : `/dashboard/cricket/market/${_items?.matchId}`,
                                        {
                                          state: { data: _items },
                                        },
                                      )
                                    }
                                    className="col-span-6 flex-center"
                                  >
                                    <SeeMoreMarkets />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {activeBetSlip == Number(_items?.matchId) &&
                            Number(_items?.matchId) ==
                              Number(bets[0]?.eventId) &&
                            isLogin &&
                            betData?.length > 0 &&
                            isMobile && <NewBetSlip />}
                        </>
                      );
                    })}
                </>
              )}
            </div>
          </div> */}
          <DesktopMarketAll
            type="Live"
            inplayData={inplayTrue}
            gameNameS="cricket"
            gameNameB="Cricket"
            setOpenModal={setOpenModal}
            addToBetPlace={addToBetPlace}
            isLogin={isLogin}
            activeBetSlip={activeBetSlip}
            isMobile={isMobile}
            bets={bets}
            betData={betData}
          />
          <DesktopMarketAll
            type="Upcoming"
            inplayData={inplayFalse}
            gameNameS="cricket"
            gameNameB="Cricket"
            setOpenModal={setOpenModal}
            addToBetPlace={addToBetPlace}
            isLogin={isLogin}
            activeBetSlip={activeBetSlip}
            isMobile={isMobile}
            bets={bets}
            betData={betData}
          />
          {/* <div className="flex flex-col">
            <div className="flex items-center justify-center sm:justify-between">
              <div className="flex items-center text-12 font-semibold">
                <span className="text-[#3cdeff] mx-1">
                  {reactIcons.lightning}
                </span>{' '}
                Upcoming
              </div>
              <div className="sm:grid grid-cols-6 hidden sm:min-w-[360px] min-w-[300px]">
                <div className="col-span-2 flex-center text-12 font-semibold">
                  1
                </div>
                <div className="col-span-2 flex-center text-12 font-semibold">
                  X
                </div>
                <div className="col-span-2 flex-center text-12 font-semibold">
                  2
                </div>
              </div>
            </div>
            <div className="w-full border border-[#ddd]">
              {inplayFalse?.length === 0 && isLoading == false ? (
                <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
                  <span className="text-12">
                    Data is currently unavailable.
                  </span>
                </div>
              ) : (
                <>
                  {inplayFalse &&
                    inplayFalse.map((_items, index) => {
                      let minLimitOdds, maxLimitOdds;
                      if (_items.inplay) {
                        minLimitOdds = _items?.inPlayMinLimit;
                        maxLimitOdds = _items?.inPlayMaxLimit;
                      } else {
                        minLimitOdds = _items?.offPlayMinLimit;
                        maxLimitOdds = _items?.offPlayMaxLimit;
                      }
                      return (
                        <>
                          {!_items?.runners?.[0]?.backPrice1 &&
                          !_items?.runners?.[1]?.backPrice1 &&
                          !_items?.runners?.[2]?.backPrice1 &&
                          !_items?.runners?.[0]?.layPrice1 &&
                          !_items?.runners?.[1]?.layPrice1 &&
                          !_items?.runners?.[2]?.layPrice1 ? (
                            <></>
                          ) : (
                            <div
                              key={index}
                              className="flex flex-col sm:flex-row justify-between items-center w-full border-b border-[#ddd] bg-white"
                            >
                              <div className="flex items-center justify-between gap-1 w-full py-1 px-2">
                                <div className="text-[#e4c41e] w-[18px]">
                                  {reactIcons.star}
                                </div>
                                <div
                                  onClick={() =>
                                    navigate(
                                      _items?.event_id
                                        ? `/dashboard/cricket/market/${_items?.event_id}`
                                        : `/dashboard/cricket/market/${_items?.matchId}`,
                                      {
                                        state: { data: _items },
                                      },
                                    )
                                  }
                                  className="flex-1 cursor-pointer leading-3 text-[#005ba2] text-12 font-bold hover:underline"
                                >
                                  {' '}
                                  {_items?.name}{' '}
                                </div>

                                <div className="flex flex-col text-10 text-[#0f2327] justify-end items-end ">
                                  <p className="leading-4">
                                    {moment(_items?.matchDateTime).format(
                                      'DD/MM/YYYY',
                                    )}
                                  </p>
                                  <p className="leading-4">
                                    {moment(_items?.matchDateTime).format(
                                      'hh:mm A',
                                    )}
                                  </p>
                                </div>
                              </div>
                              {_items?.runners?.[0]?.backPrice1 ||
                              _items?.runners?.[1]?.backPrice1 ||
                              _items?.runners?.[2]?.backPrice1 ||
                              _items?.runners?.[0]?.layPrice1 ||
                              _items?.runners?.[1]?.layPrice1 ||
                              _items?.runners?.[2]?.layPrice1 ? (
                                <div className="grid grid-cols-6  sm:min-w-[360px] min-w-[300px]">
                                  <div className="">
                                    {_items?.runners?.[0]?.backPrice1 ? (
                                      <BlueBtn
                                        onClick={() => {
                                          if (isLogin) {
                                            addToBetPlace(
                                              _items?.competition_name,
                                              _items?.event_id ||
                                                _items?.matchId,
                                              _items?.runners?.[0]?.selectionId,
                                              _items?.runners?.[0],
                                              'Cricket',
                                              _items?.runners?.[0]?.backPrice1,
                                              _items?.market_name,
                                              'BACK',
                                              _items?.name,
                                              _items?.market_id,
                                              _items?.runners,
                                              _items?.sportId,
                                              minLimitOdds,
                                              maxLimitOdds,
                                            );
                                          } else {
                                            setOpenModal(true);
                                          }
                                        }}
                                        text={
                                          _items?.runners?.[0]?.backPrice1 ||
                                          '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                  <div className="">
                                    {_items?.runners?.[0]?.layPrice1 ? (
                                      <PinkBtn
                                        onClick={() => {
                                          isLogin
                                            ? addToBetPlace(
                                                _items?.competition_name,
                                                _items?.event_id ||
                                                  _items?.matchId,
                                                _items?.runners?.[0]
                                                  ?.selectionId,
                                                _items?.runners?.[0],
                                                'Cricket',
                                                _items?.runners?.[0]?.layPrice1,
                                                _items?.market_name,
                                                'LAY',
                                                _items?.name,
                                                _items?.market_id,
                                                _items?.runners,
                                                _items?.sportId,
                                                minLimitOdds,
                                                maxLimitOdds,
                                              )
                                            : setOpenModal(true);
                                        }}
                                        text={
                                          _items?.runners?.[0]?.layPrice1 || '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                  <div className="">
                                    {_items?.runners?.[2]?.backPrice1 ? (
                                      <BlueBtn
                                        onClick={() => {
                                          isLogin
                                            ? addToBetPlace(
                                                _items?.competition_name,
                                                _items?.event_id ||
                                                  _items?.matchId,
                                                _items?.runners?.[2]
                                                  ?.selectionId,
                                                _items?.runners?.[2],
                                                'Cricket',
                                                _items?.runners?.[2]
                                                  ?.backPrice1,
                                                _items?.market_name,
                                                'BACK',
                                                _items?.name,
                                                _items?.market_id,
                                                _items?.runners,
                                                _items?.sportId,
                                                minLimitOdds,
                                                maxLimitOdds,
                                              )
                                            : setOpenModal(true);
                                        }}
                                        text={
                                          _items?.runners?.[2]?.backPrice1 ||
                                          '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                  <div className="">
                                    {_items?.runners?.[2]?.layPrice1 ? (
                                      <PinkBtn
                                        onClick={() => {
                                          isLogin
                                            ? addToBetPlace(
                                                _items?.competition_name,
                                                _items?.event_id ||
                                                  _items?.matchId,
                                                _items?.runners?.[2]
                                                  ?.selectionId,
                                                _items?.runners?.[2],
                                                'Cricket',
                                                _items?.runners?.[2]?.layPrice1,
                                                _items?.market_name,
                                                'LAY',
                                                _items?.name,
                                                _items?.market_id,
                                                _items?.runners,
                                                _items?.sportId,
                                                minLimitOdds,
                                                maxLimitOdds,
                                              )
                                            : setOpenModal(true);
                                        }}
                                        text={
                                          _items?.runners?.[2]?.layPrice1 || '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                  <div className="">
                                    {_items?.runners?.[1]?.backPrice1 ? (
                                      <BlueBtn
                                        onClick={() => {
                                          isLogin
                                            ? addToBetPlace(
                                                _items?.competition_name,
                                                _items?.event_id ||
                                                  _items?.matchId,
                                                _items?.runners?.[1]
                                                  ?.selectionId,
                                                _items?.runners?.[1],
                                                'Cricket',
                                                _items?.runners?.[1]
                                                  ?.backPrice1,
                                                _items?.market_name,
                                                'BACK',
                                                _items?.name,
                                                _items?.market_id,
                                                _items?.runners,
                                                _items?.sportId,
                                                minLimitOdds,
                                                maxLimitOdds,
                                              )
                                            : setOpenModal(true);
                                        }}
                                        text={
                                          _items?.runners?.[1]?.backPrice1 ||
                                          '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                  <div className="">
                                    {_items?.runners?.[1]?.layPrice1 ? (
                                      <PinkBtn
                                        onClick={() => {
                                          isLogin
                                            ? addToBetPlace(
                                                _items?.competition_name,
                                                _items?.event_id ||
                                                  _items?.matchId,
                                                _items?.runners?.[1]
                                                  ?.selectionId,
                                                _items?.runners?.[1],
                                                'Cricket',
                                                _items?.runners?.[1]?.layPrice1,
                                                _items?.market_name,
                                                'LAY',
                                                _items?.name,
                                                _items?.market_id,
                                                _items?.runners,
                                                _items?.sportId,
                                                minLimitOdds,
                                                maxLimitOdds,
                                              )
                                            : setOpenModal(true);
                                        }}
                                        text={
                                          _items?.runners?.[1]?.layPrice1 || '-'
                                        }
                                      />
                                    ) : (
                                      <BlankBtn />
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-6  sm:min-w-[360px] min-w-[300px]">
                                  <div
                                    onClick={() =>
                                      navigate(
                                        _items?.event_id
                                          ? `/dashboard/cricket/market/${_items?.event_id}`
                                          : `/dashboard/cricket/market/${_items?.matchId}`,
                                        {
                                          state: { data: _items },
                                        },
                                      )
                                    }
                                    className="col-span-6 flex-center"
                                  >
                                    <SeeMoreMarkets />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          {activeBetSlip == Number(_items?.matchId) &&
                            Number(_items?.matchId) ==
                              Number(bets[0]?.eventId) &&
                            isLogin &&
                            betData?.length > 0 &&
                            isMobile && <NewBetSlip />}
                        </>
                      );
                    })}
                </>
              )}
            </div>
          </div> */}
        </div>

        {openModal && <LoginModal open={openModal} setOpen={setOpenModal} />}
      </div>
    </>
  );
};

export default Cricket;
