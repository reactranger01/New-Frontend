import {
  BallRunning,
  // BlankBlueBtn,
  // BlankBtn,
  // BlankPinkBtn,
  BlueBtn,
  PinkBtn,
  SuspendedBtn,
} from '@/components';
import { reactIcons } from '@/utils/icons';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { intToString } from '@/utils/margeData';
import { fetchBetDetailsAction } from '@/redux/actions';
import { useDispatch } from 'react-redux';
import { LoginModal } from '@/containers/pageListAsync';
import { isLoggedIn } from '@/utils/apiHandlers';
import { isMobile } from 'react-device-detect';

const Fancy = ({
  data,
  matchName,
  fixtureEventName,
  marketId,
  placedBetWinLossFancy,
  competition_name,
}) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const isLogin = isLoggedIn();

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
  ) => {
    dispatch(
      fetchBetDetailsAction([
        {
          marketId: String(marketId),
          eventId: Number(fancy?.eventId),
          gameId: 4,
          selectionId: String(item.SelectionId),
          betOn: betType,
          price: parseFloat(price),
          stake: '',
          eventType: 'Cricket',
          competition: competition_name,
          event: `${fixtureEventName?.[0]?.['runners']?.[0]?.runnerName} v ${fixtureEventName?.[0]?.['runners']?.[1]?.runnerName}`,
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
          _marketData: fancy,
        },
      ]),
    );
    if (!isMobile) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className=" hidden flex-col mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center  font-medium text-xl">
          <span className="text-[#e4c41e] mx-1">{reactIcons.star}</span> Fancy
        </div>
        <div className="sm:grid hidden grid-cols-6 min-w-[360px]">
          <div></div>
          <div></div>
          <div className="flex-center text-12 font-medium">No</div>
          <div className="flex-center text-12 font-medium">Yes</div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="w-full">
        {data === null || data?.runners?.length === 0 ? (
          <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
            <span className="text-12">
              Fancy data is currently unavailable for this match.
            </span>
          </div>
        ) : (
          <>
            {data &&
              data?.runners &&
              data?.runners?.map((items, index) => {
                const fancyExposer =
                  placedBetWinLossFancy?.type === 'fancy' &&
                  placedBetWinLossFancy?.exposer !== ''
                    ? placedBetWinLossFancy?.exposer?.find(
                        (fancy) => fancy?.id === Number(items?.SelectionId),
                      )
                    : '';
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row  justify-between items-center w-full border-b border-gray-200  bg-white mb-2"
                  >
                    <div className="flex items-center justify-between w-full  px-2">
                      <div className="flex-1  text-12 font-medium ">
                        {' '}
                        {items?.RunnerName}
                      </div>
                      {fancyExposer ? (
                        <>
                          <div>
                            {fancyExposer?.type === 'profit' ? (
                              <div className="">
                                {' '}
                                <span
                                  className={`text-14 ${
                                    fancyExposer?.data > 0
                                      ? 'text-[#04a928]'
                                      : 'text-black'
                                  }`}
                                >
                                  {(fancyExposer?.data || 0).toFixed(2) || 0}
                                </span>
                              </div>
                            ) : (
                              0
                            )}
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                    </div>

                    {items?.GameStatus === '' ||
                    items?.GameStatus === 'ACTIVE' ? (
                      <div className="grid grid-cols-6  min-w-[360px] shrink-0">
                        <PinkBtn disabled={true} />
                        <PinkBtn disabled={true} />
                        <PinkBtn
                          onClick={async () => {
                            if (isLogin) {
                              await addToNormalBetPlace(
                                items,
                                'BACK',
                                index,
                                items.LayPrice1,
                                data.market,
                                matchName,
                                items.LaySize1,
                                items.RunnerName,
                                data,
                              );
                            } else {
                              setOpenModal(true);
                            }
                          }}
                          text={items?.LayPrice1 || '-'}
                          size={
                            items?.LaySize1 && items?.LayPrice1
                              ? intToString(items?.LaySize1)
                              : ''
                          }
                          disabled={items?.LayPrice1 ? false : true}
                        />
                        <BlueBtn
                          onClick={async () => {
                            if (isLogin) {
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
                              );
                            } else {
                              setOpenModal(true);
                            }
                          }}
                          text={items?.BackPrice1 || '-'}
                          size={
                            items?.BackSize1 && items?.BackPrice1
                              ? intToString(items?.BackSize1)
                              : ''
                          }
                          disabled={items?.BackPrice1 ? false : true}
                        />

                        <BlueBtn disabled={true} />
                        <BlueBtn disabled={true} />
                      </div>
                    ) : (
                      <>
                        {items?.GameStatus == 'SUSPENDED' ? (
                          <div className=" h-full flex-center w-[360px] shrink-0">
                            <SuspendedBtn status={items?.GameStatus} />
                          </div>
                        ) : (
                          <div className=" h-full flex-center w-[360px] shrink-0">
                            <BallRunning status={items?.GameStatus} />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
          </>
        )}
      </div>
      {openModal && <LoginModal open={openModal} setOpen={setOpenModal} />}
    </div>
  );
};

Fancy.propTypes = {
  heading: PropTypes.string,
  matchName: PropTypes.string,
  data: PropTypes.array,
  fixtureEventName: PropTypes.array,
  marketId: PropTypes.any,
  placedBetWinLossFancy: PropTypes.object,
  competition_name: PropTypes.string,
};

export default Fancy;
