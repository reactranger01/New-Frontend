import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';

const imagesArr = [
  {
    id: 1,
    img: '/images/newSlider1/1.jpg',
    // css: 'h-[100px] max-w-[200px]',
  },
  {
    id: 2,
    img: '/images/newSlider1/2.jpg',
    // css: 'h-[200px] max-w-[200px]',
  },
  {
    id: 3,
    img: '/images/newSlider1/3.jpg',
    // css: 'h-[100px] max-w-[200px]',
  },
  {
    id: 4,
    img: '/images/newSlider1/4.jpg',
    // css: 'h-[100px] max-w-[200px]',
  },
  {
    id: 5,
    img: '/images/newSlider1/5.jpg',
    // css: 'h-[100px] max-w-[200px]',
  },
];

const HomeTopSLider = () => {
  return (
    <div className="my-2 relative w-full ">
      <Swiper
        pagination={true}
        loop={true}
        slidesPerView={3}
        spaceBetween={0}
        autoplay={{
          delay: 30000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          10: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          550: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: '.slider11',
          prevEl: '.slider22',
        }}
        className="mySwiper w-full"
      >
        {imagesArr?.map((item, index) => (
          <SwiperSlide
            key={index}
            className=" h-[200px] flex items-center justify-center"
          >
            <img
              src={item?.img}
              alt=""
              className={`rounded-md w-full ${item?.css}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeTopSLider;
