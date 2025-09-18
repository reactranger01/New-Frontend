/* eslint-disable react-hooks/exhaustive-deps */
import { isLoggedIn } from '@/utils/apiHandlers';
import {
  calcPlacedBetOddsFootballOrTenisCalculation,
  fetchEventData,
  getUserBets,
} from '@/utils/helper';
import { reactIcons } from '@/utils/icons';
import { logout } from '@/utils/logout';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import TennisOddsInner from './TennisOddsInner';
import TennisOtherMarkets from './TennisOtherMarkets';
import { Loading } from '@/components';

const MobTennis = () => {
  const isLogin = isLoggedIn();
  const { eventId } = useParams();
  const [fixtureEventName, setFixtureEventName] = useState([]);
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  const matchData = location.state?.data;
  const [usersBets, setusersBets] = useState({});
  const [isLiveMobile, setIsLiveMobile] = useState(false);
  const [placedBetWinLossDatas, setPlacedBetWinLossData] = useState({});
  const [allMarketData, setAllMarketData] = useState([]);
  const userType = useSelector((state) => state?.user?.userType);
  const userIdBalancetv = useSelector((state) => state?.user?.balance);
  const [isLiveTv, setIsLiveTV] = useState(false);
  const timeoutRef = useRef(null);
  const stateUpdate = useSelector(
    (state) => state?.updatestate?.betPlacementSuccess,
  );
  const handleLiveScoreMobile = () => {
    setIsLiveMobile(!isLiveMobile);
    setIsLiveTV(false);
  };
  const handleLiveTV = () => {
    setIsLiveTV(!isLiveTv);
    setIsLiveMobile(false);
  };
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
  useEffect(() => {
    if (usersBets?.bets && allMarketData && eventId) {
      const placedBetCalcData = calcPlacedBetOddsFootballOrTenisCalculation(
        usersBets?.bets,
        allMarketData,
        eventId,
      );
      setPlacedBetWinLossData(placedBetCalcData);
    }
  }, [usersBets?.bets, allMarketData, eventId]);

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
      {isLoading && !loaderOneTime && <Loading />}
      <div className="min-h-[550px]">
        <div className="bg-[#163439] p-2 items-center gap-2  text-white justify-between">
          {matchData?.inplay && (
            <span className="text-12 p-1 px-2 italic bg-[#00A725] rounded-2xl mt-1">
              In play
            </span>
          )}
          {isLogin && matchData?.inplay ? (
            <div>
              <div className="flex items-center gap-2 text-16">
                <p>{matchData?.name}</p>
              </div>
              <div className="text-10 flex justify-between items-center gap-2">
                <div className="flex gap-2 items-center">
                  {matchData?.competition_name}
                  <span className="text-[6px] text-[#c0bebe]">
                    {reactIcons.play2}
                  </span>
                </div>
                <div className="flex gap-1 py-1">
                  {isLogin &&
                  userIdBalancetv > 0 &&
                  matchData?.inplay &&
                  userType !== 'DEMO' ? (
                    <button
                      onClick={handleLiveTV}
                      className="bg-[#00A725] flex p-2 rounded-md gap-1 items-center ml-auto w-auto "
                    >
                      {reactIcons.tv}
                    </button>
                  ) : (
                    <button className="ml-auto w-auto"></button>
                  )}
                  {isLogin &&
                  userIdBalancetv > 0 &&
                  matchData?.inplay &&
                  userType !== 'DEMO' ? (
                    <button
                      onClick={handleLiveScoreMobile}
                      className="bg-[#00A725] flex p-2 rounded-md gap-1 items-center ml-auto w-auto "
                    >
                      {reactIcons.score}
                    </button>
                  ) : (
                    <button className="ml-auto w-auto"></button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-16">
                <p>{matchData?.name}</p>
              </div>
              <div className="text-10 flex justify-between items-center gap-2">
                <div className="flex gap-2 items-center">
                  {matchData?.competition_name}
                  <span className="text-[6px] text-[#c0bebe]">
                    {reactIcons.play2}
                  </span>
                </div>
              </div>
            </div>
          )}
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
        {allMarketData?.map((market, index) =>
          market?.market_name == 'Match Odds' ? (
            <TennisOddsInner
              key={index}
              heading="Match Odds "
              data={market}
              fixtureEventName={fixtureEventName}
              placedBetWinLossDatas={placedBetWinLossDatas}
              competition_name={matchData?.competition_name}
              allMarketData={allMarketData[0]}
            />
          ) : (
            <TennisOtherMarkets
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
      </div>
    </>
  );
};

export default MobTennis;
