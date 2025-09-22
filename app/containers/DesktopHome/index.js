/* eslint-disable react-hooks/exhaustive-deps */
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '@/utils/apiHandlers';
import { getFixtureDataMobile } from '@/utils/helper';
import DesktopFixtureCricket from '@/components/Desktop/DesktopFixtureCricket';
import DesktopFixtureTennis from '@/components/Desktop/DesktopFixtureTennis';
import DesktopFixtureFootball from '@/components/Desktop/DesktopFixtureFootball';
import MostPopular from '@/components/MostPopular';
import { sportSlider1, sportSlider2, sportSliderLink } from '@/utils/constants';
import HomeTopSLider from '@/components/HomeTopSlider';

const gifArr = [
  {
    id: 1,
    gif: '/images/gifs/1.gif',
  },
  {
    id: 2,
    gif: '/images/gifs/2.gif',
  },
  {
    id: 3,
    gif: '/images/gifs/3.gif',
  },
  {
    id: 4,
    gif: '/images/gifs/4.gif',
  },
];

const DesktopHome = () => {
  const [cricketInplay, setCricketInplay] = useState([]);
  const [soccerInplay, setsoccerInplay] = useState([]);
  const [tennisInplay, settennisInplay] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingS, setisLoadingS] = useState(false);
  const [isLoadingT, setisLoadingT] = useState(false);
  const [inplayTrue, setInplayTrue] = useState([]);
  const [inplayFalse, setInplayFalse] = useState([]);
  const [inplayTrueTennis, setInplayTrueTennis] = useState([]);
  const [inplayFalseTennis, setInplayFalseTennis] = useState([]);
  const [inplayTrueSoccer, setInplayTrueSoccer] = useState([]);
  const [inplayFalseSoccer, setInplayFalseSoccer] = useState([]);
  // eslint-disable-next-line
  const [loaderOneTime, setLoaderOneTime] = useState(false);
  // const userInfo = useSelector((state) => state.user);
  const login = isLoggedIn();
  // const handleClickCasino = (item) => {
  //   if (item.available) {
  //     navigate('/dashboard', { state: item });
  //   } else {
  //     navigate('/');
  //   }
  // };

  const getCricketData = () => {
    getFixtureDataMobile(
      'cricket',
      setCricketInplay,
      setInplayTrue,
      setInplayFalse,
      setisLoading,
      setLoaderOneTime,
    );
  };

  const getTennisData = () => {
    getFixtureDataMobile(
      'tennis',
      settennisInplay,
      setInplayTrueTennis,
      setInplayFalseTennis,
      setisLoadingT,
      setLoaderOneTime,
    );
  };

  const getFootballData = () => {
    getFixtureDataMobile(
      'soccer',
      setsoccerInplay,
      setInplayTrueSoccer,
      setInplayFalseSoccer,
      setisLoadingS,
      setLoaderOneTime,
    );
  };
  useEffect(() => {
    const fetchInterval = login ? 5000 : 10000;
    getCricketData();
    const intervalId = setInterval(() => {
      getCricketData();
    }, fetchInterval);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchInterval = login ? 5000 : 10000;
    getTennisData();
    const intervalId = setInterval(() => {
      getTennisData();
    }, fetchInterval);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchInterval = login ? 5000 : 10000;
    getFootballData();
    const intervalId = setInterval(() => {
      getFootballData();
    }, fetchInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full light-bg ">
      {/* <MobSlider /> */}
      <div className="min-h-screen overflow-hidden pb-6">
        <div className="bg-white mt-1 grid grid-cols-2 gap-2 p-3 rounded-md bg-[linear-gradient(90deg,#fff_50%,#f5dba0)]">
          <button className="flex items-center justify-center py-2 gap-2 text-14 font-bold rounded-sm bg-[#1e8067] text-white">
            <img src="/images/deposit.png" className="w-5 h-5" alt="" /> Deposit
          </button>
          <button className="flex items-center justify-center py-2 gap-2 text-14 font-bold rounded-sm  text-white  bg-[#dc2626]">
            <img src="/images/withdraw.png" className="w-5 h-5" alt="" />{' '}
            Withdraw
          </button>
        </div>
        <div className="w-full">
          <HomeTopSLider />
        </div>
        <div className="flex items-center justify-between overflow-auto  my-2 mb-4">
          {sportSliderLink.map((_item, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${_item?.bgImg})` }}
              className="h-9 w-[60px] relative rounded-[4px] bg-cover bg-center bg-no-repeat"
            >
              <img
                className=" absolute top-1 left-1 w-4 object-cover"
                src={_item.img}
                alt=""
              />
              <p className="absolute bottom-1 left-1 text-white  truncate text-12 leading-none font-semibold ">
                {_item.title}
              </p>
            </div>
          ))}
        </div>
        <div className=" grid grid-cols-2 gap-2">
          {gifArr?.map((item, index) => (
            <div key={index} className="rounded-[4px] overflow-hidden">
              <img src={item?.gif} className="h-[60px] w-full" alt="" />{' '}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2 w-full">
          {sportSlider1?.map((item, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${item?.bgImg})` }}
              className="h-[50px] w-full flex flex-col items-start justify-center px-2 text-white relative rounded-[4px] bg-cover bg-center bg-no-repeat"
            >
              <div className="flex items-center gap-2">
                <img src={item?.img} className="h-4 w-4" alt="" />
                <p className="text-16 font-bold">{item?.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2 w-full ">
          {sportSlider2?.map((item, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${item?.bgImg})` }}
              className="h-[50px] w-full flex flex-col items-start justify-center px-2 text-white relative rounded-[4px] bg-cover bg-center bg-no-repeat"
            >
              <div className="flex items-center gap-2">
                <img src={item?.img} className="h-4 w-4" alt="" />
                <p className="text-16 font-bold">{item?.title}</p>
              </div>
            </div>
          ))}
        </div>
        {(cricketInplay.length > 0 ||
          soccerInplay.length > 0 ||
          tennisInplay.length > 0) && (
          <div className="bg-[#1E8067] py-2 px-[10px] flex items-center justify-between rounded-[3px] my-[15px] text-white ">
            <h1 className="flex items-center text-18 font-bold gap-1">
              <span className=""> {reactIcons.play}</span> In Play
            </h1>
            <p className="text-[13px] font-bold">Open Bets</p>
            {/* <div className="bg-orange-300 shrink-0 text-10 h-5 w-5 rounded-full flex-center ">
                {userInfo?.betcountValue || 0}
              </div> */}
          </div>
        )}
        <DesktopFixtureCricket
          type={'LiveMatches'}
          fixtureData={inplayTrue}
          isLoading={isLoading}
        />
        <DesktopFixtureTennis
          type={'LiveMatches'}
          fixtureData={inplayTrueTennis}
          isLoading={isLoadingT}
        />
        <DesktopFixtureFootball
          type={'LiveMatches'}
          fixtureData={inplayTrueSoccer}
          isLoading={isLoadingS}
        />
        <MostPopular text="Upcoming Events" />
        <DesktopFixtureCricket
          type={'NotLiveMatches'}
          fixtureData={inplayFalse}
          isLoading={isLoading}
        />{' '}
        <DesktopFixtureTennis
          type={'NotLiveMatches'}
          fixtureData={inplayFalseTennis}
          isLoading={isLoadingT}
        />
        <DesktopFixtureFootball
          type={'NotLiveMatches'}
          fixtureData={inplayFalseSoccer}
          isLoading={isLoadingS}
        />
      </div>
    </div>
  );
};

export default DesktopHome;
