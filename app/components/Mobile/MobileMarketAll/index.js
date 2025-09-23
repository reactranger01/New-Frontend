/* eslint-disable react-hooks/exhaustive-deps */
import { BlueBtn, PinkBtn } from '@/components';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const MobileMarketAll = ({ inplayData, gameNameS }) => {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const swipersRef = useRef([]);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper?.activeIndex;

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const syncAllSwipers = () => {
    swipersRef.current.forEach((swiper) => {
      if (swiper && swiper.activeIndex !== activeIndex) {
        swiper.slideTo(activeIndex);
      }
    });
  };

  useEffect(() => {
    syncAllSwipers();
  }, [activeIndex]);
  return (
    <div className="bg-white w-full">
      {inplayData === null || inplayData?.length === 0
        ? ''
        : inplayData &&
          inplayData.map((_items, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  navigate(
                    _items?.event_id
                      ? `/${gameNameS}/market/${_items?.event_id}`
                      : `/${gameNameS}/market/${_items?.matchId}`,
                    { state: { data: _items } },
                  )
                }
                className="flex items-center cursor-pointer justify-between h-[42px] border-y border-[#ddd]"
              >
                <div className="w-[50px] h-[42px] border-r border-[#ddd]">
                  <div className=" flex-col  flex w-fit justify-center h-full text-[#1e8067] font-medium text-[9px] ">
                    <div className="leading-3   text-center w-full">
                      {moment(_items?.matchDateTime).format('DD/MM/YYYY')}
                    </div>
                    <div className="leading-3  text-center w-full">
                      {moment(_items?.matchDateTime).format('hh:mm A')}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() =>
                    navigate(
                      _items?.event_id
                        ? `/${gameNameS}/market/${_items?.event_id}`
                        : `/${gameNameS}/market/${_items?.matchId}`,
                      { state: { data: _items } },
                    )
                  }
                  className="relative flex items-center px-2 h-full text-10 overflow-hidden w-full"
                >
                  <p className="text-[11px] font-bold text-black truncate w-[calc(100%-20px)]">
                    {_items?.name}
                  </p>
                  {_items.inplay && (
                    <div className="flex items-center justify-center shrink-0 px-1">
                      <img
                        src="/images/mobTv.webp"
                        className="w-[13px] h-[11px]"
                        alt=""
                      />
                    </div>
                  )}
                </div>

                <div className="">
                  <Swiper
                    autoplay={{
                      delay: 3500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper w-[180px]"
                    onSwiper={(swiper) => (swipersRef.current[index] = swiper)}
                    onSlideChange={() =>
                      handleSlideChange(swipersRef.current[index])
                    }
                    initialSlide={activeIndex}
                  >
                    <SwiperSlide>
                      <div className="flex ">
                        <div className="mr-[2px] grid grid-cols-3 w-full ">
                          {_items?.runners?.[0]?.backPrice1 ? (
                            <BlueBtn
                              text={_items?.runners?.[0]?.backPrice1}
                              size={_items?.runners?.[0]?.backsize1 || '-'}
                            />
                          ) : (
                            <BlueBtn disabled={true} text={'-'} />
                          )}
                          {_items?.runners?.[2]?.backPrice1 ? (
                            <BlueBtn
                              text={_items?.runners?.[2]?.backPrice1 || '-'}
                              size={_items?.runners?.[2]?.backsize1 || '-'}
                            />
                          ) : (
                            <>
                              <BlueBtn disabled={true} text={'-'} />
                            </>
                          )}
                          {_items?.runners?.[1]?.backPrice1 ? (
                            <BlueBtn
                              text={_items?.runners?.[1]?.backPrice1 || '-'}
                              size={_items?.runners?.[1]?.backsize1 || '-'}
                            />
                          ) : (
                            <>
                              <BlueBtn disabled={true} text={'-'} />
                            </>
                          )}
                        </div>
                        <div className="bg-[#f9c9d4] text-[#f9c9d4] w-1  overflow-hidden h-[42px] text-10">
                          d
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="flex  gap-[2px]">
                        <div className="bg-[#a7d8fd] text-[#a7d8fd] w-1  overflow-hidden h-[42px] text-10">
                          d
                        </div>
                        <div className="grid grid-cols-3 w-full">
                          {_items?.runners?.[0]?.layPrice1 ? (
                            <PinkBtn
                              text={_items?.runners?.[0]?.layPrice1 || '-'}
                              size={_items?.runners?.[0]?.laysize1 || '-'}
                            />
                          ) : (
                            <PinkBtn disabled={true} text={'-'} />
                          )}
                          {_items?.runners?.[2]?.layPrice1 ? (
                            <PinkBtn
                              text={_items?.runners?.[2]?.layPrice1 || '-'}
                              size={_items?.runners?.[2]?.laysize1 || '-'}
                            />
                          ) : (
                            <>
                              <PinkBtn disabled={true} text={'-'} />
                            </>
                          )}
                          {_items?.runners?.[1]?.layPrice1 ? (
                            <PinkBtn
                              text={_items?.runners?.[1]?.layPrice1 || '-'}
                              size={_items?.runners?.[1]?.laysize1 || '-'}
                            />
                          ) : (
                            <>
                              <PinkBtn disabled={true} text={'-'} />
                            </>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            );
          })}
    </div>
  );
};
MobileMarketAll.propTypes = {
  gameNameS: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  inplayData: PropTypes.array.isRequired,
};

export default MobileMarketAll;
