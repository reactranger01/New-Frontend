import { BlueBtn, NewBetSlip, PinkBtn, SuspendedBtn } from '@/components';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { intToString } from '@/utils/margeData';
import { isLoggedIn } from '@/utils/apiHandlers';
import { LoginModal } from '@/containers/pageListAsync';
import { fetchBetDetailsAction } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { updatePlacedBetCalculation } from '@/utils/helper';

const MatchOddsSoccer = ({
  heading,
  data,
  fixtureEventName,
  placedBetWinLossDatas,
  competition_name,
}) => {
  const isLogin = isLoggedIn();
  const [openModal, setOpenModal] = useState(false);
  const [bets, setBets] = useState([]);
  const inplay = data?.inplay;
  const betData = useSelector((state) => state.bet.selectedBet);
  const isMobile = useMediaQuery('(max-width:1024px)');
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);
  const calculation = useSelector((state) => state?.calculation?.currentValue);
  const updatedCalculation = calculation
    ? updatePlacedBetCalculation(calculation, heading, placedBetWinLossDatas)
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
    minLimitOdds = fixtureEventName?.events?.[0]?.inPlayMinLimit;
    maxLimitOdds = fixtureEventName?.events?.[0]?.inPlayMaxLimit;
  } else {
    minLimitOdds = fixtureEventName?.events?.[0]?.offPlayMinLimit;
    maxLimitOdds = fixtureEventName?.events?.[0]?.offPlayMaxLimit;
  }

  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-12 font-semibold">
          <span className="text-[#e4c41e] mx-1">{reactIcons.star}</span>{' '}
          {heading}
        </div>
        <div className="sm:grid hidden grid-cols-6 min-w-[360px]">
          <div></div>
          <div></div>
          <div className="flex-center text-12 font-medium">Back</div>
          <div className="flex-center text-12 font-medium">Lay</div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="w-full border border-[#ddd]">
        {data === null || data?.length === 0 ? (
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
                      className="flex flex-col sm:flex-row justify-between items-center w-full border-b border-gray-200  bg-white"
                    >
                      <div className="flex items-center justify-between w-full  px-2">
                        <div className="  text-12 font-medium ">
                          {' '}
                          {items?.runnerName}
                          {matchOddsExposer ? (
                            <>
                              <div>
                                <div
                                  className={`flex gap-1 font-semibold text-14 items-center ${
                                    matchOddsExposer?.type == 'profit'
                                      ? 'text-[#04a928]'
                                      : 'text-[#CE2C16]'
                                  }`}
                                >
                                  <span className=" ">
                                    {reactIcons?.doubleArrowR}{' '}
                                  </span>
                                  <span className=" ">
                                    {Number(
                                      matchOddsExposer?.data || 0,
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="relative sm:min-w-[360px] min-w-[300px] shrink-0">
                        <div className="grid grid-cols-6">
                          <BlueBtn
                            onClick={async () => {
                              if (isLogin) {
                                await addToBetPlace(
                                  data?.eventid || data?.matchId,
                                  items?.selectionId,
                                  items?.runnerName,
                                  'Soccer',
                                  items?.backPrice3,
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
                            text={items?.backPrice3 || '0'}
                            size={
                              items?.backsize3 && items?.backPrice3
                                ? intToString(items?.backsize3 || 0)
                                : '0'
                            }
                            disabled={items?.backPrice3 ? false : true}
                          />
                          <BlueBtn
                            onClick={async () => {
                              if (isLogin) {
                                await addToBetPlace(
                                  data?.eventid || data?.matchId,
                                  items?.selectionId,
                                  items?.runnerName,
                                  'Soccer',
                                  items?.backPrice2,
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
                            text={items?.backPrice2 || '0'}
                            size={
                              items?.backsize2 && items?.backPrice2
                                ? intToString(items?.backsize2 || 0)
                                : '0'
                            }
                            disabled={items?.backPrice2 ? false : true}
                          />
                          <BlueBtn
                            onClick={async () => {
                              if (isLogin) {
                                await addToBetPlace(
                                  data?.eventid || data?.matchId,
                                  items?.selectionId,
                                  items?.runnerName,
                                  'Soccer',
                                  items?.backPrice1,
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
                            text={items?.backPrice1 || '0'}
                            size={
                              items?.backsize1 && items?.backPrice1
                                ? intToString(items?.backsize1 || 0)
                                : '0'
                            }
                            disabled={items?.backPrice1 ? false : true}
                          />
                          <PinkBtn
                            onClick={async () => {
                              if (isLogin) {
                                await addToBetPlace(
                                  data?.eventid || data?.matchId,
                                  items?.selectionId,
                                  items?.runnerName,
                                  'Soccer',
                                  items?.layPrice1,
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
                            text={items?.layPrice1 || '0'}
                            size={
                              items?.laysize1 && items?.layPrice1
                                ? intToString(items?.laysize1 || 0)
                                : '0'
                            }
                            disabled={items?.layPrice1 ? false : true}
                          />
                          <PinkBtn
                            onClick={async () => {
                              if (isLogin) {
                                await addToBetPlace(
                                  data?.eventid || data?.matchId,
                                  items?.selectionId,
                                  items?.runnerName,
                                  'Soccer',
                                  items?.layPrice2,
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
                            text={items?.layPrice2 || '0'}
                            size={
                              items?.laysize2 && items?.layPrice2
                                ? intToString(items?.laysize2 || 0)
                                : '0'
                            }
                            disabled={items?.layPrice2 ? false : true}
                          />
                          <PinkBtn
                            onClick={async () => {
                              if (isLogin) {
                                await addToBetPlace(
                                  data?.eventid || data?.matchId,
                                  items?.selectionId,
                                  items?.runnerName,
                                  'Soccer',
                                  items?.layPrice3,
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
                            text={items?.layPrice3 || '0'}
                            size={
                              items?.laysize3 && items?.layPrice3
                                ? intToString(items?.laysize3 || 0)
                                : '0'
                            }
                            disabled={items?.layPrice3 ? false : true}
                          />
                        </div>
                        {items?.status !== '' && items?.status !== 'ACTIVE' && (
                          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                            <SuspendedBtn status={items?.status} />
                          </div>
                        )}
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
      </div>
      {openModal && <LoginModal open={openModal} setOpen={setOpenModal} />}
    </div>
  );
};

MatchOddsSoccer.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.array,
  fixtureEventName: PropTypes.array,
  placedBetWinLossDatas: PropTypes.object,
  competition_name: PropTypes.string,
};

export default MatchOddsSoccer;
