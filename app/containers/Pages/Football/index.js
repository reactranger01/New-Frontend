import { Loading } from '@/components';
import DesktopGameHeader from '@/components/Desktop/DesktopGameHeader';
import DesktopMarketAll from '@/components/DesktopMarketAll';
import MobileMarketAll from '@/components/Mobile/MobileMarketAll';
import MostPopular from '@/components/MostPopular';
import { fetchBetDetailsAction } from '@/redux/actions';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { isLoggedIn } from '@/utils/apiHandlers';
import { getFixtureData } from '@/utils/helper';
import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const Football = () => {
  const isLogin = isLoggedIn();
  const [isLoading, setisLoading] = useState(false);
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  const isMobile = useMediaQuery('(max-width:660px)');

  const [bets, setBets] = useState([]);
  const dispatch = useDispatch();
  const [inplayTrue, setInplayTrue] = useState([]);
  const [inplayFalse, setInplayFalse] = useState([]);

  const getFootballData = () => {
    getFixtureData(
      'soccer',
      setInplayTrue,
      setInplayFalse,
      setisLoading,
      setLoaderOneTime,
    );
  };
  useEffect(() => {
    const fetchInterval = isLogin ? 5000 : 10000;
    getFootballData();
    const intervalId = setInterval(() => {
      getFootballData();
    }, fetchInterval);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    minimumBet,
    maximumBet,
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
        minimumBet: minimumBet || '',
        maximumBet: maximumBet || '',
        _marketData,
      },
    ]);
  };

  useEffect(() => {
    if (bets?.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
      if (isMobile) {
        dispatch(setActiveBetSlipIndex(bets[0]?.eventId));
      }
    }
  }, [bets, dispatch, isMobile]);
  return (
    <>
      {isLoading && !loaderOneTime && <Loading />}
      <div className="mb-10 min-h-screen gap-4">
        <div className="">
          <MostPopular text="Most Popular" />
          <DesktopGameHeader
            GameName={'Football'}
            image="/images/sidebarIcons/football.webp"
            isSmall={true}
          />

          {isMobile ? (
            <MobileMarketAll inplayData={inplayTrue} gameNameS="football" />
          ) : (
            <DesktopMarketAll
              inplayData={inplayTrue}
              gameNameS="football"
              gameNameB="Soccer"
              addToBetPlace={addToBetPlace}
            />
          )}

          {isMobile ? (
            <MobileMarketAll inplayData={inplayFalse} gameNameS="football" />
          ) : (
            (inplayFalse !== null || inplayFalse?.length !== 0) && (
              <DesktopMarketAll
                inplayData={inplayFalse}
                gameNameS="football"
                gameNameB="Soccer"
                addToBetPlace={addToBetPlace}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Football;
