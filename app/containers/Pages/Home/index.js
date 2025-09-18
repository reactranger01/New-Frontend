import { GameSlider, SliderTwo, SwiperSlider } from '@/components';
import { slider2Img, slider3Img } from '@/utils/constants';
import React from 'react';

const Home = () => {
  return (
    <div className="light-bg">
      <SwiperSlider />

      <GameSlider />

      <SliderTwo
        number={5}
        imgs={slider2Img}
        num1="slider12"
        num2="slider13"
        hide={true}
      />
      <SliderTwo
        number={5}
        hide={false}
        imgs={slider3Img}
        num1="slider112"
        num2="slider113"
      />
    </div>
  );
};

export default Home;
