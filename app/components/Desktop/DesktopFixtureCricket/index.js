/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import { isLoggedIn } from '@/utils/apiHandlers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@/redux/actions';
import { LoginModal } from '@/containers/pageListAsync';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import DesktopMarketAll from '@/components/DesktopMarketAll';
import DesktopGameHeader from '../DesktopGameHeader';
import MobileMarketAll from '@/components/Mobile/MobileMarketAll';

const DesktopFixtureCricket = ({ type, fixtureData, isLoading }) => {
  const isLogin = isLoggedIn();
  /* eslint-disable */
  const [openModal, setOpenModal] = useState(false);
  const [bets, setBets] = useState([]);
  const dispatch = useDispatch();
  const betData = useSelector((state) => state.bet.selectedBet);
  const isMobile = useMediaQuery('(max-width:660px)');
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
      <DesktopGameHeader
        GameName={'Cricket'}
        image="/images/sidebarIcons/cricket.webp"
      />

      {type == 'LiveMatches' ? (
        <>
          {fixtureData?.length === 0 && isLoading == false ? (
            <div className="flex mt-1 justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
              <span className="text-12">
                Currently, no matches are available.
              </span>
            </div>
          ) : (
            <>
              {isMobile ? (
                <MobileMarketAll inplayData={fixtureData} gameNameS="cricket" />
              ) : (
                <DesktopMarketAll
                  inplayData={fixtureData}
                  gameNameS="cricket"
                  gameNameB="Cricket"
                  setOpenModal={setOpenModal}
                  addToBetPlace={addToBetPlace}
                  isLogin={isLogin}
                  activeBetSlip={activeBetSlip}
                  // isMobile={isMobile}
                  bets={bets}
                  betData={betData}
                  showStar={false}
                />
              )}
            </>
          )}
        </>
      ) : (
        <>
          {sortedInplayFalseMatches?.length === 0 ? (
            <div className="flex mt-1 justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
              <span className="text-12">
                Currently, no matches are available.
              </span>
            </div>
          ) : (
            <>
              {isMobile ? (
                <MobileMarketAll
                  inplayData={sortedInplayFalseMatches}
                  gameNameS="cricket"
                />
              ) : (
                <DesktopMarketAll
                  inplayData={sortedInplayFalseMatches}
                  gameNameS="cricket"
                  gameNameB="Cricket"
                  setOpenModal={setOpenModal}
                  addToBetPlace={addToBetPlace}
                  isLogin={isLogin}
                  activeBetSlip={activeBetSlip}
                  // isMobile={isMobile}
                  bets={bets}
                  betData={betData}
                  showStar={false}
                />
              )}
            </>
          )}
        </>
      )}
      {openModal && <LoginModal open={openModal} setOpen={setOpenModal} />}
    </div>
  );
};
DesktopFixtureCricket.propTypes = {
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fixtureData: PropTypes.array.isRequired,
};

export default DesktopFixtureCricket;
