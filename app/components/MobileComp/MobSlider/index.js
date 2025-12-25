import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { mobSlider } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { getImage } from '@/utils/imagekit';

export default function MobSlider() {
  const navigate = useNavigate();
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {mobSlider.map((item, index) => (
          <SwiperSlide
            className="mb-2 "
            key={index}
            onClick={() => navigate('/')}
          >
            <img
              src={getImage(item.path)}
              alt=""
              className="h-[190px] w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
