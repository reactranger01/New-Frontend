/* eslint-disable react-hooks/exhaustive-deps */
import { MobSlider } from '@/components';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import {
  MobileFixtureCricket,
  MobileFixtureFootball,
  MobileFixtureTennis,
} from '@/containers/pageListAsync';
import { mob } from '@/utils/constants';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '@/utils/apiHandlers';
import { getFixtureDataMobile } from '@/utils/helper';
const MobHome = () => {
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
  const userInfo = useSelector((state) => state.user);
  const login = isLoggedIn();
  const navigate = useNavigate();
  const handleClickCasino = (item) => {
    if (item.available) {
      navigate('/', { state: item });
    } else {
      navigate('/');
    }
  };

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
      <MobSlider />
      <div className="bg-white mx-2 min-h-screen overflow-hidden">
        {(cricketInplay.length > 0 ||
          soccerInplay.length > 0 ||
          tennisInplay.length > 0) && (
          <div className="border-b border-black py-2 my-1 flex mx-2 items-center justify-between">
            <h1 className="text-18 text-left flex items-center gap-2">
              <span className="text-green-800">{reactIcons.play2}</span> Live
            </h1>
            <div
              onClick={() => {
                if (login) {
                  navigate('/dashboard/bets/1');
                }
              }}
              className="flex items-center gap-1"
            >
              <p className="text-12">My Bets</p>{' '}
              <div className="bg-orange-300 shrink-0 text-10 h-5 w-5 rounded-full flex-center ">
                {userInfo?.betcountValue || 0}
              </div>
            </div>
          </div>
        )}
        <MobileFixtureCricket
          type={'LiveMatches'}
          fixtureData={inplayTrue}
          isLoading={isLoading}
        />
        <MobileFixtureTennis
          type={'LiveMatches'}
          fixtureData={inplayTrueTennis}
          isLoading={isLoadingT}
        />
        <MobileFixtureFootball
          type={'LiveMatches'}
          fixtureData={inplayTrueSoccer}
          isLoading={isLoadingS}
        />
        <div className="w-[98vw] flex items-center overflow-auto slider-bg-mob-div my-2">
          {mob.map((_item, index) => (
            <div className="slider-bg-mob h-20 " key={index}>
              <div
                className="h-20 w-20 absolute ax-center -top-6"
                onClick={() => handleClickCasino(_item)}
              >
                <img
                  className="h-full w-full object-cover"
                  src={_item.path}
                  alt=""
                />
              </div>
              <p className=" text-white absolute ax-center bottom-2 text-10 leading-none mx-auto text-center">
                {_item.title}
              </p>
            </div>
          ))}
        </div>
        <div className="border-b border-black py-2 my-1 mt-2 flex mx-2 items-center justify-between">
          <h1 className="text-18 text-left flex items-center gap-2">
            <span className="text-[#cc5f36]">{reactIcons.fire}</span> Most
            Popular
          </h1>
        </div>
        <MobileFixtureCricket
          type={'NotLiveMatches'}
          fixtureData={inplayFalse}
          isLoading={isLoading}
        />
        <MobileFixtureTennis
          type={'NotLiveMatches'}
          fixtureData={inplayFalseTennis}
          isLoading={isLoadingT}
        />
        <MobileFixtureFootball
          type={'NotLiveMatches'}
          fixtureData={inplayFalseSoccer}
          isLoading={isLoadingS}
        />
      </div>
    </div>
  );
};

export default MobHome;
