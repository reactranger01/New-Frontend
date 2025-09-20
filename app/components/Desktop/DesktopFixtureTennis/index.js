import React, { useEffect, useState } from 'react';
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

const DesktopFixtureTennis = ({ type, fixtureData, isLoading }) => {
  const isLogin = isLoggedIn();
  const [openModal, setOpenModal] = useState(false);
  const [bets, setBets] = useState([]);
  const betData = useSelector((state) => state.bet.selectedBet);
  const isMobile = useMediaQuery('(max-width:1024px)');
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);

  const dispatch = useDispatch();

  useEffect(() => {
    if (bets.length > 0) {
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

  const sortedInplayFalseMatches = fixtureData.sort((a, b) => {
    return new Date(a.matchDateTime) - new Date(b.matchDateTime);
  });
  return (
    <div className="tennis mt-2">
      <DesktopGameHeader
        GameName={'Tennis'}
        image="/images/sidebarIcons/tennis.webp"
      />
      {type == 'LiveMatches' ? (
        <>
          {fixtureData?.length === 0 ? (
            <div className="flex mt-1 justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
              <span className="text-12">
                Currently, no matches are available.
              </span>
            </div>
          ) : (
            <>
              <DesktopMarketAll
                inplayData={fixtureData}
                gameNameS="tennis"
                gameNameB="Tennis"
                setOpenModal={setOpenModal}
                addToBetPlace={addToBetPlace}
                isLogin={isLogin}
                activeBetSlip={activeBetSlip}
                isMobile={isMobile}
                bets={bets}
                betData={betData}
                showStar={false}
              />{' '}
            </>
          )}
        </>
      ) : (
        <>
          {sortedInplayFalseMatches?.length === 0 && isLoading == false ? (
            <div className="flex mt-1 justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
              <span className="text-12">
                Currently, no matches are available.
              </span>
            </div>
          ) : (
            <>
              <DesktopMarketAll
                inplayData={sortedInplayFalseMatches}
                gameNameS="tennis"
                gameNameB="Tennis"
                setOpenModal={setOpenModal}
                addToBetPlace={addToBetPlace}
                isLogin={isLogin}
                activeBetSlip={activeBetSlip}
                isMobile={isMobile}
                bets={bets}
                betData={betData}
                showStar={false}
              />{' '}
            </>
          )}
        </>
      )}
      {openModal && <LoginModal open={openModal} setOpen={setOpenModal} />}
    </div>
  );
};
DesktopFixtureTennis.propTypes = {
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fixtureData: PropTypes.array.isRequired,
};

export default DesktopFixtureTennis;
