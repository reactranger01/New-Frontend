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
import { useDispatch, useSelector } from 'react-redux';

const Cricket = () => {
  const isLogin = isLoggedIn();
  // eslint-disable-next-line
  const [isLoading, setisLoading] = useState(false);
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  const betData = useSelector((state) => state.bet.selectedBet);
  const [inplayTrue, setInplayTrue] = useState([]);
  const [inplayFalse, setInplayFalse] = useState([]);
  // eslint-disable-next-line
  const [openModal, setOpenModal] = useState(false);
  const [bets, setBets] = useState([]);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:660px)');
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
          <MostPopular text="Most Popular" />
          <DesktopGameHeader
            GameName={'Cricket'}
            image="/images/sidebarIcons/cricket.webp"
            isSmall={true}
          />

          {isMobile ? (
            <MobileMarketAll inplayData={inplayTrue} gameNameS="cricket" />
          ) : (
            <DesktopMarketAll
              inplayData={inplayTrue}
              gameNameS="cricket"
              gameNameB="Cricket"
              addToBetPlace={addToBetPlace}
              setOpenModal={setOpenModal}
              isLogin={isLogin}
              activeBetSlip={activeBetSlip}
              // isMobile={isMobile}
              bets={bets}
              betData={betData}
            />
          )}

          {isMobile ? (
            <MobileMarketAll inplayData={inplayFalse} gameNameS="cricket" />
          ) : (
            (inplayFalse !== null || inplayFalse?.length !== 0) && (
              <DesktopMarketAll
                inplayData={inplayFalse}
                gameNameS="cricket"
                gameNameB="Cricket"
                setOpenModal={setOpenModal}
                addToBetPlace={addToBetPlace}
                isLogin={isLogin}
                activeBetSlip={activeBetSlip}
                // isMobile={isMobile}
                bets={bets}
                betData={betData}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Cricket;
