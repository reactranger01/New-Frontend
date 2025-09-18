/* eslint-disable react-hooks/exhaustive-deps */
import { BlueBtn, NewBetSlip, PinkBtn } from '@/components';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '@/utils/apiHandlers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@/redux/actions';
import { isToday } from '@/utils/constants';
import moment from 'moment';
import { LoginModal, MobileGameHeader } from '@/containers/pageListAsync';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';

const MobileFixtureCricket = ({ type, fixtureData, isLoading }) => {
  const isLogin = isLoggedIn();
  /* eslint-disable */
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [bets, setBets] = useState([]);
  const dispatch = useDispatch();
  const betData = useSelector((state) => state.bet.selectedBet);
  const isMobile = useMediaQuery('(max-width:1024px)');
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);
  useEffect(() => {
    if (bets?.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
      dispatch(setActiveBetSlipIndex(bets[0]?.eventId));
    }
  }, [bets, dispatch]);

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

  const sortedInplayFalseMatches = fixtureData?.sort((a, b) => {
    return new Date(a.matchDateTime) - new Date(b.matchDateTime);
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const swipersRef = useRef([]);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const syncAllSwipers = () => {
    swipersRef.current.forEach((swiper) => {
      if (swiper && swiper.activeIndex !== activeIndex) {
        swiper.slideTo(activeIndex);
      }
    });
  };

  useEffect(() => {
    syncAllSwipers();
  }, [activeIndex]);
  return (
    <div className="cricket">
      <MobileGameHeader
        type={type}
        GameName={'Cricket'}
        inplayTrueData={fixtureData}
        inplayFalseData={sortedInplayFalseMatches}
      />
      {type == 'LiveMatches' ? (
        <>
          {fixtureData?.length === 0 && isLoading == false ? (
            ''
          ) : (
            <>
              {' '}
              {fixtureData &&
                fixtureData.map((_items, index) => {
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
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="grid grid-cols-3 flex-1 h-[40px]">
                          <div className="col-span-1 flex-center h-full text-red-500 text-[9px] border border-gray-100">
                            {/* Today 18:45 */}
                            <span className="bg-[#257b23] text-10 rounded-2xl px-2 leading-none py-1 text-white">
                              In Play
                            </span>
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
                            className="relative col-span-2 flex flex-col justify-center px-2 h-full text-10 border border-gray-100"
                          >
                            <>
                              {' '}
                              <p className="leading-3">
                                {_items?.runners[0]?.runnerName}
                              </p>
                              <p className="leading-3">
                                {' '}
                                {_items?.runners[1]?.runnerName}
                              </p>{' '}
                            </>

                            <span className="text-10 absolute right-1 top-1 text-[#257b23]">
                              {reactIcons.tv}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 w-[120px] ">
                          <Swiper
                            autoplay={{
                              delay: 3500,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            className="mySwiper w-[120px]"
                            onSwiper={(swiper) =>
                              (swipersRef.current[index] = swiper)
                            }
                            onSlideChange={() =>
                              handleSlideChange(swipersRef.current[index])
                            }
                            initialSlide={activeIndex}
                          >
                            <SwiperSlide>
                              <div className="grid grid-cols-3">
                                {_items?.runners?.[0]?.backPrice1 ? (
                                  <BlueBtn
                                    onClick={() => {
                                      if (isLogin) {
                                        addToBetPlace(
                                          _items?.competition_name,
                                          _items?.event_id || _items?.matchId,
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
                                    text={_items?.runners?.[0]?.backPrice1}
                                  />
                                ) : (
                                  <BlueBtn disabled={true} text={'-'} />
                                )}
                                {_items?.runners?.[2]?.backPrice1 ? (
                                  <BlueBtn
                                    onClick={() => {
                                      isLogin
                                        ? addToBetPlace(
                                            _items?.competition_name,
                                            _items?.event_id || _items?.matchId,
                                            _items?.runners?.[2]?.selectionId,
                                            _items?.runners?.[2],
                                            'Cricket',
                                            _items?.runners?.[2]?.backPrice1,
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
                                      _items?.runners?.[2]?.backPrice1 || '-'
                                    }
                                  />
                                ) : (
                                  <>
                                    <BlueBtn disabled={true} text={'-'} />
                                  </>
                                )}
                                {_items?.runners?.[1]?.backPrice1 ? (
                                  <BlueBtn
                                    onClick={() => {
                                      isLogin
                                        ? addToBetPlace(
                                            _items?.competition_name,
                                            _items?.event_id || _items?.matchId,
                                            _items?.runners?.[1]?.selectionId,
                                            _items?.runners?.[1],
                                            'Cricket',
                                            _items?.runners?.[1]?.backPrice1,
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
                                      _items?.runners?.[1]?.backPrice1 || '-'
                                    }
                                  />
                                ) : (
                                  <>
                                    <BlueBtn disabled={true} text={'-'} />
                                  </>
                                )}
                              </div>
                            </SwiperSlide>
                            <SwiperSlide>
                              <div className="grid grid-cols-3 w-[120px]">
                                {_items?.runners?.[0]?.layPrice1 ? (
                                  <PinkBtn
                                    onClick={() => {
                                      isLogin
                                        ? addToBetPlace(
                                            _items?.competition_name,
                                            _items?.event_id || _items?.matchId,
                                            _items?.runners?.[0]?.selectionId,
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
                                  <PinkBtn disabled={true} text={'-'} />
                                )}
                                {_items?.runners?.[2]?.layPrice1 ? (
                                  <PinkBtn
                                    onClick={() => {
                                      isLogin
                                        ? addToBetPlace(
                                            _items?.competition_name,
                                            _items?.event_id || _items?.matchId,
                                            _items?.runners?.[2]?.selectionId,
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
                                  <>
                                    <PinkBtn disabled={true} text={'-'} />
                                  </>
                                )}
                                {_items?.runners?.[1]?.layPrice1 ? (
                                  <PinkBtn
                                    onClick={() => {
                                      isLogin
                                        ? addToBetPlace(
                                            _items?.competition_name,
                                            _items?.event_id || _items?.matchId,
                                            _items?.runners?.[1]?.selectionId,
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
                                  <>
                                    <PinkBtn disabled={true} text={'-'} />
                                  </>
                                )}
                              </div>
                            </SwiperSlide>
                          </Swiper>
                        </div>
                      </div>
                      {activeBetSlip == Number(_items?.matchId) &&
                        Number(_items?.matchId) == Number(bets[0]?.eventId) &&
                        Number(_items?.sportId) == Number(bets[0]?.gameId) &&
                        isLoggedIn() &&
                        betData?.length > 0 &&
                        isMobile && <NewBetSlip />}
                    </>
                  );
                })}
            </>
          )}
        </>
      ) : (
        <>
          {sortedInplayFalseMatches?.length === 0 ? (
            <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
              <span className="text-12">
                Currently, no matches are available.
              </span>
            </div>
          ) : (
            <>
              {' '}
              {sortedInplayFalseMatches &&
                sortedInplayFalseMatches.map((_items, index) => {
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
                      {_items?.runners?.[0]?.backPrice1 ||
                      _items?.runners?.[1]?.backPrice1 ||
                      _items?.runners?.[2]?.backPrice1 ||
                      _items?.runners?.[0]?.layPrice1 ||
                      _items?.runners?.[1]?.layPrice1 ||
                      _items?.runners?.[2]?.layPrice1 ? (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="grid grid-cols-3 flex-1 h-[40px]">
                            {isToday(_items?.matchDateTime) ? (
                              <div className="col-span-1 flex-center h-full text-red-500 text-[9px] border border-gray-100">
                                Today{' '}
                                {moment(_items?.matchDateTime).format(
                                  'hh:mm A',
                                )}
                              </div>
                            ) : (
                              <div className="col-span-1 flex-col flex items-center justify-center h-full text-red-500 text-[9px] border border-gray-100">
                                <div className="leading-3 flex ">
                                  {moment(_items?.matchDateTime).format(
                                    'DD/MM/YYYY',
                                  )}
                                </div>
                                <div className="leading-3 flex ">
                                  {moment(_items?.matchDateTime).format(
                                    'hh:mm A',
                                  )}
                                </div>
                              </div>
                            )}{' '}
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
                              className="relative col-span-2 flex flex-col justify-center px-2 h-full text-10 border border-gray-100"
                            >
                              <p className="leading-3">
                                {_items?.runners[0]?.runnerName}
                              </p>
                              <p className="leading-3">
                                {' '}
                                {_items?.runners[1]?.runnerName}
                              </p>{' '}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 w-[120px] ">
                            <Swiper
                              autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                              }}
                              modules={[Autoplay]}
                              className="mySwiper w-[120px]"
                              onSwiper={(swiper) =>
                                (swipersRef.current[index] = swiper)
                              }
                              onSlideChange={() =>
                                handleSlideChange(swipersRef.current[index])
                              }
                              initialSlide={activeIndex}
                            >
                              <SwiperSlide>
                                <div className="grid grid-cols-3">
                                  {_items?.runners?.[0]?.backPrice1 ? (
                                    <BlueBtn
                                      onClick={() => {
                                        if (isLogin) {
                                          addToBetPlace(
                                            _items?.competition_name,
                                            _items?.event_id || _items?.matchId,
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
                                      text={_items?.runners?.[0]?.backPrice1}
                                    />
                                  ) : (
                                    <BlueBtn disabled={true} text={'-'} />
                                  )}
                                  {_items?.runners?.[2]?.backPrice1 ? (
                                    <BlueBtn
                                      onClick={() => {
                                        isLogin
                                          ? addToBetPlace(
                                              _items?.competition_name,
                                              _items?.event_id ||
                                                _items?.matchId,
                                              _items?.runners?.[2]?.selectionId,
                                              _items?.runners?.[2],
                                              'Cricket',
                                              _items?.runners?.[2]?.backPrice1,
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
                                        _items?.runners?.[2]?.backPrice1 || '-'
                                      }
                                    />
                                  ) : (
                                    <>
                                      <BlueBtn disabled={true} text={'-'} />
                                    </>
                                  )}
                                  {_items?.runners?.[1]?.backPrice1 ? (
                                    <BlueBtn
                                      onClick={() => {
                                        isLogin
                                          ? addToBetPlace(
                                              _items?.competition_name,
                                              _items?.event_id ||
                                                _items?.matchId,
                                              _items?.runners?.[1]?.selectionId,
                                              _items?.runners?.[1],
                                              'Cricket',
                                              _items?.runners?.[1]?.backPrice1,
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
                                        _items?.runners?.[1]?.backPrice1 || '-'
                                      }
                                    />
                                  ) : (
                                    <>
                                      <BlueBtn disabled={true} text={'-'} />
                                    </>
                                  )}
                                </div>
                              </SwiperSlide>
                              <SwiperSlide>
                                <div className="grid grid-cols-3 w-[120px]">
                                  {_items?.runners?.[0]?.layPrice1 ? (
                                    <PinkBtn
                                      onClick={() => {
                                        isLogin
                                          ? addToBetPlace(
                                              _items?.competition_name,
                                              _items?.event_id ||
                                                _items?.matchId,
                                              _items?.runners?.[0]?.selectionId,
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
                                    <PinkBtn disabled={true} text={'-'} />
                                  )}
                                  {_items?.runners?.[2]?.layPrice1 ? (
                                    <PinkBtn
                                      onClick={() => {
                                        isLogin
                                          ? addToBetPlace(
                                              _items?.competition_name,
                                              _items?.event_id ||
                                                _items?.matchId,
                                              _items?.runners?.[2]?.selectionId,
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
                                    <>
                                      <PinkBtn disabled={true} text={'-'} />
                                    </>
                                  )}
                                  {_items?.runners?.[1]?.layPrice1 ? (
                                    <PinkBtn
                                      onClick={() => {
                                        isLogin
                                          ? addToBetPlace(
                                              _items?.competition_name,
                                              _items?.event_id ||
                                                _items?.matchId,
                                              _items?.runners?.[1]?.selectionId,
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
                                    <>
                                      <PinkBtn disabled={true} text={'-'} />
                                    </>
                                  )}
                                </div>
                              </SwiperSlide>
                            </Swiper>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {activeBetSlip == Number(_items?.matchId) &&
                        Number(_items?.matchId) == Number(bets[0]?.eventId) &&
                        Number(_items?.sportId) == Number(bets[0]?.gameId) &&
                        isLoggedIn() &&
                        betData?.length > 0 &&
                        isMobile && <NewBetSlip />}
                    </>
                  );
                })}
            </>
          )}
        </>
      )}
      {openModal && <LoginModal open={openModal} setOpen={setOpenModal} />}
    </div>
  );
};
MobileFixtureCricket.propTypes = {
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fixtureData: PropTypes.array.isRequired,
};

export default MobileFixtureCricket;
