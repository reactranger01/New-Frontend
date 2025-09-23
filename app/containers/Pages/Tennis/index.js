import { Loading } from '@/components';
import DesktopGameHeader from '@/components/Desktop/DesktopGameHeader';
import DesktopMarketAll from '@/components/DesktopMarketAll';
import MobileMarketAll from '@/components/Mobile/MobileMarketAll';
import MostPopular from '@/components/MostPopular';
import { LoginModal } from '@/containers/pageListAsync';
import { fetchBetDetailsAction } from '@/redux/actions';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { isLoggedIn } from '@/utils/apiHandlers';
import { getFixtureData } from '@/utils/helper';
import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Tennis = () => {
  const isLogin = isLoggedIn();
  const [openModal, setOpenModal] = useState(false);
  const [inplayTrue, setInplayTrue] = useState([]);
  const [inplayFalse, setInplayFalse] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  const betData = useSelector((state) => state.bet.selectedBet);
  const [bets, setBets] = useState([]);
  const isMobile = useMediaQuery('(max-width:660px)');
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);
  const dispatch = useDispatch();
  useEffect(() => {
    if (bets?.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
      if (isMobile) {
        dispatch(setActiveBetSlipIndex(bets[0]?.eventId));
      }
    }
  }, [bets, dispatch, isMobile]);

  const getTennisData = () => {
    getFixtureData(
      'tennis',
      setInplayTrue,
      setInplayFalse,
      setisLoading,
      setLoaderOneTime,
    );
  };
  useEffect(() => {
    const fetchInterval = isLogin ? 5000 : 10000;
    getTennisData();
    const intervalId = setInterval(() => {
      getTennisData();
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
        _marketData,
        minimumBet: minimumBet || '',
        maximumBet: maximumBet || '',
      },
    ]);
  };

  return (
    <>
      {isLoading && !loaderOneTime && <Loading />}
      <div className="mb-10 min-h-screen">
        <div className="flex-1">
          <MostPopular text="Most Popular" />

          <DesktopGameHeader
            GameName={'Tennis'}
            image="/images/sidebarIcons/tennis.webp"
            isSmall={true}
          />
          {isMobile ? (
            <MobileMarketAll inplayData={inplayTrue} gameNameS="tennis" />
          ) : (
            <DesktopMarketAll
              inplayData={inplayTrue}
              gameNameS="tennis"
              gameNameB="Tennis"
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
            <MobileMarketAll inplayData={inplayFalse} gameNameS="tennis" />
          ) : (
            (inplayFalse !== null || inplayFalse?.length !== 0) && (
              <DesktopMarketAll
                inplayData={inplayFalse}
                gameNameS="tennis"
                gameNameB="Tennis"
                addToBetPlace={addToBetPlace}
                setOpenModal={setOpenModal}
                isLogin={isLogin}
                activeBetSlip={activeBetSlip}
                // isMobile={isMobile}
                bets={bets}
                betData={betData}
              />
            )
          )}
        </div>
        {openModal && <LoginModal open={openModal} setOpen={setOpenModal} />}
      </div>
    </>
  );
};

export default Tennis;
