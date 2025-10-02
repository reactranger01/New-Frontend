import { BlueBtn, NewBetSlip, PinkBtn, SuspendedBtn } from '@/components';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { intToString } from '@/utils/margeData';
import { isLoggedIn } from '@/utils/apiHandlers';
import { fetchBetDetailsAction } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { useMediaQuery } from '@mui/material';
import { updatePlacedBetCalculation } from '@/utils/helper';
import { openModal } from '@/redux/Slices/modalSlice';

const MatchOdds = ({ heading, data, placedBetWinLossDatas }) => {
  const isLogin = isLoggedIn();
  const [bets, setBets] = useState([]);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:1024px)');
  const betData = useSelector((state) => state.bet.selectedBet);
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);
  const calculation = useSelector((state) => state?.calculation?.currentValue);
  const updatedCalculation = calculation
    ? updatePlacedBetCalculation(calculation, heading, placedBetWinLossDatas)
    : placedBetWinLossDatas;

  useEffect(() => {
    if (bets?.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
      if (isMobile) {
        dispatch(setActiveBetSlipIndex(bets[0]?.selectionId));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    minBetLimit,
    maxBetLimit,
  ) => {
    if (isLogin) {
      if (OddsPrice > 1) {
        setBets([
          {
            marketId: String(data?.market_id),
            eventId: Number(eventId),
            gameId: Number(data?.sportId),
            selectionId: String(selectionId),
            betOn: selectType,
            price: parseFloat(OddsPrice),
            stake: '',
            eventType: game,
            competition: _marketData?.competition_name,
            event: data?.name,
            market: _marketData.market_name,
            gameType: _marketData.market_name,
            nation: betDetails,
            type: selectType,
            calcFact: 0,
            bettingOn: betType,
            runners: 2,
            row: 1,
            matchName: data?.name,
            percent: 100,
            selection: betDetails,
            minimumBet: minBetLimit,
            maximumBet: maxBetLimit,
            _marketData,
          },
        ]);
      } else {
        toast.error('Market not available');
      }
    } else {
      dispatch(openModal('login'));
    }
  };
  let minLimitOdds, maxLimitOdds;
  if (data.inplay) {
    minLimitOdds = data?.inPlayMinLimit;
    maxLimitOdds = data?.inPlayMaxLimit;
  } else {
    minLimitOdds = data?.offPlayMinLimit;
    maxLimitOdds = data?.offPlayMaxLimit;
  }
  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-center py-[10px] justify-between bg-[#ECEAEA]">
        <div className=" font-bold text-12 pl-1">
          <div className="text-black lg:text-[#e4c41e] mx-1 text-md lg:text-xl">
            {reactIcons.star}
          </div>{' '}
          {heading}
        </div>
        <div className="sm:grid hidden grid-cols-6 min-w-[360px]">
          <div></div>
          <div></div>
          <div className="flex-center text-14 font-bold">Back</div>
          <div className="flex-center text-14 font-bold">Lay</div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="w-full ">
        {data === null || data?.runners?.length === 0 ? (
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
                        (odd) => odd?.id == items?.selectionId,
                      )
                    : '';
                return (
                  <>
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-center w-full border-b border-gray-200  bg-white"
                    >
                      <div className="flex items-center justify-between w-full  px-2">
                        <div className="  text-12 font-medium leading-5">
                          {items?.runnerName}
                          {matchOddsExposer ? (
                            <>
                              <div>
                                <div
                                  className={`flex gap-1 font-semibold text-12 items-center ${
                                    matchOddsExposer?.type == 'profit'
                                      ? 'text-[#04a928]'
                                      : 'text-[#CE2C16]'
                                  }`}
                                >
                                  {/* <span className=" ">
                                    {reactIcons?.doubleArrowR}{' '}
                                  </span> */}
                                  <span className=" ">
                                    (
                                    {Number(
                                      matchOddsExposer?.data || 0,
                                    ).toFixed(2)}
                                    )
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
                              await addToBetPlace(
                                data?.eventid || data?.matchId,
                                items?.selectionId,
                                items?.runnerName,
                                'Cricket',
                                items?.backPrice3 || items?.back?.[2]?.price,
                                data?.market_name,
                                'BACK',
                                data,
                                minLimitOdds,
                                maxLimitOdds,
                              );
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
                              await addToBetPlace(
                                data?.eventid || data?.matchId,
                                items?.selectionId,
                                items?.runnerName,
                                'Cricket',
                                items?.backPrice2 || items?.back?.[1]?.price,
                                data?.market_name,
                                'BACK',
                                data,
                                minLimitOdds,
                                maxLimitOdds,
                              );
                            }}
                            text={items?.backPrice2 || '0'}
                            size={
                              items?.backsize2 && items?.backPrice2
                                ? intToString(items?.backsize2 || 0)
                                : ''
                            }
                            disabled={items?.backPrice2 ? false : true}
                          />
                          <BlueBtn
                            onClick={async () => {
                              await addToBetPlace(
                                data?.eventid || data?.matchId,
                                items?.selectionId,
                                items?.runnerName,
                                'Cricket',
                                items?.backPrice1 || items?.back?.[0]?.price,
                                data?.market_name,
                                'BACK',
                                data,
                                minLimitOdds,
                                maxLimitOdds,
                              );
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
                              await addToBetPlace(
                                data?.eventid || data?.matchId,
                                items?.selectionId,
                                items?.runnerName,
                                'Cricket',
                                items?.layPrice1 || items?.lay?.[0]?.price,
                                data?.market_name,
                                'LAY',
                                data,
                                minLimitOdds,
                                maxLimitOdds,
                              );
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
                              await addToBetPlace(
                                data?.eventid || data?.matchId,
                                items?.selectionId,
                                items?.runnerName,
                                'Cricket',
                                items?.layPrice2 || items?.lay?.[1]?.price,
                                data?.market_name,
                                'LAY',
                                data,
                                minLimitOdds,
                                maxLimitOdds,
                              );
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
                              await addToBetPlace(
                                data?.eventid || data?.matchId,
                                items?.selectionId,
                                items?.runnerName,
                                'Cricket',
                                items?.layPrice3 || items?.lay?.[2]?.price,
                                data?.market_name,
                                'LAY',
                                data,
                                minLimitOdds,
                                maxLimitOdds,
                              );
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
      </div>
    </div>
  );
};

MatchOdds.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.any,
  placedBetWinLossDatas: PropTypes.object,
  competition_name: PropTypes.string,
};

export default MatchOdds;
