import React from 'react';
import loadable from '../utils/loadable';
import Loading from './Loading';

export { default as Loading } from './Loading';

export const Welcome = loadable(() => import('./Welcome'), {
  fallback: <Loading />,
});
export const LoginForm = loadable(() => import('./auth/LoginForm'), {
  fallback: <Loading />,
});
export const SignupForm = loadable(() => import('./auth/SignupForm'), {
  fallback: <Loading />,
});
export const Navbar = loadable(() => import('./layout/Navbar'), {
  fallback: <Loading />,
});
export const Footer = loadable(() => import('./layout/Footer'), {
  fallback: <Loading />,
});
export const ImageUpload = loadable(() => import('./fileUpload/ImageUpload'), {
  fallback: <Loading />,
});
export const PreviewImage = loadable(
  () => import('./fileUpload/PreviewImage'),
  {
    fallback: <Loading />,
  },
);
export const CustomInput = loadable(() => import('./common/CustomInput'), {
  fallback: <Loading />,
});
export const SwiperSlider = loadable(() => import('./slider/SwiperSlider'), {
  fallback: <Loading />,
});
export const SliderTwo = loadable(() => import('./slider/SliderTwo'), {
  fallback: <Loading />,
});
export const GameSlider = loadable(() => import('./slider/GameSlider'), {
  fallback: <Loading />,
});
export const SidebarMenu = loadable(() => import('./sidebarMenu/SidebarMenu'), {
  fallback: <Loading />,
});
export const SidebarDrawer = loadable(() => import('./SidebarDrawer'), {
  fallback: <Loading />,
});
export const SidebarSubMenu = loadable(
  () => import('./sidebarMenu/SidebarSubMenu'),
  {
    fallback: <Loading />,
  },
);
export const BlueBtn = loadable(() => import('./buttons/BlueBtn'), {
  fallback: <Loading />,
});
export const PinkBtn = loadable(() => import('./buttons/PinkBtn'), {
  fallback: <Loading />,
});
export const BlankBtn = loadable(() => import('./buttons/BlankBtn'), {
  fallback: <Loading />,
});

export const SuspendedBtn = loadable(() => import('./buttons/SuspendedBtn'), {
  fallback: <Loading />,
});
export const BallRunning = loadable(() => import('./buttons/BallRunning'), {
  fallback: <Loading />,
});
export const SeeMoreMarkets = loadable(
  () => import('./buttons/SeeMoreMarkets'),
  {
    fallback: <Loading />,
  },
);
export const BetSlip = loadable(() => import('./BetSlip'), {
  fallback: <Loading />,
});
export const NewBetSlip = loadable(() => import('./NewBetSlip'), {
  fallback: <Loading />,
});
export const MatchOdds = loadable(() => import('./SingleBet/MatchOdds'), {
  fallback: <Loading />,
});
export const MatchOddsSoccer = loadable(
  () => import('./SingleBet/MatchOddsSoccer'),
  {
    fallback: <Loading />,
  },
);
export const BookMaker = loadable(() => import('./SingleBet/BookMaker'), {
  fallback: <Loading />,
});
export const Fancy = loadable(() => import('./SingleBet/Fancy'), {
  fallback: <Loading />,
});
export const Sessions = loadable(() => import('./SingleBet/Sessions'), {
  fallback: <Loading />,
});
export const UnderMarket = loadable(() => import('./SingleBet/UnderMarket'), {
  fallback: <Loading />,
});
UnderMarket;
export const Set1Winner = loadable(
  () => import('./SingleBetTennis/Set1Winner'),
  {
    fallback: <Loading />,
  },
);

export const MatchOddsTennis = loadable(
  () => import('./SingleBetTennis/MatchOdds'),
  {
    fallback: <Loading />,
  },
);

export const CasinoSlider = loadable(() => import('./slider/CasinoSlider'), {
  fallback: <Loading />,
});
export const CustomDatePicker = loadable(() => import('./CustomDatePicker'), {
  fallback: <Loading />,
});
export const FilterHeader = loadable(() => import('./FilterHeader'), {
  fallback: <Loading />,
});
export const BankAccountCard = loadable(() => import('./BankAccountCard'), {
  fallback: <Loading />,
});
export const SelectBox = loadable(() => import('./FormElements/SelectBox'), {
  fallback: <Loading />,
});
export const AddAccount = loadable(() => import('./AddAccount'), {
  fallback: <Loading />,
});
export const NoMarketAvailable = loadable(() => import('./NoMarketAvailable'), {
  fallback: <Loading />,
});

// Mobile

export const MobSlider = loadable(() => import('./MobileComp/MobSlider'), {
  fallback: <Loading />,
});
export const MobFooter = loadable(() => import('./MobileComp/MobFooter'), {
  fallback: <Loading />,
});
export const CasinoPage = loadable(() => import('./CasinoPage'), {
  fallback: <Loading />,
});
