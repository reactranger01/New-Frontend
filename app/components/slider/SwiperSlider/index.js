import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { getImage } from '@/utils/imagekit';

const sliderImg = [
  {
    path: '/images/home/1.webp',
  },
  {
    path: '/images/home/1.webp',
  },
  {
    path: '/images/home/1.webp',
  },
];
const SwiperSlider = () => {
  const navigate = useNavigate();
  return (
    <>
      <Swiper pagination={true} className="mySwiper">
        {sliderImg.map((item, index) => (
          <SwiperSlide
            className="mb-2"
            key={index}
            onClick={() => navigate('/')}
          >
            <img
              src={getImage(item.path)}
              alt=""
              className="h-[120px] sm:h-auto lg:w-full w-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperSlider;
