import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { Navigation, Autoplay } from 'swiper/modules';
import { reactIcons } from '@/utils/icons';
import { useNavigate } from 'react-router-dom';
import { getImage } from '@/utils/imagekit';

const SliderTwo = ({ number, imgs, num1, num2, hide }) => {
  const navigate = useNavigate();
  const handleCasino = (item) => {
    navigate('/', { state: item });
  };

  return (
    <div className="mb-2 relative">
      <Swiper
        pagination={true}
        loop={true}
        slidesPerView={number}
        spaceBetween={10}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          10: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          550: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1124: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1424: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: `.${num1}`,
          prevEl: `.${num2}`,
        }}
        className="mySwiper"
      >
        {imgs.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => handleCasino(item)}
              className="h-[180px] sm:h-[220px] md:h-[240px] lg:h-[260px] xl:h-[280px] w-full flex flex-col justify-between"
            >
              <div className={'h-full w-full  overflow-hidden'}>
                <img
                  src={getImage(item.path)}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-[#FAB841] text-[#420A57] px-2 py-1 sm:px-4 sm:py-2 text-center text-14 sm:text-16 md:text-18 lg:text-20 xl:text-22 flex items-center justify-center">
                <p className="truncate">{item.title}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {!hide && (
        <>
          <button
            className={`ay-center text-16 ${num2} disabled:opacity-30 size-8 flex-center bg-white rounded-full left-3 z-20`}
          >
            {reactIcons.arrowleft}
          </button>
          <button
            className={`ay-center text-16 ${num1} disabled:opacity-30 size-8 flex-center bg-white rounded-full right-3 z-20`}
          >
            {reactIcons.arrowright}
          </button>
        </>
      )}
    </div>
  );
};

SliderTwo.propTypes = {
  number: PropTypes.number,
  hide: PropTypes.bool,
  num1: PropTypes.string,
  num2: PropTypes.string,
  css: PropTypes.string,
  imgs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SliderTwo;
