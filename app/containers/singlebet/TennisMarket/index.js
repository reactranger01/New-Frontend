/* eslint-disable react-hooks/exhaustive-deps */
import { BetSlip, Loading, MatchOddsTennis, Set1Winner } from '@/components';
import { isLoggedIn } from '@/utils/apiHandlers';
import {
  calcPlacedBetOddsFootballOrTenisCalculation,
  fetchEventData,
  getUserBets,
} from '@/utils/helper';
import { reactIcons } from '@/utils/icons';
import { logout } from '@/utils/logout';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TennisMarket = () => {
  const isLogin = isLoggedIn();
  const { eventId } = useParams();
  const [allMarketData, setAllMarketData] = useState([]);
  const [fixtureEventName, setFixtureEventName] = useState([]);
  const betData = useSelector((state) => state.bet.selectedBet);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //eslint-disable-next-line
  const [odds, setOdds] = useState([]);
  const matchData = location.state?.data;
  const userIdBalance = useSelector((state) => state?.user?.balance);
  const userType = useSelector((state) => state?.user?.userType);
  const [isLiveMobile, setIsLiveMobile] = useState(false);
  const [isLiveTv, setIsLiveTV] = useState(false);
  const [usersBets, setusersBets] = useState({});
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  const [placedBetWinLossDatas, setPlacedBetWinLossData] = useState({});
  const stateUpdate = useSelector(
    (state) => state?.updatestate?.betPlacementSuccess,
  );
  const timeoutRef = useRef(null);
  const getTennisEventData = () => {
    fetchEventData('tennis', eventId, {
      setLoading,
      setLoaderOneTime,
      setFixtureEventName,
      setAllMarketData,
    });
  };

  useEffect(() => {
    const fetchDataWithDynamicDelay = async () => {
      getTennisEventData();
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

  const handleLiveScoreMobile = () => {
    setIsLiveMobile(!isLiveMobile);
    setIsLiveTV(false);
  };
  const handleLiveTV = () => {
    setIsLiveTV(!isLiveTv);
    setIsLiveMobile(false);
  };

  useEffect(() => {
    if (usersBets?.bets && allMarketData && eventId) {
      const placedBetCalcData = calcPlacedBetOddsFootballOrTenisCalculation(
        usersBets?.bets,
        allMarketData,
        eventId,
      );
      setPlacedBetWinLossData(placedBetCalcData);
    }
    if (odds?.runners?.[0]?.status == 'CLOSED') {
      const timer = setTimeout(() => {
        navigate(-1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [usersBets?.bets, odds, allMarketData, eventId]);

  useEffect(() => {
    const fetchUserBets = async () => {
      const islogin = isLoggedIn();
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
  }, [eventId, stateUpdate]);

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
      {' '}
      {loading && !loaderOneTime && <Loading />}
      <div className="min-h-[100vh] w-full my-2 flex lg:gap-4">
        <div className="flex-1">
          <div className="bg-[#0f2327] mb-3">
            <div className=" flex items-center justify-between text-white w-full py-3 px-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="text-white">{reactIcons.play}</div>
                <div>
                  {' '}
                  <h1 className="text-24"> {matchData?.name || ''}</h1>
                  <p className="text-[#FAFAFA80] text-12 mt-1">
                    {matchData?.competition_name}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                {matchData?.odds?.inplay ? (
                  <div className="flex-center text-green-400 gap-1 text-10">
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
                {/* matchData?.odds?.inplay && */}
                {isLogin && userIdBalance > 0 && userType !== 'DEMO' ? (
                  <button
                    // onClick={handleButtonClick}
                    onClick={handleLiveTV}
                    className="bg-[#00A725] flex p-2 rounded-md gap-1 items-center ml-auto w-auto "
                  >
                    {/* <img
                    src="/images/liveTv.png"
                    alt="live-tv"
                    className="w-6 h-6 bg-transparent"
                  /> */}
                    {reactIcons.tv}
                    <span className="text-xs">Live Tv</span>
                  </button>
                ) : (
                  <button className="ml-auto w-auto"></button>
                )}
                {matchData?.odds?.inplay &&
                  userIdBalance > 0 &&
                  userType !== 'DEMO' && (
                    <>
                      {isLogin || userIdBalance > 0 ? (
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
                    </>
                  )}
              </div>
            </div>
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
                style={{ width: '100%', height: '518px' }}
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
                style={{ width: '100%', height: '518px' }}
              ></iframe>
            </div>
            {/* <div className="bg-[#00000033] py-1 px-2 text-white ">
            <div className="flex items-center gap-1 text-12">
              <span className="text-lg"> {reactIcons.watch}</span> Opens in
              15hrs 34mins
            </div>
          </div> */}
          </div>
          {allMarketData?.map((market, index) =>
            market?.market_name == 'Match Odds' ? (
              <MatchOddsTennis
                key={index}
                heading="Match Odds "
                data={market}
                fixtureEventName={fixtureEventName}
                placedBetWinLossDatas={placedBetWinLossDatas}
                competition_name={matchData?.competition_name}
                allMarketData={allMarketData[0]}
              />
            ) : (
              <Set1Winner
                key={index}
                heading={market?.market_name?.toUpperCase()}
                data={market}
                fixtureEventName={fixtureEventName}
                type="under15"
                placedBetWinLossDatas={placedBetWinLossDatas}
                competition_name={matchData?.competition_name}
                allMarketData={allMarketData[0]}
              />
            ),
          )}
          {/* <Set1Winner
          heading="Set 2 Winner "
          data={set2Winner}
          fixtureEventName={fixtureEventName}
          eventId={eventId}
          competition_name={matchData?.competition_name}
        /> */}
        </div>
        <div>
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

export default TennisMarket;
