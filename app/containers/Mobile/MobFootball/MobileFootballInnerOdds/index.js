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
  fixtureEventName,
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
  console.log(fixtureEventName);
  return (
    <>
      {' '}
      {data?.runners?.length > 0 && (
        <div className="matchoddsexchnage bg-white p-1 rounded-lg mb-3 mx-2">
          <div className="flex items-center justify-between py-1">
            <div className="font-bold text-14 pl-2">Match Odds (exchange)</div>
            <div className="flex items-center gap-2 text-[#9d9c9d]">
              <p>{reactIcons.play}</p>
              <p>{reactIcons.lock}</p>
              <p>{reactIcons.downArrow}</p>
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
              <div className="flex items-center justify-between border-t border-gray-100">
                <div className="flex-1"></div>
                <div className="w-[121px] grid grid-cols-2 text-[#9d9c9d] text-10">
                  <p className="mx-auto">Back</p>
                  <p className="mx-auto">Lay</p>
                </div>
              </div>
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
                        className="flex items-center justify-between border-b border-gray-100"
                      >
                        <div className="">
                          <div className="flex-1 text-[#333333] pl-2 text-14">
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
                        <div className="w-[121px] grid grid-cols-2">
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
                            css="w-[60px] mx-auto"
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
                            css="w-[60px] mx-auto"
                          />
                        </div>
                      </div>
                      {activeBetSlip == Number(items?.selectionId) &&
                        Number(items?.selectionId) ==
                          Number(bets[0]?.selectionId) &&
                        isLoggedIn() &&
                        betData?.length > 0 &&
                        isMobile && <NewBetSlip />}
                    </>
                  );
                })}
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
