/* eslint-disable react-hooks/exhaustive-deps */
import { BetSlip, BookMaker, Loading, MatchOdds } from '@/components';
import Sessions from '@/components/SingleBet/Sessions';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { logout } from '@/utils/logout';
import {
  calcPlacedBetBookmakerCricketalculation,
  calcPlacedBetOddsCriketCalculation,
  fetchEventData,
  getUserBets,
  transformBookmakerData,
} from '@/utils/helper';
const CricketMarket = () => {
  const isLogin = isLoggedIn();
  const location = useLocation();
  const { eventId } = useParams();
  const matchData = location.state?.data;
  // eslint-disable-next-line
  // eslint-disable-next-line
  const betData = useSelector((state) => state.bet.selectedBet);
  const userIdBalance = useSelector((state) => state?.user?.balance);
  const userType = useSelector((state) => state?.user?.userType);
  const [isLiveMobile, setIsLiveMobile] = useState(false);
  const [isLiveTv, setIsLiveTV] = useState(false);
  const islogin = isLoggedIn();
  const [loading, setLoading] = useState(false);
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  const [isPlacedBetStatsCalc, setPlacedBetStatsCalc] = useState(true);
  const [oddsData, setOddsData] = useState([]);
  const [usersBets, setusersBets] = useState({});
  // eslint-disable-next-line
  const [fancyData, setFancyData] = useState([]);
  const [sessionData, setSessionData] = useState({});
  const [bookmakerData, setBookmakerData] = useState({});
  const [matchOddsMarket, setMatchOddsMarket] = useState();
  const [particularMatchData, setParticularMatchData] = useState({});
  const [placedBetWinLossDatas, setPlacedBetWinLossData] = useState({});
  const [placedBetWinLossBookmakerData, setPlacedBetWinLossBookmakerData] =
    useState({});
  const [sessionBooksetClcuData, setSessionBooksetClcuData] = useState([]);
  const [bookmakerTransformData, setBookmakerTransformData] = useState();
  const navigate = useNavigate();
  const stateUpdate = useSelector(
    (state) => state?.updatestate?.betPlacementSuccess,
  );
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

  const handleLiveScoreMobile = () => {
    setIsLiveMobile(!isLiveMobile);
    setIsLiveTV(false);
  };
  const handleLiveTV = () => {
    setIsLiveTV(!isLiveTv);
    setIsLiveMobile(false);
  };

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

  return (
    <>
      {loading && !loaderOneTime && <Loading />}
      <div className="min-h-[100vh] w-full my-2 flex lg:gap-4">
        <div className="flex-1">
          <div className="bg-[#0f2327] flex items-center justify-between text-white w-full py-3 px-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="text-white">{reactIcons.play}</div>
              <div>
                {' '}
                <h1 className="text-24">{matchData?.name}</h1>
                <p className="text-[#FAFAFA80] text-12 mt-1">
                  {matchData?.competition_name}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              {matchData?.odds?.inplay ? (
                <div className="flex-center text-green-400 gap-1 text-10 ">
                  <span className="text-green-400 text-14">
                    {reactIcons.play}
                  </span>
                  In-Play
                </div>
              ) : (
                <div className="text-12">
                  {moment(matchData?.matchDateTime).format(
                    'DD/MM/YYYY hh:mm A',
                  )}
                </div>
              )}
              {isLogin &&
              userIdBalance > 0 &&
              userType !== 'DEMO' &&
              matchData?.inplay ? (
                <button
                  onClick={handleLiveTV}
                  className="bg-[#00A725] flex p-2 rounded-md gap-1 items-center ml-auto w-auto "
                >
                  {reactIcons.tv}
                  <span className="text-xs">Live Tv</span>
                </button>
              ) : (
                <button className="ml-auto w-auto"></button>
              )}
              {isLogin &&
              userIdBalance > 0 &&
              userType !== 'DEMO' &&
              matchData?.inplay ? (
                <button
                  // onClick={handleButtonClick}
                  onClick={handleLiveScoreMobile}
                  className="bg-[#00A725] flex p-2 rounded-md gap-1 items-center ml-auto w-auto "
                >
                  <img
                    src="/images/live-match.png"
                    alt="live-tv"
                    className="w-5 "
                  />
                  <span className="text-xs">Live Score</span>
                </button>
              ) : (
                <button className="ml-auto w-auto"></button>
              )}
              {/* </>
              )} */}
            </div>
          </div>
          <div
            className={`w-full md:p-1 p-0 md:mt-2 mt-0 shadow-md ${
              isLiveMobile ? '' : 'hidden'
            }`}
          >
            <iframe
              // src={`https://diamondapi.uk/dcasino/sr.php?eventid=${eventId}&sportid=1`}
              src={
                isLiveTv
                  ? `https://score.hr08bets.in/api?eventid=${eventId}`
                  : ''
              }
              title="description"
              style={{ width: '100%', height: '518px' }}
            ></iframe>
          </div>
          <div
            className={`w-full md:p-1 p-0 md:mt-2 mt-0 shadow-md ${
              isLiveTv ? '' : 'hidden'
            }`}
          >
            <iframe
              // src={`https://diamondapi.uk/dcasino/sr.php?eventid=${eventId}&sportid=1`}
              src={
                isLiveTv
                  ? `https://hr08bets.in/sports-stream-live/index.html?eventid=${eventId}`
                  : ''
              }
              allow="autoplay; fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups"
              title="description"
              style={{ width: '100%', height: '518px' }}
            ></iframe>
          </div>
          <MatchOdds
            heading="MATCH ODDS"
            data={oddsData}
            competition_name={matchData?.competition_name}
            placedBetWinLossDatas={placedBetWinLossDatas}
          />
          <BookMaker
            heading="BOOKMAKERS"
            data={{
              ...bookmakerTransformData,
              market_id: oddsData?.market_id,
              noData: bookmakerData ? false : true,
            }}
            competition_name={matchData?.competition_name}
            placedBetWinLossBookmakerData={placedBetWinLossBookmakerData}
            oddsData={oddsData}
            matchName={matchData?.name}
          />
          {/* <Fancy
            heading="Fancy"
            data={fancy}
            matchName={matchData?.name}
            marketId={marketId || data?.marketId}
            placedBetWinLossFancy={placedBetWinLossFancy}
            competition_name={matchData?.competition_name}
          /> */}
          <Sessions
            sessionBooksetClcuData={sessionBooksetClcuData}
            data={sessionData}
            matchName={matchData?.name}
            particularMatchData={particularMatchData}
            competition_name={matchData?.competition_name}
            oddsData={oddsData}
          />
        </div>
        <div>
          {' '}
          {isLogin && betData.length > 0 ? (
            <div className="hidden lg:block">
              <BetSlip />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default CricketMarket;
