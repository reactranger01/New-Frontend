import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const GameSlider = ({ number }) => {
  const navigate = useNavigate();

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
            slidesPerView: 1,
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
        }}
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: '.slider11',
          prevEl: '.slider22',
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            onClick={() => navigate('/cricket')}
            className="cursor-pointer h-[150px] md:h-auto"
          >
            <img
              src="/images/home/2.webp"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="cursor-pointer h-[150px] md:h-auto">
            <img
              src="/images/home/3.webp"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            onClick={() => navigate('/football')}
            className="cursor-pointer h-[150px] md:h-auto"
          >
            <img
              src="/images/home/4.webp"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      {/* <button className="ay-center text-16 slider22 disabled:opacity-30 size-8 flex-center bg-white rounded-full left-3 z-20">
        {reactIcons.arrowleft}
      </button>
      <button className="ay-center text-16 slider11 disabled:opacity-30 size-8 flex-center bg-white rounded-full right-3 z-20">
        {reactIcons.arrowright}
      </button> */}
    </div>
  );
};

GameSlider.propTypes = {
  number: PropTypes.number,
  css: PropTypes.string,
  imgs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default GameSlider;

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { reactIcons } from '@/utils/icons';
// import PropTypes from 'prop-types';

// const SliderTwo = ({ number, css, imgs }) => {
//   return (
//     <section className=" lg:my-10">
//       <Swiper
//         pagination={true}
//         loop={true}
//         slidesPerView={number}
//         autoplay={{
//           delay: 3500,
//           disableOnInteraction: false,
//         }}
//         modules={[Autoplay, Navigation]}
//         navigation={{
//           nextEl: '.slider1',
//           prevEl: '.slider2',
//         }}
//         className="mySwiper h-full w-full overflow-hidden bg-red-200 relative"
//       >
//         {imgs.map((item, index) => (
//           <SwiperSlide key={index} className={`swiper-slide ${css}`}>
//             <div>
//               <div className={`${css} w-full`}>
//                 <img
//                   src={item.path}
//                   alt=""
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div className="bg-[#FAB841] text-[#420A57] px-4 py-2 text-22 flex-center">
//                 <p>{item.title} ddddd</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//         <button className="ay-center text-16 slider2 disabled:opacity-30 size-8 flex-center bg-white rounded-full left-3 z-20">
//           {reactIcons.arrowleft}
//         </button>
//         <button className="ay-center text-16 slider1 disabled:opacity-30 size-8 flex-center bg-white rounded-full right-3 z-20">
//           {reactIcons.arrowright}
//         </button>
//       </Swiper>
//     </section>
//   );
// };
// SliderTwo.propTypes = {
//   number: PropTypes.number,
//   css: PropTypes.string,
//   imgs: PropTypes.arrayOf(
//     PropTypes.shape({
//       path: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
// };
// export default SliderTwo;
