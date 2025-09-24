{
  /* eslint-disable*/
}

import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { isLoggedIn } from '@/utils/apiHandlers';
import { useDispatch, useSelector } from 'react-redux';
import { reactIcons } from '@/utils/icons';
import { BlueBtn, NewBetSlip, PinkBtn } from '@/components';
import { intToString } from '@/utils/margeData';
import { useMediaQuery } from '@mui/material';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { fetchBetDetailsAction } from '@/redux/actions';
import { LoginModal } from '@/containers/pageListAsync';
import { updatePlacedBetCalculation } from '@/utils/helper';
const MobileFootballInnerOdds = ({
  data,

  placedBetWinLossDatas,
  competition_name,
}) => {
  const isLogin = isLoggedIn();
  const [openModal, setOpenModal] = useState(false);
  const [bets, setBets] = useState([]);
  const inplay = data?.inplay;
  const isMobile = useMediaQuery('(max-width:1024px)');
  const betData = useSelector((state) => state.bet.selectedBet);
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);
  const calculation = useSelector((state) => state?.calculation?.currentValue);
  const updatedCalculation = calculation
    ? updatePlacedBetCalculation(
        calculation,
        'Match Odds',
        placedBetWinLossDatas,
      )
    : placedBetWinLossDatas;
  const dispatch = useDispatch();
  useEffect(() => {
    if (bets?.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
      if (isMobile) {
        dispatch(setActiveBetSlipIndex(bets[0]?.selectionId));
      }
    }
  }, [bets, dispatch, isMobile]);
  const addToBetPlace = (
    eventId,
    selectionId,
    betDetails,
    game,
    OddsPrice,
    betType,
    selectType,
    _marketData,
    marketType,
    minimumBet,
    maximumBet,
  ) => {
    setBets([
      {
        marketId: String(_marketData?.market_id),
        eventId: Number(eventId),
        gameId: 1,
        selectionId: String(selectionId),
        betOn: selectType,
        price: parseFloat(OddsPrice),
        stake: '',
        eventType: game,
        competition: competition_name,
        event: data?.name,
        market: _marketData?.market_name,
        gameType: _marketData?.market_name,
        nation: betDetails,
        type: selectType,
        calcFact: 0,
        bettingOn: betType,
        runners: 2,
        row: 1,
        matchName: data?.name,
        percent: 100,
        selection: betDetails,
        minimumBet: minimumBet || '',
        maximumBet: maximumBet || '',
        _marketData,
      },
    ]);
  };

  let minLimitOdds, maxLimitOdds;
  if (inplay) {
    minLimitOdds = data?.inPlayMinLimit;
    maxLimitOdds = data?.inPlayMaxLimit;
  } else {
    minLimitOdds = data?.offPlayMinLimit;
    maxLimitOdds = data?.offPlayMaxLimit;
  }
  return (
    <>
      {' '}
      {data?.runners?.length > 0 && (
        <div className="matchoddsexchnage  rounded-lg mb-3 ">
          <div className="bg-[#eceaea]  flex items-center justify-between py-1">
            <div className="font-bold flex items-center gap-1 text-12 pl-1">
              <span className="text-sm text-black">{reactIcons.star}</span>{' '}
              Match Odds (exchange)
            </div>
            <div className="w-[132px]  grid grid-cols-2 text-12 font-[900] text-black">
              <p className="mx-auto">BACK</p>
              <p className="mx-auto">LAY</p>
            </div>
          </div>

          {data?.runners?.length === 0 ? (
            <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
              <span className="text-12">
                Odds data is currently unavailable for this match.
              </span>
            </div>
          ) : (
            <>
              {data &&
                data?.runners &&
                data?.runners?.map((items, index) => {
                  const matchOddsExposer =
                    updatedCalculation?.type == 'odds' &&
                    updatedCalculation?.exposer != ''
                      ? updatedCalculation?.exposer?.find(
                          (odd) =>
                            odd?.id == items?.selectionId &&
                            odd?.marketName == data?.market_name,
                        )
                      : '';
                  return (
                    <>
                      <div
                        key={index}
                        className="flex items-center justify-between border-b bg-white border-gray-100"
                      >
                        <div className="">
                          <div className="flex-1 text-black pl-2 text-12 font-lato font-bold">
                            {items?.runnerName}
                          </div>
                          <div
                            className={`flex items-center gap-1 justify-start  font-semibold pl-2 text-14 ${
                              matchOddsExposer &&
                              matchOddsExposer?.type == 'profit'
                                ? 'text-green-700'
                                : 'text-[#CE2C16]'
                            }`}
                          >
                            {matchOddsExposer ? (
                              <>
                                {reactIcons?.doubleArrowR}{' '}
                                {Number(matchOddsExposer?.data || 0).toFixed(2)}
                              </>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        <div className="w-[132px] grid grid-cols-2">
                          <BlueBtn
                            onClick={async () => {
                              if (isLogin) {
                                await addToBetPlace(
                                  data?.eventid || data?.matchId,
                                  items?.selectionId,
                                  items?.runnerName,
                                  'Soccer',
                                  items?.backPrice1 || items?.back?.[0]?.price,
                                  data?.market_name,
                                  'BACK',
                                  data,
                                  'ODDS',
                                  minLimitOdds,
                                  maxLimitOdds,
                                );
                              } else {
                                setOpenModal(true);
                              }
                            }}
                            text={items?.backPrice1 || '-'}
                            size={
                              items?.backsize1 && items?.backPrice1
                                ? intToString(items?.backsize1 || 0)
                                : ''
                            }
                            disabled={items?.backPrice1 ? false : true}
                            css="w-[65px] mx-auto"
                          />
                          <PinkBtn
                            onClick={async () => {
                              if (isLogin) {
                                await addToBetPlace(
                                  data?.eventid || data?.matchId,
                                  items?.selectionId,
                                  items?.runnerName,
                                  'Soccer',
                                  items?.layPrice1 || items?.lay?.[0]?.price,
                                  data?.market_name,
                                  'LAY',
                                  data,
                                  'ODDS',
                                  minLimitOdds,
                                  maxLimitOdds,
                                );
                              } else {
                                setOpenModal(true);
                              }
                            }}
                            text={items?.layPrice1 || '-'}
                            size={
                              items?.laysize1 && items?.layPrice1
                                ? intToString(items?.laysize1 || 0)
                                : ''
                            }
                            disabled={items?.layPrice1 ? false : true}
                            css="w-[65px] mx-auto"
                          />
                        </div>
                      </div>
                      {/* {activeBetSlip == Number(items?.selectionId) &&
                        Number(items?.selectionId) ==
                          Number(bets[0]?.selectionId) &&
                        isLoggedIn() &&
                        betData?.length > 0 &&
                        isMobile && <NewBetSlip />} */}
                    </>
                  );
                })}
              <div className="flex justify-between">
                <div></div>
                <div className="w-[138px] relative overflow-hidden">
                  <div className="grid grid-cols-2 my-1 leading-none text-12 font-medium whitespace-nowrap  ">
                    <div className="text-right pr-1">Min : {minLimitOdds}</div>
                    <div className="border-l pl-1 border-black ">
                      Min : {maxLimitOdds}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {openModal && <LoginModal open={openModal} setOpen={setOpenModal} />}
        </div>
      )}
    </>
  );
};
MobileFootballInnerOdds.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.array,
  fixtureEventName: PropTypes.array,
  placedBetWinLossDatas: PropTypes.object,
  competition_name: PropTypes.string,
};

export default MobileFootballInnerOdds;
