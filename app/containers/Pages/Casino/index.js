import { CasinoSlider, Loading } from '@/components';
import { getAuthData, isLoggedIn, postAuthData } from '@/utils/apiHandlers';
import { SliderLinks } from '@/utils/constants';
import { isMobile } from 'react-device-detect';
import toast from 'react-hot-toast';
import React, { useCallback, useEffect, useState } from 'react';
import CasinoPlay from '@/components/CasinoPlay';
import { useDispatch, useSelector } from 'react-redux';
import { reactIcons } from '@/utils/icons';
import { useLocation } from 'react-router-dom';
// import CasinoModal from '../CasinoModal';
import { useMediaQuery } from '@mui/material';
import { openModal } from '@/redux/Slices/modalSlice';
const Casino = () => {
  const [isLoading, setisLoading] = useState(false);
  const [allCasinoGame, setAllCasinoGame] = useState([]);
  const [providerSearch, setProviderSearch] = useState('all');
  const [deviceType, setDeviceType] = useState(null);
  const [url, setUrl] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const userIdFromRedux = useSelector((state) => state.user.id);
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const [casinoPoints, setCasinoPoints] = useState(false);
  // const [gameId, setGameId] = useState();
  const location = useLocation();
  const isMobileDevice = useMediaQuery('(max-width:768px)');
  const isLogin = isLoggedIn();
  const passedProvider = location?.state?.provider;
  const passedId = location?.state?.id;

  useEffect(() => {
    if (passedProvider) {
      setProviderSearch(passedProvider);
      setSelectedIndex(passedId);
    }
    getCasinoGame();
    setDeviceType(isMobile ? 'mobile' : 'desktop');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedProvider, deviceType]);
  useEffect(() => {
    getCasinoGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerSearch]);
  const getCasinoGame = async () => {
    setisLoading(true);
    try {
      const endpoint =
        providerSearch === 'all'
          ? '/user/casino-by-category'
          : `/user/casino-by-category?category=${providerSearch}`;
      const response = await getAuthData(endpoint);
      if (response?.status === 201 || response?.status === 200) {
        setAllCasinoGame(response?.data);
        setUrl(null);
        setisLoading(false);
      }
    } catch (e) {
      console.error(e);
      setisLoading(false);
      return null;
    }
  };

  const handleCasinoGame = useCallback(
    async (id) => {
      if (userInfo.casinoLock) {
        toast.error(
          'Casino is currently locked. Please contact the admin for assistance.',
        );
        return;
      }
      if (userIdFromRedux) {
        try {
          const response = await postAuthData('/user/create-session', {
            platform: deviceType,
            id: userIdFromRedux,
            gameid: String(id),
          });
          if (response?.status === 200 || response?.status === 201) {
            if (response.data?.url) {
              setUrl(response.data?.url);
            } else {
              toast.error('Game not live now');
            }
          } else {
            toast.error(response?.data?.message || 'Something went wrong');
          }
        } catch (error) {
          toast.error(error || 'Something went wrong');
        }
      } else {
        console.error('error');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deviceType, userIdFromRedux],
  );
  return (
    <div className={`${isMobileDevice && 'bg-[#0F2327]'} `}>
      {isLoading && <Loading />}
      <div className="border-b border-black  py-3 hidden md:block">
        <h1 className="text-24">Live Casino</h1>
      </div>
      <div className="text-white md:hidden flex items-center gap-2 text-16 font-bold bg-[#1A4E61] py-2 px-3">
        <span>{reactIcons.bigLeft}</span>
        Live Casino
      </div>
      <div className={`w-full ${url ? 'hidden' : ''}`}>
        <CasinoSlider
          setSelectedIndex={setSelectedIndex}
          setProviderSearch={setProviderSearch}
          setUrl={setUrl}
        />
      </div>

      <div
        className={`flex items-center justify-between overflow-x-auto gap-1 ${
          isMobile && 'slider-casino'
        } ${url ? 'hidden' : ''}`}
      >
        {SliderLinks.map((item, index) => (
          <div
            className={`flex flex-col items-center md:h-[45px] h-[70px] ${
              selectedIndex === item?.id ? 'bg-primary-1200' : 'bg-[#0f2327]'
            } rounded px-3 py-3 md:py-1 cursor-pointer w-full min-w-[100px] text-white border-[1px] border-[#ffffff26] md:border-none`}
            key={index}
            onClick={() => {
              setUrl(null);
              setProviderSearch(item?.provider);
              setSelectedIndex(item?.id);
            }}
          >
            <div>
              {' '}
              <img
                src={item.icon}
                alt={item?.provider}
                className="h-7 w-7 md:h-4 md:w-4 object-cover"
              />
            </div>
            <p className="text-xs mt-0.5 whitespace-nowrap">{item.title}</p>
          </div>
        ))}
      </div>

      <div className="md:my-10">
        <h1 className="hidden md:flex items-center capitalize font-semibold gap-2 my-4">
          {url && (
            <span
              className="flex justify-center text-22 text-red-700 items-center"
              onClick={() => setUrl('')}
            >
              {' '}
              {reactIcons.circleLeftArrow}
            </span>
          )}{' '}
          <span> {reactIcons.casino}</span>
          {providerSearch || 'Roulette'}
        </h1>
        {url ? (
          <CasinoPlay url={url} />
        ) : (
          <div className="grid 2xl:grid-cols-4 grid-cols-3 sm1:grid-cols-3 md:grid-cols-3 gap-2 mt-4 md:mt-0">
            {allCasinoGame?.map((item, index) => (
              <div
                key={index}
                className="relative h-full cursor-pointer"
                onClick={() => {
                  if (isLogin) {
                    handleCasinoGame(item?.id);
                    // setGameId(item?.id);
                    // setCasinoPoints(true);
                  } else {
                    dispatch(openModal('login'));
                  }
                }}
              >
                <img
                  src={item?.game_images}
                  alt={item.provider}
                  loading="lazy"
                  className="h-auto md:h-full md:w-full w-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white text-center py-2">
                  <p className="text-xs md:text-sm font-semibold">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* {casinoPoints && (
          <CasinoModal
            casinoPoints={casinoPoints}
            setCasinoPoints={setCasinoPoints}
            handleCasinoGame={handleCasinoGame}
            gameId={gameId}
          />
        )} */}
      </div>
    </div>
  );
};

export default Casino;
