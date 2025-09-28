import { BlueBtn, NewBetSlip, PinkBtn, SuspendedBtn } from '@/components';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { intToString } from '@/utils/margeData';
import { isLoggedIn } from '@/utils/apiHandlers';
import { fetchBetDetailsAction } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useMediaQuery } from '@mui/material';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { updatePlacedBetCalculation } from '@/utils/helper';
import { openModal } from '@/redux/Slices/modalSlice';

const BookMaker = ({
  heading,
  data,
  placedBetWinLossBookmakerData,
  competition_name,
  oddsData,
  matchName,
}) => {
  const isLogin = isLoggedIn();
  const EventId = data['0']?.EventID;
  const [bets, setBets] = useState([]);
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);
  const isMobile = useMediaQuery('(max-width:1024px)');
  const betData = useSelector((state) => state.bet.selectedBet);
  const calculation = useSelector((state) => state?.calculation?.currentValue);
  const updatedCalculation = calculation
    ? updatePlacedBetCalculation(
        calculation,
        heading,
        placedBetWinLossBookmakerData,
      )
    : placedBetWinLossBookmakerData;
  const inplay = oddsData?.inplay;
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
    if (isLogin) {
      if (OddsPrice > 1) {
        setBets([
          {
            marketId: String(data?.market_id),
            eventId: Number(eventId || EventId),
            gameId: 4,
            selectionId: String(selectionId),
            betOn: selectType,
            price: parseFloat(OddsPrice),
            stake: '',
            eventType: game,
            competition: competition_name,
            event: matchName,
            market: 'bookmaker',
            gameType: 'bookmaker',
            nation: betDetails,
            type: selectType,
            calcFact: 0,
            bettingOn: 'bookmaker',
            runners: 2,
            row: 1,
            matchName: matchName,
            percent: 100,
            selection: betDetails,
            minimumBet: minimumBet,
            maximumBet: maximumBet,
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

  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-center py-[10px] justify-between bg-[#ECEAEA]">
        <div className=" font-bold text-12 pl-1">{heading}</div>
        <div className="sm:grid hidden grid-cols-6 min-w-[360px]">
          <div></div>
          <div></div>
          <div className="flex-center text-14 font-bold">Back</div>
          <div className="flex-center text-14 font-bold">Lay</div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="w-full border border-[#ddd]">
        {data === null || data['0']?.runners?.length === 0 ? (
          <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
            <span className="text-12">
              Bookmaker data is currently unavailable for this match.
            </span>
          </div>
        ) : (
          <>
            {data['0'] &&
              data['0']?.runners &&
              data['0']?.runners?.map((items, index) => {
                const bookmakerExposer =
                  updatedCalculation?.type == 'bookmaker' &&
                  updatedCalculation?.exposer != ''
                    ? updatedCalculation?.exposer?.find(
                        (odd) => odd?.id == items?.selectionId,
                      )
                    : '';
                let minLimitBookmaker, maxLimitBookmaker;
                if (inplay) {
                  minLimitBookmaker = oddsData?.inPlayBookMinLimit;
                  maxLimitBookmaker = oddsData?.inPlayBookMaxLimit;
                } else {
                  minLimitBookmaker = oddsData?.offPlayBookMinLimit;
                  maxLimitBookmaker = oddsData?.offPlayBookMaxLimit;
                }
                return (
                  <>
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row  justify-between items-center w-full border-b border-gray-200  bg-white"
                    >
                      <div className="flex items-center justify-between w-full  px-2">
                        <div className="  text-12 font-medium ">
                          {' '}
                          {items?.runnerName}
                          {bookmakerExposer ? (
                            <>
                              <div>
                                <div
                                  className={`flex gap-1 font-semibold text-12 items-center ${
                                    bookmakerExposer?.type == 'profit'
                                      ? 'text-[#04a928]'
                                      : 'text-[#CE2C16]'
                                  }`}
                                >
                                  <span className=" ">
                                    {reactIcons?.doubleArrowR}{' '}
                                  </span>
                                  <span className=" ">
                                    {Number(
                                      bookmakerExposer?.data || 0,
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

                      <div className="  min-w-[360px] relative shrink-0">
                        <div className="grid grid-cols-6">
                          <BlueBtn disabled={true} />
                          <BlueBtn disabled={true} />
                          <BlueBtn
                            onClick={async () => {
                              await addToBetPlace(
                                EventId,
                                items?.selectionId,
                                items?.runnerName,
                                'Cricket',
                                items?.backPrice1,
                                data?.marketName,
                                'BACK',
                                data,
                                'BOOKMAKERS',
                                minLimitBookmaker,
                                maxLimitBookmaker,
                              );
                            }}
                            text={items?.backPrice1 || '0'}
                            size={
                              items?.backsize1 && items?.backPrice1
                                ? intToString(items?.backsize1)``
                                : '0'
                            }
                            disabled={items?.backPrice1 ? false : true}
                          />
                          <PinkBtn
                            onClick={async () => {
                              await addToBetPlace(
                                EventId,
                                items?.selectionId,
                                items?.runnerName,
                                'Cricket',
                                items?.layPrice1,
                                data?.marketName,
                                'LAY',
                                data,
                                'BOOKMAKERS',
                                minLimitBookmaker,
                                maxLimitBookmaker,
                              );
                            }}
                            text={items?.layPrice1 || '0'}
                            size={
                              items?.laysize1 && items?.layPrice1
                                ? intToString(items?.laysize1)
                                : '0'
                            }
                            disabled={items?.layPrice1 ? false : true}
                          />
                          <PinkBtn disabled={true} />
                          <PinkBtn disabled={true} />
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
              })}{' '}
          </>
        )}
      </div>
    </div>
  );
};

BookMaker.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.object,
  placedBetWinLossBookmakerData: PropTypes.object,
  competition_name: PropTypes.string,
  matchName: PropTypes.string,
  oddsData: PropTypes.object,
};

export default BookMaker;
