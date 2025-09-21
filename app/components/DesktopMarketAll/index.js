import { reactIcons } from '@/utils/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BlankBtn, BlueBtn, NewBetSlip, PinkBtn, SeeMoreMarkets } from '..';

const DesktopMarketAll = ({
  inplayData,
  gameNameS,
  gameNameB,
  setOpenModal,
  addToBetPlace,
  isLogin,
  activeBetSlip,
  isMobile,
  bets,
  betData,
  showStar = false,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="w-full border border-[#ddd]">
        {inplayData === null || inplayData?.length === 0 ? (
          <div className="flex justify-center items-center w-full h-11 border-b border-gray-200  bg-white">
            <span className="text-12">
              Currently, no in-play matches are available.
            </span>
          </div>
        ) : (
          <>
            {' '}
            {inplayData &&
              inplayData.map((_items, index) => {
                let minLimitOdds, maxLimitOdds;
                if (_items.inplay) {
                  minLimitOdds = _items?.inPlayMinLimit;
                  maxLimitOdds = _items?.inPlayMaxLimit;
                } else {
                  minLimitOdds = _items?.offPlayMinLimit;
                  maxLimitOdds = _items?.offPlayMaxLimit;
                }
                return (
                  <>
                    {!_items?.runners?.[0]?.backPrice1 &&
                    !_items?.runners?.[1]?.backPrice1 &&
                    !_items?.runners?.[2]?.backPrice1 &&
                    !_items?.runners?.[0]?.layPrice1 &&
                    !_items?.runners?.[1]?.layPrice1 &&
                    !_items?.runners?.[2]?.layPrice1 ? (
                      <></>
                    ) : (
                      <div
                        key={index}
                        onClick={() =>
                          navigate(
                            _items?.event_id
                              ? `/${gameNameS}/market/${_items?.event_id}`
                              : `/${gameNameS}/market/${_items?.matchId}`,
                            {
                              state: { data: _items },
                            },
                          )
                        }
                        className="flex flex-col cursor-pointer sm:flex-row justify-between items-center w-full border-b border-[#ddd] bg-white"
                      >
                        <div className="flex items-center  justify-between  gap-1 w-full py-1 px-2">
                          <div className="flex items-center gap-1">
                            {showStar && (
                              <div className="text-[#e4c41e] w-[18px]">
                                {reactIcons.star}
                              </div>
                            )}
                            <div className="flex-1 cursor-pointer  leading-3 text-black  text-12 font-bold hover:underline">
                              {/* {' '}
                              {_items?.runners[0]?.runnerName} v{' '}
                              {_items?.runners[1]?.runnerName} */}
                              {_items?.name}
                            </div>
                          </div>
                          <div></div>
                          {_items.inplay ? (
                            <div className="flex-center text-green-800 gap-1 text-10">
                              <span className="text-green-800 text-14">
                                {reactIcons.play}
                              </span>
                            </div>
                          ) : (
                            ''
                            // <div className="flex flex-col text-10 text-[#0f2327] justify-end items-end ">
                            //   <p className="leading-4">
                            //     {moment(_items?.matchDateTime).format(
                            //       'DD/MM/YYYY',
                            //     )}
                            //   </p>
                            //   <p className="leading-4">
                            //     {moment(_items?.matchDateTime).format(
                            //       'hh:mm A',
                            //     )}
                            //   </p>
                            // </div>
                          )}
                        </div>
                        {_items?.runners?.[0]?.backPrice1 ||
                        _items?.runners?.[1]?.backPrice1 ||
                        _items?.runners?.[2]?.backPrice1 ||
                        _items?.runners?.[0]?.layPrice1 ||
                        _items?.runners?.[1]?.layPrice1 ||
                        _items?.runners?.[2]?.layPrice1 ? (
                          <div className="grid grid-cols-6  sm:min-w-[360px] min-w-[300px]">
                            <div className="">
                              {_items?.runners?.[0]?.backPrice1 ? (
                                <BlueBtn
                                  onClick={() => {
                                    if (isLogin) {
                                      addToBetPlace(
                                        _items?.competition_name,
                                        _items?.event_id || _items?.matchId,
                                        _items?.runners?.[0]?.selectionId,
                                        _items?.runners?.[0],
                                        gameNameB,
                                        _items?.runners?.[0]?.backPrice1,
                                        _items?.market_name,
                                        'BACK',
                                        _items?.name,
                                        _items?.market_id,
                                        _items?.runners,
                                        _items?.sportId,
                                        minLimitOdds,
                                        maxLimitOdds,
                                      );
                                    } else {
                                      setOpenModal(true);
                                    }
                                  }}
                                  text={_items?.runners?.[0]?.backPrice1 || '-'}
                                  size={_items?.runners?.[0]?.backsize1 || '-'}
                                />
                              ) : (
                                <BlankBtn css="bg-[#D3EBFE]" /> //blue
                              )}
                            </div>
                            <div className="">
                              {_items?.runners?.[0]?.layPrice1 ? (
                                <PinkBtn
                                  onClick={() => {
                                    isLogin
                                      ? addToBetPlace(
                                          _items?.competition_name,
                                          _items?.event_id || _items?.matchId,
                                          _items?.runners?.[0]?.selectionId,
                                          _items?.runners?.[0],
                                          gameNameB,
                                          _items?.runners?.[0]?.layPrice1,
                                          _items?.market_name,
                                          'LAY',
                                          _items?.name,
                                          _items?.market_id,
                                          _items?.runners,
                                          _items?.sportId,
                                          minLimitOdds,
                                          maxLimitOdds,
                                        )
                                      : setOpenModal(true);
                                  }}
                                  text={_items?.runners?.[0]?.layPrice1 || '-'}
                                  size={_items?.runners?.[0]?.laysize1 || '-'}
                                />
                              ) : (
                                <BlankBtn css="bg-[#FCE4E9]" /> //pink
                              )}
                            </div>
                            <div className="">
                              {_items?.runners?.[2]?.backPrice1 ? (
                                <BlueBtn
                                  onClick={() => {
                                    isLogin
                                      ? addToBetPlace(
                                          _items?.competition_name,
                                          _items?.event_id || _items?.matchId,
                                          _items?.runners?.[2]?.selectionId,
                                          _items?.runners?.[2],
                                          gameNameB,
                                          _items?.runners?.[2]?.backPrice1,
                                          _items?.market_name,
                                          'BACK',
                                          _items?.name,
                                          _items?.market_id,
                                          _items?.runners,
                                          _items?.sportId,
                                          minLimitOdds,
                                          maxLimitOdds,
                                        )
                                      : setOpenModal(true);
                                  }}
                                  text={_items?.runners?.[2]?.backPrice1 || '-'}
                                  size={_items?.runners?.[2]?.backsize1 || '-'}
                                />
                              ) : (
                                <BlankBtn css="bg-[#D3EBFE]" /> //blue
                              )}
                            </div>
                            <div className="">
                              {_items?.runners?.[2]?.layPrice1 ? (
                                <PinkBtn
                                  onClick={() => {
                                    isLogin
                                      ? addToBetPlace(
                                          _items?.competition_name,
                                          _items?.event_id || _items?.matchId,
                                          _items?.runners?.[2]?.selectionId,
                                          _items?.runners?.[2],
                                          gameNameB,
                                          _items?.runners?.[2]?.layPrice1,
                                          _items?.market_name,
                                          'LAY',
                                          _items?.name,
                                          _items?.market_id,
                                          _items?.runners,
                                          _items?.sportId,
                                          minLimitOdds,
                                          maxLimitOdds,
                                        )
                                      : setOpenModal(true);
                                  }}
                                  text={_items?.runners?.[2]?.layPrice1 || '-'}
                                  size={_items?.runners?.[2]?.laysize1 || '-'}
                                />
                              ) : (
                                <BlankBtn css="bg-[#FCE4E9]" /> //pink
                              )}
                            </div>
                            <div className="">
                              {_items?.runners?.[1]?.backPrice1 ? (
                                <BlueBtn
                                  onClick={() => {
                                    isLogin
                                      ? addToBetPlace(
                                          _items?.competition_name,
                                          _items?.event_id || _items?.matchId,
                                          _items?.runners?.[1]?.selectionId,
                                          _items?.runners?.[1],
                                          gameNameB,
                                          _items?.runners?.[1]?.backPrice1,
                                          _items?.market_name,
                                          'BACK',
                                          _items?.name,
                                          _items?.market_id,
                                          _items?.runners,
                                          _items?.sportId,
                                          minLimitOdds,
                                          maxLimitOdds,
                                        )
                                      : setOpenModal(true);
                                  }}
                                  text={_items?.runners?.[1]?.backPrice1 || '-'}
                                  size={_items?.runners?.[1]?.backsize1 || '-'}
                                />
                              ) : (
                                <BlankBtn css="bg-[#D3EBFE]" /> //blue
                              )}
                            </div>
                            <div className="">
                              {_items?.runners?.[1]?.layPrice1 ? (
                                <PinkBtn
                                  onClick={() => {
                                    isLogin
                                      ? addToBetPlace(
                                          _items?.competition_name,
                                          _items?.event_id || _items?.matchId,
                                          _items?.runners?.[1]?.selectionId,
                                          _items?.runners?.[1],
                                          gameNameB,
                                          _items?.runners?.[1]?.layPrice1,
                                          _items?.market_name,
                                          'LAY',
                                          _items?.name,
                                          _items?.market_id,
                                          _items?.runners,
                                          _items?.sportId,
                                          minLimitOdds,
                                          maxLimitOdds,
                                        )
                                      : setOpenModal(true);
                                  }}
                                  text={_items?.runners?.[1]?.layPrice1 || '-'}
                                  size={_items?.runners?.[1]?.laysize1 || '-'}
                                />
                              ) : (
                                <BlankBtn css="bg-[#FCE4E9]" /> //pink
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-6  sm:min-w-[360px] min-w-[300px]">
                            <div
                              onClick={() =>
                                navigate(
                                  _items?.event_id
                                    ? `/${gameNameS}/market/${_items?.event_id}`
                                    : `/${gameNameS}/market/${_items?.matchId}`,
                                  {
                                    state: { data: _items },
                                  },
                                )
                              }
                              className="col-span-6 flex-center"
                            >
                              <SeeMoreMarkets />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeBetSlip == Number(_items?.matchId) &&
                      Number(_items?.matchId) == Number(bets[0]?.eventId) &&
                      isLogin &&
                      betData?.length > 0 &&
                      isMobile && <NewBetSlip />}
                  </>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

DesktopMarketAll.propTypes = {
  type: PropTypes.string,
  inplayData: PropTypes.object,
  gameNameS: PropTypes.string,
  gameNameB: PropTypes.string,
  setOpenModal: PropTypes.func,
  addToBetPlace: PropTypes.func,
  isLogin: PropTypes.bool,
  activeBetSlip: PropTypes.number,
  isMobile: PropTypes.bool,
  isInplay: PropTypes.bool,
  bets: PropTypes.any,
  betData: PropTypes.any,
  showStar: PropTypes.bool,
};

export default DesktopMarketAll;
