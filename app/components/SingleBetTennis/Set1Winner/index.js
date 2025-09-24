{
  /* eslint-disable */
}
import {
  // BlankBlueBtn,
  // BlankBtn,
  // BlankPinkBtn,
  BlueBtn,
  NewBetSlip,
  PinkBtn,
  SuspendedBtn,
} from '@/components';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { intToString } from '@/utils/margeData';
import { fetchBetDetailsAction } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '@/utils/apiHandlers';
import { LoginModal } from '@/containers/pageListAsync';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { useMediaQuery } from '@mui/material';
import { updatePlacedBetCalculation } from '@/utils/helper';
const Set1Winner = ({
  heading,
  data,
  placedBetWinLossDatas,
  competition_name,
  allMarketData,
}) => {
  const isLogin = isLoggedIn();
  const [openModal, setOpenModal] = useState(false);
  const [bets, setBets] = useState([]);
  const dispatch = useDispatch();
  const inplay = data?.inplay;
  const isMobile = useMediaQuery('(max-width:1024px)');
  const betData = useSelector((state) => state.bet.selectedBet);
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);
  const calculation = useSelector((state) => state?.calculation?.currentValue);
  const updatedCalculation = calculation
    ? updatePlacedBetCalculation(calculation, heading, placedBetWinLossDatas)
    : placedBetWinLossDatas;
  const addToBetPlace = (
    eventId,
    selectionId,
    betDetails,
    game,
    OddsPrice,
    betType,
    selectType,
    _marketData,
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
    if (!isMobile) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };
  useEffect(() => {
    if (bets?.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
      if (isMobile) {
        dispatch(setActiveBetSlipIndex(bets[0]?.selectionId));
      }
    }
  }, [bets, dispatch, isMobile]);
  let minLimitOdds, maxLimitOdds;
  if (inplay) {
    minLimitOdds = data.inPlayMinLimit;
    maxLimitOdds = data.inPlayMaxLimit;
  } else {
    minLimitOdds = data.offPlayMinLimit;
    maxLimitOdds = data.offPlayMaxLimit;
  }
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

      <div className="w-full">
        {data === null || data?.length === 0 ? (
          <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
            <span className="text-12">
              {heading} data is currently unavailable for this match.
            </span>
          </div>
        ) : (
          <>
            {data &&
              data?.runners &&
              data?.runners?.map((items, index) => {
                const underMarketExposer =
                  updatedCalculation?.type == 'odds' &&
                  updatedCalculation?.exposer != ''
                    ? updatedCalculation?.exposer?.find(
                        (odd) =>
                          odd?.id == items?.selectionId &&
                          odd?.marketName == data?.market_name,
                      )
                    : '';
                let minLimitOdds, maxLimitOdds;
                if (inplay) {
                  minLimitOdds = allMarketData?.inPlayMinLimit;
                  maxLimitOdds = allMarketData?.inPlayMaxLimit;
                } else {
                  minLimitOdds = allMarketData?.offPlayMinLimit;
                  maxLimitOdds = allMarketData?.offPlayMaxLimit;
                }
                return (
                  <>
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-center w-full border-b border-gray-200  bg-white mb-2"
                    >
                      <div className="flex items-center justify-between w-full  px-2">
                        <div className="  text-12 font-medium ">
                          {' '}
                          {items?.runnerName}
                          {underMarketExposer ? (
                            <>
                              <div>
                                <div
                                  className={`flex gap-1 font-semibold text-14 items-center ${
                                    underMarketExposer?.type == 'profit'
                                      ? 'text-[#04a928]'
                                      : 'text-[#CE2C16]'
                                  }`}
                                >
                                  <span className=" ">
                                    {reactIcons?.doubleArrowR}{' '}
                                  </span>
                                  <span className=" ">
                                    {Number(
                                      underMarketExposer?.data || 0,
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
                          <BlueBtn disabled={true} />
                          <BlueBtn disabled={true} />
                          <BlueBtn
                            onClick={async () => {
                              if (isLogin) {
                                await addToBetPlace(
                                  data?.eventid || data?.matchId,
                                  items?.selectionId,
                                  items?.runnerName,
                                  'Tennis',
                                  items?.back?.[1]?.price,
                                  data?.market_name,
                                  'BACK',
                                  data,
                                  minLimitOdds,
                                  maxLimitOdds,
                                );
                              } else {
                                setOpenModal(true);
                              }
                            }}
                            text={items?.back?.[1]?.price || '0'}
                            size={
                              items?.back?.[1]?.size && items?.back?.[1]?.price
                                ? intToString(items?.back?.[1]?.size || 0)
                                : '0'
                            }
                            disabled={items?.back?.[1]?.price ? false : true}
                          />
                          <PinkBtn
                            onClick={async () => {
                              if (isLogin) {
                                await addToBetPlace(
                                  data?.eventid || data?.matchId,
                                  items?.selectionId,
                                  items?.runnerName,
                                  'Tennis',
                                  items?.lay?.[0]?.price,
                                  data?.market_name,
                                  'LAY',
                                  data,
                                  minLimitOdds,
                                  maxLimitOdds,
                                );
                              } else {
                                setOpenModal(true);
                              }
                            }}
                            text={items?.lay?.[0]?.price || '0'}
                            size={
                              items?.ex?.availableToLay?.[0]?.size &&
                              items?.lay?.[0]?.price
                                ? intToString(items?.lay?.[0]?.size || 0)
                                : '0'
                            }
                            disabled={items?.lay?.[0]?.price ? false : true}
                          />
                          <PinkBtn disabled={true} />
                          <PinkBtn disabled={true} />
                        </div>

                        {items?.status !== '' ||
                          (items?.status !== 'ACTIVE' && (
                            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                              <SuspendedBtn
                                status={items?.status || 'SUSPENDED'}
                              />
                            </div>
                          ))}
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
      {openModal && <LoginModal open={openModal} setOpen={setOpenModal} />}
    </div>
  );
};

Set1Winner.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.array,
  eventId: PropTypes.any,
  competition_name: PropTypes.string,
  placedBetWinLossDatas: PropTypes.object,
  allMarketData: PropTypes.array,
};

export default Set1Winner;
