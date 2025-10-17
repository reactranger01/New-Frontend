{
  /* eslint-disable*/
}
import { LoginModal } from '@/containers/pageListAsync';
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
import MobileFootballInnerOdds from './MobileFootballInnerOdds';
import MobileFootballInnerMarkets from './MobileFootballInnerMarkets';
import { Loading } from '@/components';
import InnerHeading from '../InnerHeading';
import MobOpenBets from '@/components/MobOpenBets';

const MobFootball = () => {
  const isLogin = isLoggedIn();

  const [innerHeadTab, setInnerHeadTab] = useState(1);
  const [openBetCount, setOpenBetCount] = useState(0);

  const location = useLocation();
  const userType = useSelector((state) => state?.user?.userType);
  const [fixtureEventName, setFixtureEventName] = useState([]);
  const [usersBets, setusersBets] = useState({});
  const userIdBalancetv = useSelector((state) => state?.user?.balance);
  const [placedBetWinLossDatas, setPlacedBetWinLossData] = useState({});
  const [allMarketData, setAllMarketData] = useState([]);
  const matchData = location.state?.data;
  const { eventId } = useParams();
  const [isLiveTv, setIsLiveTV] = useState(false);
  const [isLiveMobile, setIsLiveMobile] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  const stateUpdate = useSelector(
    (state) => state?.updatestate?.betPlacementSuccess,
  );
  const timeoutRef = useRef(null);
  const handleLiveScoreMobile = () => {
    setIsLiveMobile(!isLiveMobile);
    setIsLiveTV(false);
  };
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
      if (isLogin && eventId) {
        try {
          const allUserBets = await getUserBets(eventId);
          setusersBets(allUserBets);
        } catch (error) {
          console.error('Error fetching user bets:', error);
        }
      }
    };
    fetchUserBets();
  }, [eventId, stateUpdate, isLogin]);

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
                ? `https://e765432.diamondcricketid.com/dtv.php?id=${eventId}`
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
            openBetCount={openBetCount}
          />
        </div>
        <div className={`${innerHeadTab === 1 ? '' : 'hidden'}`}>
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
                <MobileFootballInnerOdds
                  key={index}
                  heading="Match Odds "
                  data={market}
                  fixtureEventName={fixtureEventName}
                  placedBetWinLossDatas={placedBetWinLossDatas}
                  competition_name={matchData?.competition_name}
                />
              ) : (
                <MobileFootballInnerMarkets
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
        </div>
        <div className={`${innerHeadTab === 2 ? '' : 'hidden'}  `}>
          <MobOpenBets
            eventId={eventId}
            sport={'football'}
            setOpenBetCount={setOpenBetCount}
          />
        </div>
      </div>
    </>
  );
};

export default MobFootball;
