/* eslint-disable  */
import {
  BlueBtn,
  Loading,
  NewBetSlip,
  PinkBtn,
  SuspendedBtn,
} from '@/components';
import { LoginModal, MobileSessionBetRisk } from '@/containers/pageListAsync';
import { fetchBetDetailsAction } from '@/redux/actions';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import {
  calcPlacedBetBookmakerCricketalculation,
  calcPlacedBetOddsCriketCalculation,
  fetchEventData,
  getUserBets,
  transformBookmakerData,
  updatePlacedBetCalculation,
} from '@/utils/helper';
import { reactIcons } from '@/utils/icons';
import { logout } from '@/utils/logout';
import { intToString } from '@/utils/margeData';
import { useMediaQuery } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import InnerHeading from '../InnerHeading';
import { openModal } from '@/redux/Slices/modalSlice';
import MobOpenBets from '@/components/MobOpenBets';

const MobCricket = () => {
  const [innerHeadTab, setInnerHeadTab] = useState(1);

  const [matchOdd, setMatchOdd] = useState(false);
  const [isLiveMobile, setIsLiveMobile] = useState(false);
  const [singleRowData, setSingleRowData] = useState({});
  const isLogin = isLoggedIn();
  const location = useLocation();
  const { eventId } = useParams();
  const matchData = location.state?.data;
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const betData = useSelector((state) => state.bet.selectedBet);
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);
  const isMobile = useMediaQuery('(max-width:1024px)');
  const userIdBalance = useSelector((state) => state?.user);
  const userIdBalancetv = useSelector((state) => state?.user?.balance);
  // eslint-disable-next-line
  const [usersBets, setusersBets] = useState({});
  const [isLiveTv, setIsLiveTV] = useState(false);
  const islogin = isLoggedIn();
  const userType = useSelector((state) => state?.user?.userType);
  const [isPlacedBetStatsCalc, setPlacedBetStatsCalc] = useState(true);

  const [bets, setBets] = useState([]);
  const dispatch = useDispatch();
  const betsFancy = useSelector((state) => state.bet.selectedBet);
  const [oddsData, setOddsData] = useState([]);
  // eslint-disable-next-line
  const [fancyData, setFancyData] = useState([]);
  const [bookmakerData, setBookmakerData] = useState({});
  const [matchOddsMarket, setMatchOddsMarket] = useState();
  const [particularMatchData, setParticularMatchData] = useState({});
  const [placedBetWinLossDatas, setPlacedBetWinLossData] = useState({});
  const [placedBetWinLossBookmakerData, setPlacedBetWinLossBookmakerData] =
    useState({});
  const [sessionBooksetClcuData, setSessionBooksetClcuData] = useState([]);
  const [bookmakerTransformData, setBookmakerTransformData] = useState();
  const calculation = useSelector((state) => state?.calculation?.currentValue);
  const updatedCalculationBookmaker = calculation
    ? updatePlacedBetCalculation(
        calculation,
        'bookmaker',
        placedBetWinLossBookmakerData,
      )
    : placedBetWinLossBookmakerData;
  const updatedCalculationMatchOdds = calculation
    ? updatePlacedBetCalculation(
        calculation,
        'Match Odds',
        placedBetWinLossDatas,
      )
    : placedBetWinLossDatas;
  const stateUpdate = useSelector(
    (state) => state?.updatestate?.betPlacementSuccess,
  );
  useEffect(() => {
    if (bets?.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
      dispatch(setActiveBetSlipIndex(bets[0]?.selectionId));
    }
  }, [bets, dispatch]);
  const handleLiveScoreMobile = () => {
    setIsLiveMobile(!isLiveMobile);
    setIsLiveTV(false);
  };
  const handleLiveTV = () => {
    setIsLiveTV(!isLiveTv);
    setIsLiveMobile(false);
  };
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  const timeoutRef = useRef(null);

  const getCricketEventData = () => {
    fetchEventData('cricket', eventId, {
      setLoading,
      setLoaderOneTime,
      setOddsData,
      setBookmakerData,
      setFancyData,
      setSessionData,
      setMatchOddsMarket,
      setParticularMatchData,
    });
  };

  useEffect(() => {
    const fetchDataWithDynamicDelay = async () => {
      getCricketEventData();
      const inplay = matchData?.inplay;
      const delay = isLogin ? (inplay ? 400 : 5000) : 5000;

      timeoutRef.current = setTimeout(() => {
        fetchDataWithDynamicDelay();
      }, delay);
    };
    fetchDataWithDynamicDelay();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line
  }, [eventId, isLogin]);
  useEffect(() => {
    const fetchUserBets = async () => {
      if (islogin && eventId) {
        try {
          const allUserBets = await getUserBets(eventId);
          setusersBets(allUserBets);
        } catch (error) {
          console.error('Error fetching user bets:', error);
        }
      }
    };
    fetchUserBets();
  }, [eventId, stateUpdate, islogin]);

  useEffect(() => {
    if (usersBets?.bets && matchOddsMarket && oddsData && eventId) {
      const calculationODDSData = calcPlacedBetOddsCriketCalculation(
        usersBets?.bets,
        matchOddsMarket,
        oddsData,
        eventId,
      );
      setPlacedBetWinLossData(calculationODDSData);
      setPlacedBetStatsCalc(true);
    }
    if (usersBets?.bets && bookmakerTransformData && eventId) {
      const calculationBookmakerData = calcPlacedBetBookmakerCricketalculation(
        usersBets?.bets,
        bookmakerTransformData[0],
        eventId,
      );
      setPlacedBetWinLossBookmakerData(calculationBookmakerData);
    }
    if (oddsData?.runners?.[0]?.status == 'CLOSED') {
      const timer = setTimeout(() => {
        navigate(-1);
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [
    usersBets?.bets,
    isPlacedBetStatsCalc,
    matchOddsMarket,
    oddsData,
    eventId,
  ]);

  const getEventDataSessions = async () => {
    try {
      const response = await getAuthData(
        `/user/getSessionBookSetCalc?eventId=${eventId}&gameType=session&gameId=4`,
      );
      if (response?.status === 201 || response?.status === 200) {
        if (response?.data) {
          const convertedData = response?.data;
          setSessionBooksetClcuData(convertedData);
        }
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  useEffect(() => {
    if (islogin) {
      getEventDataSessions();
    }
    //eslint-disable-next-line
  }, [stateUpdate, islogin]);

  useEffect(() => {
    if (bookmakerData) {
      const transformedData = transformBookmakerData(bookmakerData);
      setBookmakerTransformData(transformedData);
    }
    // eslint-disable-next-line
  }, [bookmakerData]);

  const addToBetPlace = (
    eventId,
    selectionId,
    betDetails,
    game,
    OddsPrice,
    betType,
    selectType,
    _marketData,
    minBetLimit,
    maxBetLimit,
  ) => {
    if (isLogin) {
      if (OddsPrice > 1) {
        setBets([
          {
            marketId: String(oddsData?.market_id),
            eventId: Number(eventId),
            gameId: Number(oddsData?.sportId),
            selectionId: String(selectionId),
            betOn: selectType,
            price: parseFloat(OddsPrice),
            stake: '',
            eventType: game,
            competition: matchData?.competition_name,
            event: oddsData?.name,
            market:
              _marketData.market_name ||
              (_marketData.marketName == 'Bookmaker'
                ? 'bookmaker'
                : _marketData.marketName),
            gameType:
              _marketData.market_name ||
              (_marketData.marketName == 'Bookmaker'
                ? 'bookmaker'
                : _marketData.marketName),
            nation: betDetails,
            type: selectType,
            calcFact: 0,
            bettingOn: betType == 'Bookmaker' ? 'bookmaker' : betType,
            runners: 2,
            row: 1,
            matchName: oddsData?.name,
            percent: 100,
            selection: betDetails,
            minimumBet: minBetLimit,
            maximumBet: maxBetLimit,
            _marketData,
          },
        ]);
      } else {
        toast.error('Market not available');
      }
    } else {
      dispatch(openModal('login'));
    }
  };

  const addToBetPlaceBookmaker = (
    eventId,
    selectionId,
    betDetails,
    game,
    OddsPrice,
    betType,
    selectType,
    _marketData,
    marketType,
    minimumBet,
    maximumBet,
  ) => {
    if (isLogin) {
      if (OddsPrice > 1) {
        setBets([
          {
            marketId: String(oddsData?.market_id),
            eventId: Number(eventId),
            gameId: 4,
            selectionId: String(selectionId),
            betOn: selectType,
            price: parseFloat(OddsPrice),
            stake: '',
            eventType: game,
            competition: matchData?.competition_name,
            event: matchData?.name,
            market: 'bookmaker',
            gameType: 'bookmaker',
            nation: betDetails,
            type: selectType,
            calcFact: 0,
            bettingOn: 'bookmaker',
            runners: 2,
            row: 1,
            matchName: matchData?.name,
            percent: 100,
            selection: betDetails,
            minimumBet: minimumBet,
            maximumBet: maximumBet,
            _marketData,
          },
        ]);
      } else {
        toast.error('Market not available');
      }
    } else {
      dispatch(openModal('login'));
    }
  };

  const addToNormalBetPlace = async (
    item,
    betType,
    index,
    price,
    betOn,
    matchName,
    percent,
    nationName,
    fancy,
    minimumBet,
    maximumBet,
  ) => {
    if (isLogin) {
      dispatch(
        fetchBetDetailsAction([
          {
            marketId: String(particularMatchData?.marketId),
            eventId: Number(fancy?.eventId),
            gameId: 4,
            selectionId: String(item.SelectionId),
            betOn: betType,
            price: parseFloat(price),
            stake: '',
            eventType: 'Cricket',
            competition: matchData?.competition_name,
            event: particularMatchData?.eventName,
            market: fancy.market,
            gameType: betOn,
            nation: nationName,
            type: betType,
            runners: 2,
            row: index,
            calcFact: betOn === 'fancy' ? 0 : 1,
            bettingOn: betOn,
            matchName: matchName,
            percent: parseFloat(percent),
            selection: item.RunnerName,
            minimumBet: minimumBet,
            maximumBet: maximumBet,
            _marketData: fancy,
          },
        ]),
      );
      dispatch(setActiveBetSlipIndex(Number(item.SelectionId)));

      // if (!isMobile) {
      //   window.scrollTo({
      //     top: 0,
      //     left: 0,
      //     behavior: 'smooth',
      //   });
      // }
    } else {
      dispatch(openModal('login'));
    }
  };

  const handleShowSessionRisk = (session) => {
    setIsOpen(true);
    setSingleRowData({
      gameId: 4,
      eventId: eventId,
      selectionId: session?.SelectionId,
      userId: userIdBalance?.id,
      gameType: session?.gtype,
      commision: userIdBalance?.ap,
      RunnerName: session?.RunnerName,
    });
  };

  useEffect(() => {
    if (isLiveTv) {
      const disableRightClick = (e) => e.preventDefault();
      document.addEventListener('contextmenu', disableRightClick);
      const checkDevTools = () => {
        const threshold = 160;
        if (
          window.outerWidth - window.innerWidth > threshold ||
          window.outerHeight - window.innerHeight > threshold
        ) {
          window.location.replace('https://www.google.com');
          logout();
        }
      };
      const devToolsInterval = setInterval(checkDevTools, 1000);
      return () => {
        document.removeEventListener('contextmenu', disableRightClick);
        clearInterval(devToolsInterval);
      };
    }
  }, [isLiveTv]);

  let minLimitBookmaker, maxLimitBookmaker;
  const matchDataBook = matchOddsMarket?.catalogue?.[0];
  if (matchDataBook?.inplay) {
    minLimitBookmaker = matchDataBook?.inPlayBookMinLimit;
    maxLimitBookmaker = matchDataBook?.inPlayBookMaxLimit;
  } else {
    minLimitBookmaker = matchDataBook?.offPlayBookMinLimit;
    maxLimitBookmaker = matchDataBook?.offPlayBookMaxLimit;
  }
  let minLimitsession, maxLimitsession;
  if (matchDataBook?.inplay) {
    minLimitsession = matchDataBook?.inPlayFancyMinLimit;
    maxLimitsession = matchDataBook?.inPlayFancyMaxLimit;
  } else {
    minLimitsession = matchDataBook?.offPlayFancyMinLimit;
    maxLimitsession = matchDataBook?.offPlayFancyMaxLimit;
  }

  return (
    <>
      {isLoading && !loaderOneTime && <Loading />}
      <div className="min-h-[550px]">
        <div
          className={`w-full md:p-1 p-0 md:mt-2 mt-0 shadow-md ${
            isLiveMobile ? '' : 'hidden'
          }`}
        >
          <iframe
            src={
              isLiveMobile
                ? `https://score.hr08bets.in/api?eventid=${eventId}`
                : ''
            }
            title="description"
            style={{ width: '100%', height: '250px', overflow: 'scroll' }}
          ></iframe>
        </div>
        <div
          className={`w-full md:p-1 p-0 md:mt-2 mt-0 shadow-md ${
            isLiveTv ? '' : 'hidden'
          }`}
        >
          <iframe
            src={
              isLiveTv
                ? `https://hr08bets.in/sports-stream-live/index.html?eventid=${eventId}`
                : ''
            }
            allow="autoplay; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-popups"
            title="description"
            className="w-full"
            style={{
              aspectRatio: '16/9',
            }}
          ></iframe>
        </div>
        <div className="my-2">
          <InnerHeading
            activeTab={innerHeadTab}
            setActiveTab={setInnerHeadTab}
          />
        </div>
        {innerHeadTab === 1 ? (
          <>
            {oddsData?.runners?.length > 0 ? (
              <div className="matchodds    rounded-lg mb-3 ">
                <div className="bg-[#eceaea]  flex items-center justify-between py-1">
                  <div className="font-bold flex items-center gap-1 text-12 pl-1">
                    <span className="text-sm text-black">
                      {reactIcons.star}
                    </span>{' '}
                    Match Odds
                  </div>
                  <div className="w-[132px]  grid grid-cols-2 text-12 font-[900] text-black">
                    <p className="mx-auto">BACK</p>
                    <p className="mx-auto">LAY</p>
                  </div>
                </div>
                {oddsData === null || oddsData?.runners?.length === 0 ? (
                  <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
                    <span className="text-12">
                      Odds data is currently unavailable for this match.
                    </span>
                  </div>
                ) : (
                  <>
                    {oddsData &&
                      oddsData?.runners &&
                      oddsData?.runners?.map((items, index) => {
                        const matchOddsExposer =
                          updatedCalculationMatchOdds?.type == 'odds' &&
                          updatedCalculationMatchOdds?.exposer != ''
                            ? updatedCalculationMatchOdds?.exposer?.find(
                                (odd) => odd?.id == items?.selectionId,
                              )
                            : '';
                        let minLimitOdds, maxLimitOdds;
                        if (oddsData.inplay) {
                          minLimitOdds = oddsData?.inPlayMinLimit;
                          maxLimitOdds = oddsData?.inPlayMaxLimit;
                        } else {
                          minLimitOdds = oddsData?.offPlayMinLimit;
                          maxLimitOdds = oddsData?.offPlayMaxLimit;
                        }
                        return (
                          <>
                            <div
                              key={index}
                              className="flex bg-white items-center justify-between border-b border-gray-100"
                            >
                              <div className="">
                                <div className="flex-1 text-black pl-2 text-12 font-lato font-bold">
                                  {items?.runnerName}
                                </div>
                                <div
                                  className={`flex items-center gap-1 justify-start  font-semibold pl-2 text-14 ${
                                    matchOddsExposer &&
                                    matchOddsExposer?.type == 'profit'
                                      ? 'text-green-700'
                                      : 'text-[#CE2C16]'
                                  }`}
                                >
                                  {matchOddsExposer ? (
                                    <>
                                      {reactIcons?.doubleArrowR}{' '}
                                      {Number(
                                        matchOddsExposer?.data || 0,
                                      ).toFixed(2)}
                                    </>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                              <div className="w-[132px] grid grid-cols-2">
                                <BlueBtn
                                  onClick={async () => {
                                    await addToBetPlace(
                                      oddsData?.eventid || oddsData?.matchId,
                                      items?.selectionId,
                                      items?.runnerName,
                                      'Cricket',
                                      items?.backPrice1 ||
                                        items?.back?.[0]?.price,
                                      oddsData?.market_name,
                                      'BACK',
                                      oddsData,
                                      minLimitOdds,
                                      maxLimitOdds,
                                    );
                                  }}
                                  text={items?.backPrice1 || '-'}
                                  size={
                                    items?.backsize1 && items?.backPrice1
                                      ? intToString(items?.backsize1 || 0)
                                      : ''
                                  }
                                  disabled={items?.backPrice1 ? false : true}
                                  css="w-[65px] mx-auto"
                                />
                                <PinkBtn
                                  onClick={async () => {
                                    await addToBetPlace(
                                      oddsData?.eventid || oddsData?.matchId,
                                      items?.selectionId,
                                      items?.runnerName,
                                      'Cricket',
                                      items?.layPrice1 ||
                                        items?.lay?.[0]?.price,
                                      oddsData?.market_name,
                                      'LAY',
                                      oddsData,
                                      minLimitOdds,
                                      maxLimitOdds,
                                    );
                                  }}
                                  text={items?.layPrice1 || '-'}
                                  size={
                                    items?.laysize1 && items?.layPrice1
                                      ? intToString(items?.laysize1 || 0)
                                      : ''
                                  }
                                  disabled={items?.layPrice1 ? false : true}
                                  css="w-[65px] mx-auto"
                                />
                              </div>
                            </div>

                            {activeBetSlip == Number(items?.selectionId) &&
                              Number(items?.selectionId) ==
                                Number(bets[0]?.selectionId) &&
                              isLoggedIn() &&
                              betData?.length > 0 &&
                              isMobile && <NewBetSlip />}
                          </>
                        );
                      })}
                    <div className="flex justify-between">
                      <div></div>
                      <div className="w-[138px] relative overflow-hidden">
                        <div className="grid grid-cols-2 my-1 leading-none text-12 font-medium whitespace-nowrap  ">
                          <div className="text-right pr-1">
                            Min : {oddsData?.inPlayMinLimit}
                          </div>
                          <div className="border-l pl-1 border-black ">
                            Min : {oddsData?.inPlayMaxLimit}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              ''
            )}
            {/* {bookmakerTransformData?.[0]?.runners?.length > 0 ? (
          <div className="matchoddsbookmaker bg-white rounded-lg mb-3">
            <div className="bg-[#eceaea] flex items-center justify-between py-1">
              <div className="font-bold  text-12 pl-1">
                {' '}
                Match Odds (Bookmaker)
              </div>
              <div className="w-[132px]  grid grid-cols-2 text-12 font-[900] text-black">
                <p className="mx-auto">BACK</p>
                <p className="mx-auto">LAY</p>
              </div>
            </div>

            {bookmakerTransformData === null ||
            bookmakerTransformData?.[0]?.runners?.length === 0 ? (
              <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
                <span className="text-12">
                  Bookmaker data is currently unavailable for this match.
                </span>
              </div>
            ) : (
              <>
                {bookmakerTransformData &&
                  bookmakerTransformData[0]?.runners &&
                  bookmakerTransformData[0]?.runners.map((items, index) => {
                    const bookmakerExposer =
                      updatedCalculationBookmaker?.type == 'bookmaker' &&
                      updatedCalculationBookmaker?.exposer != ''
                        ? updatedCalculationBookmaker?.exposer?.find(
                            (odd) => odd?.id == items?.selectionId,
                          )
                        : '';

                    return (
                      <>
                        <div
                          key={index}
                          className="flex items-center justify-between border-b border-gray-100"
                        >
                          <div className="">
                            <div className="flex-1 text-black pl-2 text-12 font-lato font-bold">
                              {items?.runnerName}
                            </div>
                            <div
                              className={`flex items-center gap-1 justify-start  font-semibold pl-2 text-14 ${
                                bookmakerExposer &&
                                bookmakerExposer?.type == 'profit'
                                  ? 'text-green-700'
                                  : 'text-[#CE2C16]'
                              }`}
                            >
                              {bookmakerExposer ? (
                                <>
                                  {reactIcons?.doubleArrowR}{' '}
                                  {Number(bookmakerExposer?.data || 0).toFixed(
                                    2,
                                  )}
                                </>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                          <div className="relative w-[132px] ">
                            <div className="grid grid-cols-2">
                              <BlueBtn
                                onClick={async () => {
                                  if (isLogin) {
                                    await addToBetPlaceBookmaker(
                                      bookmakerTransformData['0']?.EventID,
                                      items?.selectionId,
                                      items?.runnerName,
                                      'Cricket',
                                      items?.backPrice1,
                                      bookmakerTransformData?.marketName,
                                      'BACK',
                                      bookmakerTransformData,
                                      'BOOKMAKERS',
                                      minLimitBookmaker,
                                      maxLimitBookmaker,
                                    );
                                  } else {
                                    setOpenModal(true);
                                  }
                                }}
                                text={items?.backPrice1 || '0'}
                                size={
                                  items?.backsize1 && items?.backPrice1
                                    ? intToString(items?.backsize1)
                                    : '0'
                                }
                                disabled={items?.backPrice1 ? false : true}
                                css="w-[65px] mx-auto"
                              />
                              <PinkBtn
                                onClick={async () => {
                                  if (isLogin) {
                                    await addToBetPlaceBookmaker(
                                      bookmakerTransformData['0']?.EventID,
                                      items?.selectionId,
                                      items?.runnerName,
                                      'Cricket',
                                      items?.layPrice1,
                                      bookmakerTransformData?.marketName,
                                      'LAY',
                                      bookmakerTransformData,
                                      'BOOKMAKERS',
                                      minLimitBookmaker,
                                      maxLimitBookmaker,
                                    );
                                  } else {
                                    setOpenModal(true);
                                  }
                                }}
                                text={items?.layPrice1 || '-'}
                                size={
                                  items?.laysize1 && items?.layPrice1
                                    ? intToString(items?.laysize1)
                                    : '0'
                                }
                                disabled={items?.layPrice1 ? false : true}
                                css="w-[65px] mx-auto"
                              />
                            </div>
                            {items?.status !== '' &&
                              items?.status !== 'ACTIVE' && (
                                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                                  <SuspendedBtn status={items?.status} />
                                </div>
                              )}
                          </div>
                        </div>
                        
                        {activeBetSlip == Number(items?.selectionId) &&
                          Number(items?.selectionId) ==
                            Number(bets[0]?.selectionId) &&
                          isLoggedIn() &&
                          betData?.length > 0 &&
                          isMobile && <NewBetSlip />}
                      </>
                    );
                  })}
              </>
            )}
          </div>
        ) : (
          ''
        )} */}

            {sessionData?.catalogue?.[0]?.runners?.length > 0 && (
              <div>
                <div className="bg-[#eceaea] flex items-center justify-between py-1">
                  <div className="font-bold  text-12 pl-1">Fancy</div>
                  <div className="w-[132px]  grid grid-cols-2 text-12 font-[900] text-black">
                    <p className="mx-auto">BACK</p>
                    <p className="mx-auto">LAY</p>
                  </div>
                </div>
                {sessionData === null ||
                sessionData?.catalogue?.[0]?.runners?.length === 0 ? (
                  <div className="flex mb-16 justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
                    <span className="text-12">
                      Sessions data is currently unavailable for this match.
                    </span>
                  </div>
                ) : (
                  <>
                    {sessionData &&
                      sessionData?.catalogue?.[0] &&
                      sessionData?.catalogue?.[0]?.runners?.map(
                        (items, index) => {
                          const profitLoss = Array.isArray(
                            sessionBooksetClcuData,
                          )
                            ? sessionBooksetClcuData.find(
                                (fancy) =>
                                  Number(fancy.selection_id) ===
                                  Number(items?.SelectionId),
                              )
                            : null;

                          return (
                            <>
                              <div
                                key={index}
                                className={`flex items-center justify-between border-b border-gray-100 bg-white  my-1 ${
                                  index == index - 1 && 'mb-16'
                                }`}
                              >
                                <div className="leading-1 w-[55%] ">
                                  <div className="flex-1 text-black pl-2 text-12 font-lato font-bold">
                                    {items?.RunnerName}
                                  </div>
                                  <div className="flex gap-[2px] ">
                                    {profitLoss?.max_loss && (
                                      <span className="text-12 text-black">
                                        Max Exposure:
                                      </span>
                                    )}
                                    <span
                                      className={`text-12  font-semibold ${
                                        profitLoss?.max_loss > 0
                                          ? 'text-green-500'
                                          : 'text-red-500'
                                      }`}
                                    >
                                      {profitLoss?.max_loss.toFixed(2)}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex">
                                  {isLogin && (
                                    <div
                                      onClick={() => {
                                        if (profitLoss) {
                                          handleShowSessionRisk(items);
                                        }
                                      }}
                                      className={` ${
                                        profitLoss
                                          ? 'text-black'
                                          : '!text-[#7c7979]'
                                      } text-15 flex justify-center items-center`}
                                    >
                                      {reactIcons?.dladder}
                                    </div>
                                  )}

                                  <div className=" relative w-[132px]">
                                    <div className="grid grid-cols-2">
                                      <PinkBtn
                                        onClick={async () => {
                                          if (isLogin) {
                                            await addToNormalBetPlace(
                                              items,
                                              'LAY',
                                              index,
                                              items.LayPrice1,
                                              sessionData.market,
                                              matchData?.name,
                                              items.LaySize1,
                                              items.RunnerName,
                                              sessionData,
                                              minLimitsession,
                                              maxLimitsession,
                                            );
                                          } else {
                                            setOpenModal(true);
                                          }
                                        }}
                                        text={items?.LayPrice1 || '0'}
                                        size={
                                          items?.LaySize1 && items?.LayPrice1
                                            ? intToString(items?.LaySize1)
                                            : '0'
                                        }
                                        disabled={
                                          items?.LayPrice1 ? false : true
                                        }
                                        css="w-[65px] mx-auto"
                                      />
                                      <BlueBtn
                                        onClick={async () => {
                                          if (isLogin) {
                                            await addToNormalBetPlace(
                                              items,
                                              'BACK',
                                              index,
                                              items.BackPrice1,
                                              sessionData.market,
                                              matchData?.name,
                                              items.BackSize1,
                                              items.RunnerName,
                                              sessionData,
                                              minLimitsession,
                                              maxLimitsession,
                                            );
                                          } else {
                                            setOpenModal(true);
                                          }
                                        }}
                                        text={items?.BackPrice1 || '0'}
                                        size={
                                          items?.BackSize1 && items?.BackPrice1
                                            ? intToString(items?.BackSize1)
                                            : '0'
                                        }
                                        disabled={
                                          items?.BackPrice1 ? false : true
                                        }
                                        css="w-[65px] mx-auto"
                                      />
                                    </div>
                                    {items?.GameStatus !== '' &&
                                      items?.GameStatus !== 'ACTIVE' && (
                                        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                                          <SuspendedBtn
                                            status={items?.GameStatus}
                                          />
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>

                              {activeBetSlip == items?.SelectionId &&
                                Number(items?.SelectionId) ==
                                  Number(betsFancy[0]?.selectionId) &&
                                isLoggedIn() &&
                                betData?.length > 0 &&
                                isMobile && <NewBetSlip />}
                            </>
                          );
                        },
                      )}
                  </>
                )}
              </div>
            )}
            {singleRowData && (
              <MobileSessionBetRisk
                isOpen={isOpen}
                closeModal={closeModal}
                singleRowData={singleRowData}
              />
            )}
          </>
        ) : innerHeadTab === 2 ? (
          <MobOpenBets eventId={eventId} sport={'cricket'} />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default MobCricket;
