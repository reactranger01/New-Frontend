/* eslint-disable react-hooks/exhaustive-deps */
import {
  BlueBtn,
  Loading,
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
import { getAuthData, isLoggedIn } from '@/utils/apiHandlers';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { useMediaQuery } from '@mui/material';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { openModal } from '@/redux/Slices/modalSlice';

const Sessions = ({
  sessionBooksetClcuData,
  data,
  matchName,
  particularMatchData,
  competition_name,
  oddsData,
}) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line

  const isLogin = isLoggedIn();
  const inplay = oddsData?.inplay;
  const [isOpen, setIsOpen] = useState(false);
  const [singleRowData, setSingleRowData] = useState({});
  const userIdBalance = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState([]);
  const betData = useSelector((state) => state.bet.selectedBet);
  const betsFancy = useSelector((state) => state.bet.selectedBet);
  const activeBetSlip = useSelector((state) => state.activeNewBet.activeIndex);
  const isMobile = useMediaQuery('(max-width:1024px)');
  const stateUpdate = useSelector(
    (state) => state?.updatestate?.betPlacementSuccess,
  );
  const addToNormalBetPlace = async (
    item,
    betType,
    index,
    price,
    betOn,
    matchName,
    percent,
    nationName,
    fancy,
    minimumBet,
    maximumBet,
  ) => {
    if (isLogin) {
      dispatch(
        fetchBetDetailsAction([
          {
            marketId: String(particularMatchData?.marketId),
            eventId: Number(fancy?.eventId),
            gameId: 4,
            selectionId: String(item.SelectionId),
            betOn: betType,
            price: parseFloat(price),
            stake: '',
            eventType: 'Cricket',
            competition: competition_name,
            event: particularMatchData?.eventName,
            market: fancy.market,
            gameType: betOn,
            nation: nationName,
            type: betType,
            runners: 2,
            row: index,
            calcFact: betOn === 'fancy' ? 0 : 1,
            bettingOn: betOn,
            matchName: matchName,
            percent: parseFloat(percent),
            selection: item.RunnerName,
            minimumBet: minimumBet,
            maximumBet: maximumBet,
            _marketData: fancy,
          },
        ]),
      );
      dispatch(setActiveBetSlipIndex(Number(item.SelectionId)));
      if (!isMobile) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    } else {
      dispatch(openModal('login'));
    }
  };

  const handleShowSessionRisk = (session) => {
    setIsOpen((pre) => !pre);
    setSingleRowData({
      gameId: 4,
      eventId: data?.eventId,
      selectionId: session?.SelectionId,
      userId: userIdBalance?.id,
      gameType: session?.gtype,
      commision: userIdBalance?.ap,
      RunnerName: session?.RunnerName,
    });
  };
  const getSessionData = async () => {
    setLoading(true);
    try {
      const response = await getAuthData(
        `/user/getsessionPLbyuserid?eventId=${singleRowData?.eventId}&gameId=${singleRowData?.gameId}&selectionId=${singleRowData?.selectionId}&userId=${singleRowData?.userId}&gameType=${singleRowData?.gameType}&commision=${singleRowData?.commision}`,
      );

      if (response?.status === 201 || response?.status === 200) {
        if (response?.data) {
          setRiskData(response?.data);
        }
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      return null;
    }
    setLoading(false);
  };
  useEffect(() => {
    if (
      singleRowData?.eventId &&
      singleRowData?.gameId &&
      singleRowData?.selectionId &&
      singleRowData?.userId
    ) {
      getSessionData();
    }
  }, [
    singleRowData?.eventId,
    singleRowData?.gameId,
    singleRowData?.selectionId,
    singleRowData?.userId,
    stateUpdate,
  ]);
  return (
    <>
      {' '}
      {loading && <Loading />}
      <div className="flex flex-col mb-5">
        <div className="flex items-center py-[10px] justify-between bg-[#ECEAEA]">
          <div className=" font-bold text-12 pl-1">Fancy</div>
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
          {data === null || data?.catalogue?.[0]?.runners?.length === 0 ? (
            <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
              <span className="text-12">
                Fancy data is currently unavailable for this match.
              </span>
            </div>
          ) : (
            <>
              {data &&
                data?.catalogue &&
                data?.catalogue?.[0]?.runners?.map((items, index) => {
                  const profitLoss = Array.isArray(sessionBooksetClcuData)
                    ? sessionBooksetClcuData.find(
                        (fancy) =>
                          Number(fancy.selection_id) ===
                          Number(items?.SelectionId),
                      )
                    : null;
                  let minLimitsession, maxLimitsession;
                  if (inplay) {
                    minLimitsession = oddsData?.inPlayFancyMinLimit;
                    maxLimitsession = oddsData?.inPlayFancyMaxLimit;
                  } else {
                    minLimitsession = oddsData?.offPlayFancyMinLimit;
                    maxLimitsession = oddsData?.offPlayFancyMaxLimit;
                  }
                  return (
                    <>
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row  justify-between items-center w-full border-b border-gray-200  bg-white mb-2"
                      >
                        <div className="flex items-center  w-full  px-2">
                          <div className="  text-12 font-medium ">
                            {' '}
                            {items?.RunnerName}
                            <div className="flex gap-[2px] ">
                              {profitLoss?.max_loss && (
                                <span className="text-12 text-black">
                                  Max Exposure:
                                </span>
                              )}
                              <span
                                className={`text-12  font-semibold ${
                                  profitLoss?.max_loss > 0
                                    ? 'text-green-500'
                                    : 'text-red-500'
                                }`}
                              >
                                {profitLoss?.max_loss.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                        {isLogin && (
                          <div
                            onClick={() => {
                              if (profitLoss) {
                                handleShowSessionRisk(items);
                              }
                            }}
                            className={` ${
                              profitLoss ? 'text-black' : '!text-[#7c7979]'
                            } text-16 mx-2`}
                          >
                            {reactIcons?.dladder}
                          </div>
                        )}
                        <div className="relative min-w-[360px] shrink-0">
                          <div className="grid grid-cols-6 ">
                            <PinkBtn disabled={true} />
                            <PinkBtn disabled={true} />
                            <PinkBtn
                              onClick={async () => {
                                await addToNormalBetPlace(
                                  items,
                                  'LAY',
                                  index,
                                  items.LayPrice1,
                                  data.market,
                                  matchName,
                                  items.LaySize1,
                                  items.RunnerName,
                                  data,
                                  minLimitsession,
                                  maxLimitsession,
                                );
                              }}
                              text={items?.LayPrice1 || '0'}
                              size={
                                items?.LaySize1 && items?.LayPrice1
                                  ? intToString(items?.LaySize1)
                                  : '0'
                              }
                              disabled={items?.LayPrice1 ? false : true}
                            />
                            <BlueBtn
                              onClick={async () => {
                                await addToNormalBetPlace(
                                  items,
                                  'BACK',
                                  index,
                                  items.BackPrice1,
                                  data.market,
                                  matchName,
                                  items.BackSize1,
                                  items.RunnerName,
                                  data,
                                  minLimitsession,
                                  maxLimitsession,
                                );
                              }}
                              text={items?.BackPrice1 || '0'}
                              size={
                                items?.BackSize1 && items?.BackPrice1
                                  ? intToString(items?.BackSize1)
                                  : '0'
                              }
                              disabled={items?.BackPrice1 ? false : true}
                            />

                            <BlueBtn disabled={true} />
                            <BlueBtn disabled={true} />
                          </div>
                          {items?.GameStatus !== '' &&
                            items?.GameStatus !== 'ACTIVE' && (
                              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                                <SuspendedBtn status={items?.GameStatus} />
                              </div>
                            )}
                        </div>
                      </div>

                      <div>
                        {isOpen &&
                          singleRowData?.selectionId == items?.SelectionId && (
                            <div className="w-full flex mb-3 justify-end">
                              <div className="w-[400px] max-h-[210px] overflow-y-auto theme-scroller example">
                                <table className="w-full min-w-full ">
                                  <thead>
                                    <tr className="bg-[#EDEDED] text-black w-full border-b border-b-[#424242]  xl:text-14 text-12">
                                      <th className=" w-[50%] ">
                                        <div className="border-l border-l-[#424242] xl:text-14 text-12">
                                          Runs
                                        </div>
                                      </th>{' '}
                                      <th className="w-[50%]  ">
                                        <div className="border-r border-r-[#424242] xl:text-14 border-l border-l-[#424242] text-12 ">
                                          P&L
                                        </div>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="">
                                    {riskData &&
                                      riskData?.map((items, index) => {
                                        return (
                                          <tr
                                            key={index}
                                            className="bg-white text-black w-full border-b border-b-[#424242] divide-[#b9b7b7] xl:text-14 text-12"
                                          >
                                            <td className="w-[50%] text-center  xl:text-14 text-12">
                                              <div className="border-l border-l-[#424242]">
                                                {items?.position}
                                              </div>
                                            </td>{' '}
                                            <td className=" w-[50%]  text-12">
                                              <div
                                                className={` ${
                                                  items?.profit_or_loss > 0
                                                    ? 'text-green-700'
                                                    : 'text-red-700'
                                                } border-r border-r-[#424242] border-l text-center border-l-[#424242] xl:text-14 text-12`}
                                              >
                                                {numberWithCommas(
                                                  items?.profit_or_loss,
                                                ) || 0}
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                      </div>
                      {activeBetSlip == items?.SelectionId &&
                        Number(items?.SelectionId) ==
                          Number(betsFancy[0]?.selectionId) &&
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
                    <div className="text-right pr-1">
                      Min : {oddsData?.inPlayFancyMinLimit}
                    </div>
                    <div className="border-l pl-1 border-black ">
                      Min : {oddsData?.inPlayFancyMaxLimit}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

Sessions.propTypes = {
  matchName: PropTypes.string,
  sessionBooksetClcuData: PropTypes.any,
  data: PropTypes.object,
  particularMatchData: PropTypes.object,
  marketId: PropTypes.any,
  competition_name: PropTypes.string,
  oddsData: PropTypes.object,
};

export default Sessions;
