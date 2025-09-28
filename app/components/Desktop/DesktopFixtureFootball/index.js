import React, { useEffect, useState } from 'react';
import 'swiper/css';
import { useDispatch } from 'react-redux';
import { fetchBetDetailsAction } from '@/redux/actions';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import DesktopMarketAll from '@/components/DesktopMarketAll';
import DesktopGameHeader from '../DesktopGameHeader';
import MobileMarketAll from '@/components/Mobile/MobileMarketAll';
import { openModal } from '@/redux/Slices/modalSlice';
import { isLoggedIn } from '@/utils/apiHandlers';

const DesktopFixtureFootball = ({ type, fixtureData, isLoading }) => {
  const [bets, setBets] = useState([]);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:660px)');
  const isLogin = isLoggedIn();

  const sortedInplayFalseMatches = fixtureData.sort((a, b) => {
    return new Date(a.matchDateTime) - new Date(b.matchDateTime);
  });

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
    if (isLogin) {
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
    } else {
      dispatch(openModal('login'));
    }
  };

  useEffect(() => {
    if (bets?.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
      dispatch(setActiveBetSlipIndex(bets[0]?.eventId));
    }
  }, [bets, dispatch]);

  return (
    <div className="football mt-2">
      <DesktopGameHeader
        GameName={'Football'}
        image="/images/sidebarIcons/football.webp"
      />
      {type == 'LiveMatches' ? (
        <>
          {fixtureData?.length == 0 && isLoading == false ? (
            <div className="flex mt-1 justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
              <span className="text-12">
                Currently, no matches are available.
              </span>
            </div>
          ) : (
            <>
              {isMobile ? (
                <MobileMarketAll
                  inplayData={fixtureData}
                  gameNameS="football"
                />
              ) : (
                <DesktopMarketAll
                  inplayData={fixtureData}
                  gameNameS="football"
                  gameNameB="Soccer"
                  addToBetPlace={addToBetPlace}
                  showStar={false}
                />
              )}
            </>
          )}
        </>
      ) : (
        <>
          {sortedInplayFalseMatches?.length == 0 && isLoading == false ? (
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
                  gameNameS="football"
                />
              ) : (
                <DesktopMarketAll
                  inplayData={sortedInplayFalseMatches}
                  gameNameS="football"
                  gameNameB="Soccer"
                  addToBetPlace={addToBetPlace}
                  showStar={false}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
DesktopFixtureFootball.propTypes = {
  type: PropTypes.string.isRequired,
  fixtureData: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
};

export default DesktopFixtureFootball;
