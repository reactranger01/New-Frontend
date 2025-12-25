import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import PropTypes from 'prop-types';
import { Navigation, Autoplay } from 'swiper/modules';
import { reactIcons } from '@/utils/icons';
import { casinoImgs } from '@/utils/constants';
import { getImage } from '@/utils/imagekit';

const CasinoSlider = ({ setProviderSearch, setUrl, setSelectedIndex }) => {
  return (
    <div className="pb-4 relative ">
      <Swiper
        pagination={true}
        spaceBetween={10}
        loop={true}
        breakpoints={{
          10: {
            slidesPerView: 1,
            spaceBetween: 10,
          },

          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1424: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: '.slider1',
          prevEl: '.slider2',
        }}
        className="mySwiper"
      >
        {casinoImgs.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => {
                setProviderSearch(item?.provider);
                setSelectedIndex(item?.id);
                setUrl(null);
              }}
            >
              <div className=" h-[150px]">
                <img
                  src={getImage(item.path)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="ay-center text-16 slider2 disabled:opacity-30 size-8 flex-center bg-white rounded-full left-3 z-20">
        {reactIcons.arrowleft}
      </button>
      <button className="ay-center text-16 slider1 disabled:opacity-30 size-8 flex-center bg-white rounded-full right-3 z-20">
        {reactIcons.arrowright}
      </button>
    </div>
  );
};
CasinoSlider.propTypes = {
  setProviderSearch: PropTypes.func,
  setSelectedIndex: PropTypes.func,
  setUrl: PropTypes.func.isRequired,
};
export default CasinoSlider;
