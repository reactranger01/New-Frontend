/* eslint-disable react-hooks/exhaustive-deps */
import { Loading, MatchOddsSoccer, UnderMarket } from '@/components';
import MobOpenBets from '@/components/MobOpenBets';
import InnerHeading from '@/containers/Mobile/InnerHeading';
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import {
  calcPlacedBetOddsFootballOrTenisCalculation,
  fetchEventData,
} from '@/utils/helper';
import { logout } from '@/utils/logout';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const FootballMarket = () => {
  const [innerHeadTab, setInnerHeadTab] = useState(1);
  const [openBetCount, setOpenBetCount] = useState(0);

  const isLogin = isLoggedIn();
  const [allMarketData, setAllMarketData] = useState([]);
  const [odds] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  const [fixtureEventName, setFixtureEventName] = useState([]);
  const [placedBetWinLossDatas, setPlacedBetWinLossData] = useState({});
  const [usersBets, setusersBets] = useState({});
  const matchData = location.state?.data;
  const { eventId } = useParams();
  const [isLiveMobile, setIsLiveMobile] = useState(false);
  const [isLiveTv, setIsLiveTV] = useState(false);
  const stateUpdate = useSelector(
    (state) => state?.updatestate?.betPlacementSuccess,
  );
  const timeoutRef = useRef(null);
  const getSoccerEventData = () => {
    fetchEventData('soccer', eventId, {
      setLoading,
      setLoaderOneTime,
      setFixtureEventName,
      setAllMarketData,
    });
  };
  useEffect(() => {
    const fetchDataWithDynamicDelay = async () => {
      getSoccerEventData();
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

  // eslint-disable-next-line
  const handleLiveScoreMobile = () => {
    setIsLiveMobile(!isLiveMobile);
    setIsLiveTV(false);
  };
  // eslint-disable-next-line
  const handleLiveTV = () => {
    setIsLiveTV(!isLiveTv);
    setIsLiveMobile(false);
  };

  useEffect(() => {
    const islogin = isLoggedIn();
    if (islogin && eventId) {
      getUserBets();
    }
  }, [eventId, stateUpdate]);

  const getUserBets = async () => {
    const response = await getAuthData(
      `/bet/current-list?eventId=${eventId}&offset=0&limit=100`,
    );
    if (response?.status == 200) {
      setusersBets(response?.data);
    } else {
      setusersBets({});
    }
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
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [usersBets?.bets, odds, allMarketData, eventId]);
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
                  ? `https://e765432.diamondcricketid.com/dtv.php?id=${eventId}`
                  : ''
              }
              allow="autoplay; fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups"
              title="description"
              style={{ width: '100%', height: '518px' }}
            ></iframe>
          </div>
          <div className="my-2 lg:hidden">
            <InnerHeading
              activeTab={innerHeadTab}
              setActiveTab={setInnerHeadTab}
              openBetCount={openBetCount}
            />
          </div>
          <div className="w-full hidden lg:block">
            <iframe
              src={`https://tv.tresting.com/lnt.php?eventid=${eventId}`}
              allow="autoplay; fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups"
              title="Live Score"
              className="w-full"
              style={{
                aspectRatio: '16/9',
                border: 'none',
              }}
            ></iframe>
          </div>
          {[...allMarketData]
            .sort((a, b) =>
              a?.market_name === 'Match Odds'
                ? -1
                : b?.market_name === 'Match Odds'
                ? 1
                : 0,
            )
            .map((market, index) =>
              market?.market_name === 'Match Odds' ? (
                <MatchOddsSoccer
                  key={index}
                  heading="Match Odds"
                  data={market}
                  fixtureEventName={fixtureEventName}
                  placedBetWinLossDatas={placedBetWinLossDatas}
                  competition_name={matchData?.competition_name}
                />
              ) : (
                <UnderMarket
                  key={index}
                  heading={market?.market_name?.toUpperCase()}
                  data={market}
                  fixtureEventName={fixtureEventName}
                  type="under15"
                  placedBetWinLossDatas={placedBetWinLossDatas}
                  competition_name={matchData?.competition_name}
                />
              ),
            )}
          <div className={`${innerHeadTab === 2 ? '' : 'lg:hidden'}  `}>
            <MobOpenBets eventId={eventId} setOpenBetCount={setOpenBetCount} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FootballMarket;
